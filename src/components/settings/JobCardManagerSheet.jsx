import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ResponsiveModal } from '@/components/layout/ResponsiveModal'
import { useAppState } from '@/hooks/useAppState'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { MAX_JOB_CARDS } from '@/data/jobCardOptions'
import { JobCardFormDialog } from './JobCardFormDialog'

export function JobCardManagerSheet({ open, onOpenChange }) {
  const { jobCards } = useAppState()
  const dispatch = useAppDispatch()
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const openNew = () => {
    setEditing(null)
    setFormOpen(true)
  }
  const openEdit = (card) => {
    setEditing(card)
    setFormOpen(true)
  }

  return (
    <>
      <ResponsiveModal open={open} onOpenChange={onOpenChange} title="管理需求名片">
        <div className="mb-3 text-xs text-muted-foreground">
          已建立 {jobCards.length} / {MAX_JOB_CARDS} 張
        </div>
        <div className="mb-3 flex flex-col gap-2">
          {!jobCards.length && <div className="text-sm text-muted-foreground">尚無需求名片</div>}
          {jobCards.map((card) => (
            <div key={card.id} className="rounded-md border border-border p-3">
              <div className="mb-1 flex items-start justify-between gap-2">
                <div className="min-w-0 text-sm font-medium">{card.title}</div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(card)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'DELETE_JOB_CARD', id: card.id })}
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
              <div className="mb-2 text-xs text-muted-foreground">
                {card.company} · {card.location}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {card.workMode.map((m) => (
                  <Badge key={m} variant="secondary">
                    {m}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Button className="w-full" onClick={openNew} disabled={jobCards.length >= MAX_JOB_CARDS}>
          <Plus className="size-4" />
          {jobCards.length >= MAX_JOB_CARDS ? '已達上限' : '新增需求名片'}
        </Button>
      </ResponsiveModal>

      <JobCardFormDialog open={formOpen} onOpenChange={setFormOpen} jobCard={editing} />
    </>
  )
}
