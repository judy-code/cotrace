import { useEffect, useRef, useState } from 'react'

/**
 * 回傳一個 ref 與「是否已進入視窗」布林值，只觸發一次（第一次進入視窗後就
 * 不再監聽），用於首頁 landing page 的捲動進場動畫。IntersectionObserver
 * 不支援時（極舊瀏覽器）直接視為已進入，避免內容永遠隱藏。
 * threshold 用數字（非 options 物件）傳入，避免每次 render 都是新物件參照
 * 導致 effect 重跑。
 */
export function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}
