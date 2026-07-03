import { Button } from '@/components/ui/button'
import { PuzzleEmptyIllustration } from '@/components/common/illustrations'
import { useAppDispatch } from '@/hooks/useAppDispatch'

/**
 * 訪客瀏覽到需要登入才能使用的頁面/區塊時顯示的提示卡，取代 EmptyState 的位置，
 * 按鈕會開啟全域登入彈窗（AuthDialog）。
 */
export function LoginPromptCard({ text = '此功能需要登入才能使用' }) {
  const dispatch = useAppDispatch()

  return (
    <div className="animate-in fade-in slide-in-from-bottom-1 flex flex-col items-center gap-3 py-10 text-center duration-500">
      <PuzzleEmptyIllustration size={88} />
      <div className="text-sm text-muted-foreground">{text}</div>
      <Button onClick={() => dispatch({ type: 'OPEN_AUTH_DIALOG' })}>登入 / 註冊</Button>
    </div>
  )
}
