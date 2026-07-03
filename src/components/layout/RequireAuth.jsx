import { Outlet } from 'react-router-dom'
import { useAppState } from '@/hooks/useAppState'
import { LoginPromptCard } from '@/components/common/LoginPromptCard'

/**
 * 版面路由（layout route）守門元件：未登入時整個子路由內容替換成登入提示卡，
 * 保留網址本身可直接分享／重新整理（不用 redirect），寫法比照 AppShell 用
 * <Outlet/> 包子路由。
 */
export function RequireAuth() {
  const { isLoggedIn } = useAppState()

  if (!isLoggedIn) {
    return (
      <div className="mx-auto flex h-full max-w-2xl items-center justify-center px-4">
        <LoginPromptCard text="這個頁面需要登入才能使用" />
      </div>
    )
  }

  return <Outlet />
}
