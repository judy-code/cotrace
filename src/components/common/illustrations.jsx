import { cn } from '@/lib/utils'

/**
 * 呼應 logo 的四色拼圖意象，手繪風格的裝飾插圖（非依賴外部圖片資源）。
 * 顏色一律使用語意化 Tailwind class（fill-brand-* / fill-primary 等），不寫死 hex。
 */

/** 歡迎頁英雄插圖：放大版拼圖四格 + 周圍散落的連結節點與虛線，象徵「連結、拼接、互補」。 */
export function PuzzleHeroIllustration({ className, size = 240 }) {
  return (
    <svg
      viewBox="0 0 260 260"
      width={size}
      height={size}
      aria-hidden="true"
      className={cn('animate-gentle-float', className)}
    >
      {/* 散落節點與虛線連結，暗示網絡／人與人的連結 */}
      <g className="stroke-border" strokeWidth="2" strokeDasharray="4 6" fill="none">
        <path d="M50,58 L96,96" />
        <path d="M230,50 L256,96" />
        <path d="M50,222 L96,180" />
        <path d="M228,224 L256,180" />
      </g>
      <circle cx="40" cy="48" r="10" className="fill-brand-cream stroke-foreground/10" strokeWidth="2" />
      <circle cx="64" cy="18" r="6" className="fill-primary/70" />
      <circle cx="18" cy="100" r="5" className="fill-accent-foreground/40" />
      <circle cx="232" cy="40" r="7" className="fill-brand-terracotta/60" />
      <circle cx="250" cy="92" r="4" className="fill-foreground/20" />
      <circle cx="38" cy="232" r="6" className="fill-primary/50" />
      <circle cx="92" cy="252" r="4" className="fill-brand-espresso/40" />
      <circle cx="230" cy="232" r="10" className="fill-brand-cream stroke-foreground/10" strokeWidth="2" />

      {/* 四色拼圖主體：整組刻意歪斜 5 度，讓插圖讀起來像手繪速寫、
          而不是正下方 LogoStacked 圖片 logo 的重複貼上 */}
      <g transform="rotate(-5 176 176)">
        <rect x="96" y="96" width="76" height="76" rx="20" className="fill-brand-cream" />
        <rect x="180" y="96" width="76" height="76" rx="20" className="fill-brand-terracotta" />
        <rect x="96" y="180" width="76" height="76" rx="20" className="fill-brand-terracotta" />
        <rect x="180" y="180" width="76" height="76" rx="20" className="fill-brand-espresso" />

        {/* 中心連結榫接點 */}
        <circle cx="176" cy="176" r="17" className="fill-background stroke-foreground/15" strokeWidth="2.5" />
        <circle cx="176" cy="176" r="6" className="fill-primary" />
      </g>
    </svg>
  )
}

/**
 * 首頁 landing page 用的吉祥物插圖（2026-07 三次改版，取代先前的線稿人物系列）。
 * 使用者要求「設計一個符合專案的吉祥物」，直接延伸 logo 的拼圖意象：吉祥物本體
 * 就是一塊圓角方形拼圖，臉畫在方形正面，手是借用 `PuzzleHeroIllustration` 中心
 * 「榫接圓點」視覺語言的小圓球——伸出榫接點手＝伸手遞名片/連結，呼應「名片交換」
 * 的品牌概念。共用內部子元件 `MascotBody`（身體+臉+釦子狀榫接飾點+雙腳）／
 * `MascotHand`（榫接圓點手），四張插圖統一呼叫確保造型一致。顏色一律語意化
 * token：身體 `fill-primary`（赤陶橘），榫接飾點依場景用 `fill-brand-cream` 或
 * `fill-brand-espresso` 軟強調，黑色線稿一律 `stroke-foreground`。
 */

/**
 * 共用吉祥物身體子元件：圓角方形本體＋臉（雙眼+笑臉）＋一顆榫接飾點（如同
 * logo 拼圖中心的連結圓點，畫在身體一角，兼作視覺標記）＋兩隻矮腳。呼叫端用
 * `<g transform="translate(cx,cy) scale(s)">` 決定位置與大小，本體固定畫在
 * 區域中心 (0,-10) 附近。
 */
