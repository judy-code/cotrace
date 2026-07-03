import { cn } from '@/lib/utils'
import { useInView } from '@/hooks/useInView'

/**
 * 捲動進場動畫包裝元件：子內容進入視窗前不可見，進入後播放一次
 * fade-in + slide-in-from-bottom（不做捲出重播），用於首頁 landing page
 * 的長頁面分段揭露。搭配 `as` 可指定容器標籤（預設 section）。
 */
export function Reveal({ children, className, delay = 0, as: Tag = 'div' }) {
  const [ref, inView] = useInView()

  return (
    <Tag
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        inView ? 'animate-in fade-in slide-in-from-bottom-4 opacity-100' : 'opacity-0',
        className
      )}
      style={delay ? { animationDelay: `${delay}ms`, transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
