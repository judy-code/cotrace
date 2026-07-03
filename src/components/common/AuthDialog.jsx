import { useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { FieldGroup } from '@/components/common/FieldGroup'
import { ResponsiveModal } from '@/components/layout/ResponsiveModal'
import { useAppState } from '@/hooks/useAppState'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { fetchGoogleProfile, isGoogleLoginConfigured } from '@/lib/googleAuth'
import { loginAccount, registerAccount } from '@/lib/api'

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.33 2.56 13.22l7.98 6.19C12.43 13.08 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-3.59-13.46-8.91l-7.98 6.19C6.51 42.67 14.62 48 24 48z"
      />
    </svg>
  )
}

// 只有設定好 VITE_GOOGLE_CLIENT_ID 才會 mount 這個元件，避免 useGoogleLogin 在
// client_id 是空字串時對 Google SDK 初始化，一初始化就丟出例外把整個 App 炸掉
function GoogleLoginButton({ onSuccess }) {
  const [signingIn, setSigningIn] = useState(false)

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const profile = await fetchGoogleProfile(tokenResponse.access_token)
        onSuccess(profile)
      } catch {
        toast.error('登入失敗，請稍後再試')
      } finally {
        setSigningIn(false)
      }
    },
    onError: () => {
      toast.error('Google 登入失敗，請稍後再試')
      setSigningIn(false)
    },
    onNonOAuthError: () => setSigningIn(false),
  })

  return (
    <Button
      className="w-full gap-2.5 text-[15px]"
      variant="outline"
      size="lg"
      disabled={signingIn}
      onClick={() => {
        setSigningIn(true)
        googleLogin()
      }}
    >
      <GoogleIcon />
      {signingIn ? '登入中…' : '以 Google 帳號登入'}
    </Button>
  )
}

function GoogleLoginDisabledButton() {
  return (
    <Button
      className="w-full gap-2.5 text-[15px]"
      variant="outline"
      size="lg"
      onClick={() => toast.error('尚未設定 Google 登入，請洽系統管理員')}
    >
      <GoogleIcon />
      以 Google 帳號登入
    </Button>
  )
}

const blankLogin = { email: '', password: '' }
const blankRegister = { name: '', email: '', password: '' }

// 純前端假帳號，登入狀態只存在瀏覽器記憶體（跟其餘模擬資料一樣，重新整理會消失，
// 不會寫進資料庫）。只在 `npm run dev` 顯示，`npm run build` 產出的正式版不會有
// 這顆按鈕（`import.meta.env.DEV` 由 Vite 在建置時決定）。用途：本機開發/測試時
// 不需要真的申請 Google OAuth 或架設 MySQL，也能快速登入查看通知／名片夾／聊天／
// 設置等需要登入才能看到的頁面。
const DEV_TEST_USER = { name: '測試帳號', email: 'dev-test@local', source: 'dev' }

/**
 * 全站共用的登入/註冊彈窗，開關狀態放在全域 state（authDialogOpen），
 * 任何元件都能 dispatch OPEN_AUTH_DIALOG 觸發，只在 AppShell 掛載一次。
 */
export function AuthDialog() {
  const { authDialogOpen } = useAppState()
  const dispatch = useAppDispatch()
  const [tab, setTab] = useState('login')
  const [loginDraft, setLoginDraft] = useState(blankLogin)
  const [registerDraft, setRegisterDraft] = useState(blankRegister)
  const [submitting, setSubmitting] = useState(false)

  const close = () => {
    dispatch({ type: 'CLOSE_AUTH_DIALOG' })
    setLoginDraft(blankLogin)
    setRegisterDraft(blankRegister)
    setTab('login')
  }

  // 登入成功後留在使用者原本瀏覽的頁面，不強制導頁，符合彈窗式登入的預期行為
  const handleAuthSuccess = (user) => {
    dispatch({ type: 'ENTER_APP', loggedIn: true, user })
    close()
  }

  const handleLogin = async () => {
    if (!loginDraft.email || !loginDraft.password) {
      toast.error('請輸入 email 與密碼')
      return
    }
    setSubmitting(true)
    try {
      const { user } = await loginAccount(loginDraft)
      handleAuthSuccess({ ...user, source: 'local' })
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleRegister = async () => {
    if (!registerDraft.name || !registerDraft.email || !registerDraft.password) {
      toast.error('請填寫姓名、email 與密碼')
      return
    }
    if (registerDraft.password.length < 8) {
      toast.error('密碼至少需要 8 個字元')
      return
    }
    setSubmitting(true)
    try {
      const { user } = await registerAccount(registerDraft)
      handleAuthSuccess({ ...user, source: 'local' })
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <ResponsiveModal open={authDialogOpen} onOpenChange={close} title="登入 / 註冊">
      {isGoogleLoginConfigured ? (
        <GoogleLoginButton onSuccess={handleAuthSuccess} />
      ) : (
        <GoogleLoginDisabledButton />
      )}

      <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground">
        <div className="h-px flex-1 bg-border" />
        或
        <div className="h-px flex-1 bg-border" />
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-4 w-full">
          <TabsTrigger className="flex-1" value="login">
            登入
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="register">
            註冊
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <FieldGroup label="Email">
            <Input
              type="email"
              value={loginDraft.email}
              onChange={(e) => setLoginDraft((d) => ({ ...d, email: e.target.value }))}
            />
          </FieldGroup>
          <FieldGroup label="密碼">
            <Input
              type="password"
              value={loginDraft.password}
              onChange={(e) => setLoginDraft((d) => ({ ...d, password: e.target.value }))}
            />
          </FieldGroup>
          <Button className="w-full" disabled={submitting} onClick={handleLogin}>
            {submitting ? '登入中…' : '登入'}
          </Button>
        </TabsContent>

        <TabsContent value="register">
          <FieldGroup label="姓名">
            <Input
              value={registerDraft.name}
              onChange={(e) => setRegisterDraft((d) => ({ ...d, name: e.target.value }))}
            />
          </FieldGroup>
          <FieldGroup label="Email">
            <Input
              type="email"
              value={registerDraft.email}
              onChange={(e) => setRegisterDraft((d) => ({ ...d, email: e.target.value }))}
            />
          </FieldGroup>
          <FieldGroup label="密碼" hint="至少 8 個字元">
            <Input
              type="password"
              value={registerDraft.password}
              onChange={(e) => setRegisterDraft((d) => ({ ...d, password: e.target.value }))}
            />
          </FieldGroup>
          <Button className="w-full" disabled={submitting} onClick={handleRegister}>
            {submitting ? '註冊中…' : '註冊'}
          </Button>
        </TabsContent>
      </Tabs>

      {import.meta.env.DEV && (
        <div className="mt-5 rounded-lg border border-dashed border-border p-3">
          <div className="text-xs text-muted-foreground">
            開發用快速登入（僅本機開發模式顯示，正式站不會出現；登入狀態只存在瀏覽器記憶體，
            重新整理就會消失）
          </div>
          <Button
            variant="outline"
            size="sm"
            className="mt-2 w-full"
            onClick={() => handleAuthSuccess(DEV_TEST_USER)}
          >
            以測試帳號登入
          </Button>
        </div>
      )}
    </ResponsiveModal>
  )
}
