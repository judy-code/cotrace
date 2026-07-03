import { useState } from 'react'
import { Outlet, useMatch } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MasterDetailLayout } from '@/components/layout/MasterDetailLayout'
import { TalentGrid } from '@/components/explore/TalentGrid'
import { TalentSwipeStack } from '@/components/explore/TalentSwipeStack'
import { JobPostGrid } from '@/components/explore/JobPostGrid'
import { PerspectiveSwitcher } from '@/components/explore/PerspectiveSwitcher'
import { FilterDrawer } from '@/components/explore/FilterDrawer'
import { useAppState } from '@/hooks/useAppState'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export default function ExplorePage() {
  const talentMatch = useMatch('/explore/:talentId')
  const jobMatch = useMatch('/explore/job/:jobId')
  const { explorePerspective, filterState } = useAppState()
  const [filterOpen, setFilterOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const activeFilterCount =
    Number(!!filterState.titleKw) +
    Number(!!filterState.skill) +
    Number(!!filterState.sal) +
    (filterState.locs?.length ? 1 : 0)

  return (
    <>
      <MasterDetailLayout
        list={
          <div className="flex h-full min-h-0 flex-col">
            <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3 md:px-6">
              <PerspectiveSwitcher />
              <button
                type="button"
                onClick={() => setFilterOpen(true)}
                className={cn(
                  'flex items-center gap-1.5 text-sm transition-colors',
                  activeFilterCount ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                <SlidersHorizontal className="size-4" strokeWidth={1.5} />
                <span className="hidden sm:inline">篩選{activeFilterCount ? ` (${activeFilterCount})` : ''}</span>
              </button>
            </div>
            <div className={cn('min-h-0 flex-1', isDesktop ? 'overflow-y-auto' : 'overflow-hidden')}>
              {explorePerspective === 'jobseek' ? (
                <JobPostGrid />
              ) : isDesktop ? (
                <TalentGrid />
              ) : (
                <TalentSwipeStack />
              )}
            </div>
          </div>
        }
        detailActive={!!talentMatch || !!jobMatch}
        emptyState="選擇左側名片以查看詳情"
      >
        <Outlet />
      </MasterDetailLayout>
      <FilterDrawer open={filterOpen} onOpenChange={setFilterOpen} />
    </>
  )
}
