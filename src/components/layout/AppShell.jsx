import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { AuthDialog } from '@/components/common/AuthDialog'

export function AppShell() {
  const location = useLocation()
  // 只取第一段路徑當 key（例如 /explore/123 與 /explore 視為同一段），
  // 避免主從分割版面（explore、chat）切換巢狀詳情頁時，連帶重新播放整個列表欄的進場動畫
  const section = location.pathname.split('/')[1] || 'root'

  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-background text-foreground">
      <Navbar />
      <main className="min-h-0 flex-1 overflow-hidden">
        <div key={section} className="animate-in fade-in h-full duration-300">
          <Outlet />
        </div>
      </main>
      <AuthDialog />
    </div>
  )
}
