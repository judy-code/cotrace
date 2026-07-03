import { useAppState } from '@/hooks/useAppState'
import { useAppDispatch } from '@/hooks/useAppDispatch'

/**
 * 包住需要登入才能執行的動作（收藏／發送邀請／關注等）：未登入時開啟全域登入彈窗
 * 並中斷動作，已登入才真的執行 action。
 */
export function useRequireAuth() {
  const { isLoggedIn } = useAppState()
  const dispatch = useAppDispatch()

  return (action) => {
    if (!isLoggedIn) {
      dispatch({ type: 'OPEN_AUTH_DIALOG' })
      return
    }
    action()
  }
}