function MascotBody({ accentClass = 'fill-brand-cream' }) {
  return (
    <g>
      <rect x="-38" y="-48" width="76" height="76" rx="20" className="fill-primary stroke-foreground" strokeWidth="3.5" />
      <circle cx="22" cy="16" r="7" className={cn(accentClass, 'stroke-foreground')} strokeWidth="2.5" />
      <circle cx="-9" cy="-14" r="3" className="fill-foreground" />
      <circle cx="9" cy="-14" r="3" className="fill-foreground" />
      <path d="M-8,-4 q8,7 16,0" className="stroke-foreground" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <rect x="-20" y="24" width="15" height="18" rx="6" className="fill-primary stroke-foreground" strokeWidth="3" />
      <rect x="5" y="24" width="15" height="18" rx="6" className="fill-primary stroke-foreground" strokeWidth="3" />
    </g>
  )
}

/**
 * 共用吉祥物手部子元件：一顆榫接圓點（呼應 logo 拼圖中心連結點），呼叫端用
 * `<g transform="translate(x,y)">` 決定位置。
 */
function MascotHand({ accentClass = 'fill-brand-cream' }) {
  return <circle cx="0" cy="0" r="9" className={cn(accentClass, 'stroke-foreground')} strokeWidth="2.5" />
}

/**
 * 首頁 Hero 用：兩隻吉祥物遞交名片的插畫（取代原本的兩人插畫，構圖延用同一套
 * 前後交錯站位——後方吉祥物較小、前方較大，雙手在畫面中央交會遞出/接過名片）。
 */
export function MascotHandoffDuo({ className, size = 240 }) {
  return (
    <svg viewBox="0 0 260 260" width={size} height={size} aria-hidden="true" className={className}>
      {/* 後方吉祥物（右上，略小） */}
      <g transform="translate(178,90) scale(0.75)">
        <MascotBody accentClass="fill-brand-espresso/60" />
      </g>
      <path d="M146,72 Q128,86 118,106" className="stroke-foreground" strokeWidth="8" strokeLinecap="round" fill="none" />
      <g transform="translate(117,109)">
        <MascotHand />
      </g>

      {/* 前方吉祥物（左下，較大） */}
      <g transform="translate(96,178)">
        <MascotBody />
      </g>
      <path d="M132,166 Q155,158 162,138" className="stroke-foreground" strokeWidth="9" strokeLinecap="round" fill="none" />
      <g transform="translate(163,135)">
        <MascotHand accentClass="fill-brand-espresso/60" />
      </g>

      {/* 兩隻手交會處遞出的名片，稍微交疊表現「正在傳遞」的動態 */}
      <g transform="rotate(-18 140 122)">
        <rect x="124" y="110" width="32" height="22" rx="4" className="fill-background stroke-primary" strokeWidth="2.5" />
        <line x1="130" y1="118" x2="150" y2="118" className="stroke-primary/70" strokeWidth="2" strokeLinecap="round" />
        <line x1="130" y1="124" x2="144" y2="124" className="stroke-primary/70" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g transform="rotate(16 146 134)">
        <rect x="130" y="124" width="30" height="20" rx="4" className="fill-background stroke-primary" strokeWidth="2.5" />
      </g>
    </svg>
  )
}

