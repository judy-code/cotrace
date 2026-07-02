import { cn } from '@/lib/utils'

function assetUrl(name) {
  return `${import.meta.env.BASE_URL}${name}`
}

/** 拼圖圖標（logo 去除文字後裁切而成），用於窄版面或圖標單獨出現的場合。 */
export function LogoMark({ size = 28, className }) {
  return (
    <img
      src={assetUrl('logo-mark.png')}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={cn('shrink-0 select-none object-contain', className)}
      style={{ width: size, height: size }}
      draggable={false}
    />
  )
}

/** 圖標＋COTRACE 字樣的橫向組合，用於側邊欄／頂欄等橫向導覽列品牌區。 */
export function Logo({ size = 26, className, textClassName }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <LogoMark size={size} />
      <span
        className={cn('font-bold tracking-wide text-primary', textClassName)}
        style={{ fontSize: size * 0.62 }}
      >
        COTRACE
      </span>
    </span>
  )
}

/** 完整堆疊版標誌（圖標在上、COTRACE 字樣在下），用於歡迎頁等有充裕留白的場合。 */
export function LogoStacked({ size = 140, className }) {
  return (
    <img
      src={assetUrl('logo-full.png')}
      alt="CoTrace"
      height={size}
      className={cn('w-auto select-none object-contain', className)}
      style={{ height: size }}
      draggable={false}
    />
  )
}
