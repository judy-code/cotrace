import { Badge } from '@/components/ui/badge'
import { AppAvatar } from '@/components/common/AppAvatar'

export function SentInviteRow({ invite }) {
  return (
    <div className="flex gap-3 border-b border-border py-3.5 last:border-b-0">
      <AppAvatar name={invite.name} colorIndex={invite.ai} size={40} />
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-start justify-between gap-2">
          <div className="min-w-0 text-sm">
            <span className="font-medium">{invite.name}</span>
            <span className="text-muted-foreground">
              {' '}
              {invite.position || invite.title}
              {invite.company ? ` · ${invite.company}` : ''}
            </span>
          </div>
          <Badge className="shrink-0 border-transparent bg-status-pending-bg text-status-pending-fg">
            邀請中
          </Badge>
        </div>
        {invite.salary && <div className="mb-2 text-xs text-muted-foreground">{invite.salary}</div>}
        <div className="text-xs leading-relaxed">{invite.why}</div>
      </div>
    </div>
  )
}
