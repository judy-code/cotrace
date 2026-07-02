import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/common/FieldGroup'
import { RadioOptionList } from '@/components/common/RadioOptionList'
import { TagSelectGroup } from '@/components/common/TagSelectGroup'
import { SkillTagInput } from '@/components/common/SkillTagInput'
import { CompanyAutocomplete } from '@/components/build/CompanyAutocomplete'
import { ResponsiveModal } from '@/components/layout/ResponsiveModal'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { blankJobCardData } from '@/state/initialState'
import { JOB_WORK_MODE_OPTIONS, JOB_TIMELINE_OPTIONS, JOB_CAREER_LEVELS } from '@/data/jobCardOptions'

function validate(draft) {
  const errors = {}
  if (!draft.title.trim()) errors.title = '請填寫職稱'
  if (!draft.company.trim()) errors.company = '請填寫公司'
  if (!draft.workMode.length) errors.workMode = '請選擇至少一種工作模式'
  if (!String(draft.budget).trim()) errors.budget = '請填寫預算'
  if (!draft.timeline) errors.timeline = '請選擇時程'
  if (!draft.location.trim()) errors.location = '請填寫工作地點'
  if (!draft.level) errors.level = '請選擇所需職涯落點'
  if (!draft.skills.length) errors.skills = '請新增至少一個期望技能'
  if (!draft.description.trim()) errors.description = '請填寫需求描述'
  return errors
}

export function JobCardFormDialog({ open, onOpenChange, jobCard }) {
  const dispatch = useAppDispatch()
  const [draft, setDraft] = useState(blankJobCardData())
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (open) {
      setDraft(jobCard ?? blankJobCardData())
      setErrors({})
    }
  }, [open, jobCard])

  const patch = (fields) => setDraft((d) => ({ ...d, ...fields }))

  const save = () => {
    const errs = validate(draft)
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    if (jobCard) {
      dispatch({ type: 'UPDATE_JOB_CARD', payload: draft })
      toast('需求名片已更新')
    } else {
      dispatch({ type: 'ADD_JOB_CARD', payload: draft })
      toast('需求名片已建立')
    }
    onOpenChange(false)
  }

  return (
    <ResponsiveModal open={open} onOpenChange={onOpenChange} title={jobCard ? '編輯需求名片' : '新增需求名片'}>
      <FieldGroup label="職稱" required error={errors.title}>
        <Input
          placeholder="例：資深後端工程師"
          value={draft.title}
          onChange={(e) => patch({ title: e.target.value })}
        />
      </FieldGroup>

      <FieldGroup label="公司" required error={errors.company}>
        <CompanyAutocomplete value={draft.company} onChange={(v) => patch({ company: v })} />
      </FieldGroup>

      <FieldGroup label="工作模式" required error={errors.workMode}>
        <TagSelectGroup
          options={JOB_WORK_MODE_OPTIONS}
          selected={draft.workMode}
          onToggle={(opt) =>
            patch({
              workMode: draft.workMode.includes(opt)
                ? draft.workMode.filter((o) => o !== opt)
                : [...draft.workMode, opt],
            })
          }
        />
      </FieldGroup>

      <FieldGroup label="預算" required error={errors.budget} hint="金額可與人選進一步議定">
        <Input placeholder="例：120萬/年薪" value={draft.budget} onChange={(e) => patch({ budget: e.target.value })} />
      </FieldGroup>

      <FieldGroup label="時程" required error={errors.timeline}>
        <RadioOptionList
          options={JOB_TIMELINE_OPTIONS}
          value={draft.timeline}
          onChange={(v) => patch({ timeline: v })}
        />
      </FieldGroup>

      <FieldGroup label="工作地點" required error={errors.location}>
        <Input placeholder="例：台北市" value={draft.location} onChange={(e) => patch({ location: e.target.value })} />
      </FieldGroup>

      <FieldGroup label="所需職涯落點" required error={errors.level}>
        <RadioOptionList options={JOB_CAREER_LEVELS} value={draft.level} onChange={(v) => patch({ level: v })} />
      </FieldGroup>

      <FieldGroup label="期望技能" required error={errors.skills}>
        <SkillTagInput value={draft.skills} onChange={(v) => patch({ skills: v })} />
      </FieldGroup>

      <FieldGroup label="需求描述" required error={errors.description}>
        <Textarea
          rows={4}
          placeholder="說明此需求的細節，讓對的人選看到會想關注"
          value={draft.description}
          onChange={(e) => patch({ description: e.target.value })}
        />
      </FieldGroup>

      <Button className="w-full" onClick={save}>
        {jobCard ? '儲存變更' : '建立需求名片'}
      </Button>
    </ResponsiveModal>
  )
}
