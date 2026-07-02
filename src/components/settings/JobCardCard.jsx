import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAppState } from '@/hooks/useAppState'
import { MAX_JOB_CARDS } from '@/data/jobCardOptions'
import { JobCardManagerSheet } from './JobCardManagerSheet'

export function JobCardCard() {
  const { jobCards } = useAppState()
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-xl border border-border p-4">
      <div className="mb-1 flex items-center justify-between gap-2">
        <div className="text-sm font-medium">需求名片</div>
        <Button size="sm" variant="outline" className="shrink-0" onClick={() => setOpen(true)}>
          管理需求名片
        </Button>
      </div>
      <div className="mt-2 text-sm text-muted-foreground">
        已建立 <span className="font-medium text-foreground">{jobCards.length}</span> 張 / 上限 {MAX_JOB_CARDS} 張
      </div>
      <JobCardManagerSheet open={open} onOpenChange={setOpen} />
    </div>
  )
}