/** 人才方：自信地遞出名片的吉祥物，三方卡片與人才方好處段落共用。 */
export function MascotHandoff({ className, size = 180 }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} aria-hidden="true" className={className}>
      <g transform="translate(90,108)">
        <MascotBody />
      </g>

      <path d="M126,96 Q152,100 162,120" className="stroke-foreground" strokeWidth="9" strokeLinecap="round" fill="none" />
      <g transform="translate(164,123)">
        <MascotHand />
      </g>
      <g transform="rotate(12 176 108)">
        <rect x="158" y="92" width="38" height="26" rx="4" className="fill-background stroke-primary" strokeWidth="2.5" />
        <line x1="165" y1="101" x2="188" y2="101" className="stroke-primary/70" strokeWidth="2" strokeLinecap="round" />
        <line x1="165" y1="108" x2="182" y2="108" className="stroke-primary/70" strokeWidth="2" strokeLinecap="round" />
      </g>

      <path d="M54,100 Q40,112 38,132" className="stroke-foreground" strokeWidth="9" strokeLinecap="round" fill="none" />
      <g transform="translate(37,135)">
        <MascotHand accentClass="fill-brand-espresso/60" />
      </g>
    </svg>
  )
}

/** 求才方：拿放大鏡尋找合適人選的吉祥物，三方卡片與求才方好處段落共用。 */
export function MascotSearch({ className, size = 180 }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} aria-hidden="true" className={className}>
      <g transform="translate(90,108)">
        <MascotBody accentClass="fill-brand-espresso/60" />
      </g>

      <path d="M122,90 Q146,84 156,66" className="stroke-foreground" strokeWidth="9" strokeLinecap="round" fill="none" />
      <g transform="translate(158,64)">
        <MascotHand />
      </g>
      <g transform="rotate(-15 172 48)">
        <circle cx="168" cy="46" r="18" className="fill-background/60 stroke-primary" strokeWidth="4" />
        <line x1="180" y1="58" x2="196" y2="74" className="stroke-primary" strokeWidth="6" strokeLinecap="round" />
      </g>

      <path d="M58,96 Q44,108 40,128" className="stroke-foreground" strokeWidth="9" strokeLinecap="round" fill="none" />
      <g transform="translate(39,131)">
        <MascotHand accentClass="fill-brand-cream" />
      </g>
    </svg>
  )
}

/** 雙方：兩隻吉祥物交換名片、中間一個連結火花，象徵漸進式建立信任。 */
export function MascotExchange({ className, size = 220 }) {
  return (
    <svg viewBox="0 0 260 200" width={size} height={220 * (size / 260)} aria-hidden="true" className={className}>
      {/* 左側吉祥物 */}
      <g transform="translate(66,120) scale(0.85)">
        <MascotBody />
      </g>
      <path d="M100,104 Q116,98 124,108" className="stroke-foreground" strokeWidth="8" strokeLinecap="round" fill="none" />
      <g transform="translate(126,110)">
        <MascotHand accentClass="fill-brand-espresso/60" />
      </g>

      {/* 右側吉祥物 */}
      <g transform="translate(194,120) scale(0.85)">
        <MascotBody accentClass="fill-brand-espresso/60" />
      </g>
      <path d="M160,104 Q144,98 136,108" className="stroke-foreground" strokeWidth="8" strokeLinecap="round" fill="none" />
      <g transform="translate(134,110)">
        <MascotHand />
      </g>

      {/* 中間交換的名片與連結火花 */}
      <g transform="rotate(-8 130 108)">
        <rect x="112" y="96" width="36" height="24" rx="4" className="fill-background stroke-primary" strokeWidth="2.5" />
      </g>
      <g className="fill-primary">
        <path d="M130,64 l4,12 12,4 -12,4 -4,12 -4,-12 -12,-4 12,-4 z" />
      </g>
    </svg>
  )
}

/** 通用空狀態插圖：一個等待被填滿的虛線拼圖框，象徵「還沒有內容」。 */
export function PuzzleEmptyIllustration({ className, size = 96 }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden="true" className={cn(className)}>
      <rect
        x="20"
        y="20"
        width="80"
        height="80"
        rx="20"
        fill="none"
        className="stroke-muted-foreground/45"
        strokeWidth="2.5"
        strokeDasharray="6 7"
      />
      <circle cx="58" cy="58" r="6" className="fill-brand-cream stroke-foreground/10" strokeWidth="1.5" />
      <rect
        x="78"
        y="78"
        width="34"
        height="34"
        rx="10"
        className="fill-primary/80"
        transform="rotate(8 95 95)"
      />
    </svg>
  )
}
