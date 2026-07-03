import { cn } from '@/lib/utils'

/**
 * 首頁三方卡片段落用的縮小名片示意圖（2026-07 新增，貼近使用者提供的
 * `Desktop - 1.png` 參考稿——每張三方卡片旁都放一張縮小、傾斜的名片預覽）。
 * 純裝飾性假資料，不對應任何真實名片，欄位標籤沿用 `CardView` 慣用的
 * 「最關注的領域/產業」「擅長使用的語言」等 PRD 欄位名稱以貼近真實名片觀感。
 */
export function MiniCardMock({ title, subtitle, fields = [], tags = [], className }) {
  return (
    <div
      className={cn(
        'w-44 shrink-0 rounded-lg border border-border bg-card p-3 text-left shadow-sm select-none',
        className
      )}
    >
      <div className="flex items-center gap-2">
        <div className="size-8 shrink-0 rounded-full bg-muted" />
        <div className="min-w-0">
          <div className="truncate text-xs font-medium">{title}</div>
          <div className="truncate text-[10px] text-muted-foreground">{subtitle}</div>
        </div>
      </div>
      {fields.length > 0 && (
        <div className="mt-2 space-y-1.5 border-t border-border pt-2">
          {fields.map((f) => (
            <div key={f.label}>
              <div className="text-[9px] text-muted-foreground">{f.label}</div>
              <div className="text-[10px]">{f.value}</div>
            </div>
          ))}
        </div>
      )}
      {tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.map((t) => (
            <span key={t} className="rounded bg-secondary px-1.5 py-0.5 text-[9px] text-secondary-foreground">
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
