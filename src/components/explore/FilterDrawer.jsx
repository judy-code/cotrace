import { useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TAIWAN_DISTRICTS, OVERSEAS_LOCATION } from '@/data/taiwanDistricts'
import { useAppState } from '@/hooks/useAppState'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { cn } from '@/lib/utils'

const FIELDS = [
  { key: 'titleKw', label: '稱號 / 代碼', placeholder: '例：UX設計師 或 R3AQ9' },
  { key: 'skill', label: '技能篩選', placeholder: '例：Figma' },
]

const BLANK_FILTER = { titleKw: '', skill: '', locs: [], sal: '', salUnit: 'year' }
const ALL_TW_DISTRICTS = TAIWAN_DISTRICTS.flatMap((c) => c.districts)

export function FilterDrawer({ open, onOpenChange }) {
  const { filterState } = useAppState()
  const dispatch = useAppDispatch()
  const [draft, setDraft] = useState(filterState)
  const [activeCity, setActiveCity] = useState(TAIWAN_DISTRICTS[0].city)

  useEffect(() => {
    if (open) setDraft(filterState)
  }, [open, filterState])

  const handleReset = () => {
    setDraft(BLANK_FILTER)
    dispatch({ type: 'RESET_FILTER' })
  }

  const handleApply = () => {
    dispatch({ type: 'SET_FILTER_STATE', payload: draft })
    onOpenChange(false)
  }

  const salUnit = draft.salUnit || 'year'
  const locs = draft.locs || []
  const activeDistricts = TAIWAN_DISTRICTS.find((c) => c.city === activeCity)?.districts || []
  const allTaiwanSelected = ALL_TW_DISTRICTS.every((d) => locs.includes(d))

  const toggleLoc = (loc) => {
    setDraft((d) => {
      const set = new Set(d.locs || [])
      if (set.has(loc)) {
        set.delete(loc)
      } else {
        set.add(loc)
      }
      return { ...d, locs: [...set] }
    })
  }

  const toggleCity = (districts) => {
    setDraft((d) => {
      const set = new Set(d.locs || [])
      const allSelected = districts.every((dist) => set.has(dist))
      districts.forEach((dist) => (allSelected ? set.delete(dist) : set.add(dist)))
      return { ...d, locs: [...set] }
    })
  }

  const toggleAllTaiwan = () => {
    setDraft((d) => {
      const set = new Set(d.locs || [])
      ALL_TW_DISTRICTS.forEach((dist) => (allTaiwanSelected ? set.delete(dist) : set.add(dist)))
      return { ...d, locs: [...set] }
    })
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-3/4 sm:max-w-sm">
        <SheetHeader>
          <SheetTitle>篩選條件</SheetTitle>
        </SheetHeader>
        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4">
          {FIELDS.map((f) => (
            <div key={f.key} className="flex flex-col gap-1.5">
              <Label className="text-xs font-normal text-muted-foreground">{f.label}</Label>
              <Input
                value={draft[f.key] || ''}
                placeholder={f.placeholder}
                onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
              />
            </div>
          ))}

          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-normal text-muted-foreground">工作地點</Label>

            <label className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium">
              <Checkbox checked={allTaiwanSelected} onCheckedChange={toggleAllTaiwan} />
              台灣（全選）
            </label>

            {/* 左側縣市清單／右側行政區勾選的兩欄式選單，比照常見台灣地址選單（如人力銀行、
                物流網站的地址選擇器）的做法，比逐一展開 22 個縣市手風琴清單好操作 */}
            <div className="flex h-64 overflow-hidden rounded-md border border-border">
              <div className="w-[38%] shrink-0 overflow-y-auto border-r border-border">
                {TAIWAN_DISTRICTS.map(({ city, districts }) => {
                  const allSelected = districts.every((d) => locs.includes(d))
                  const selectedCount = districts.filter((d) => locs.includes(d)).length
                  return (
                    <button
                      key={city}
                      type="button"
                      onClick={() => setActiveCity(city)}
                      className={cn(
                        'flex w-full items-center gap-1.5 px-2.5 py-2 text-left text-sm transition-colors',
                        activeCity === city ? 'bg-muted font-medium' : 'hover:bg-muted/60'
                      )}
                    >
                      <span className="flex-1 truncate">{city}</span>
                      {selectedCount > 0 && (
                        <span className={cn('text-xs', allSelected ? 'text-primary' : 'text-muted-foreground')}>
                          {allSelected ? districts.length : selectedCount}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                <label className="flex items-center gap-2 border-b border-border px-1 pb-2 text-sm font-medium">
                  <Checkbox
                    checked={activeDistricts.every((d) => locs.includes(d))}
                    onCheckedChange={() => toggleCity(activeDistricts)}
                  />
                  {activeCity}（全選）
                </label>
                <div className="flex flex-col gap-0.5 pt-1.5">
                  {activeDistricts.map((d) => (
                    <label key={d} className="flex items-center gap-2 rounded px-1 py-1.5 text-sm hover:bg-muted/60">
                      <Checkbox checked={locs.includes(d)} onCheckedChange={() => toggleLoc(d)} />
                      {d}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <label className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm">
              <Checkbox checked={locs.includes(OVERSEAS_LOCATION)} onCheckedChange={() => toggleLoc(OVERSEAS_LOCATION)} />
              {OVERSEAS_LOCATION}
            </label>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-normal text-muted-foreground">薪資條件（不低於）</Label>
              <Tabs value={salUnit} onValueChange={(v) => setDraft((d) => ({ ...d, salUnit: v }))}>
                <TabsList className="h-7 rounded-full bg-muted p-0.5">
                  <TabsTrigger className="rounded-full px-2.5 py-0 text-xs data-active:shadow-sm" value="month">
                    月薪
                  </TabsTrigger>
                  <TabsTrigger className="rounded-full px-2.5 py-0 text-xs data-active:shadow-sm" value="year">
                    年薪
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <Input
              value={draft.sal || ''}
              placeholder={salUnit === 'month' ? '例：8（萬/月）' : '例：100（萬/年）'}
              onChange={(e) => setDraft((d) => ({ ...d, sal: e.target.value }))}
            />
          </div>
        </div>
        <SheetFooter>
          <Button variant="outline" className="w-full" onClick={handleReset}>
            清除篩選
          </Button>
          <Button className="w-full" onClick={handleApply}>
            套用篩選
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
