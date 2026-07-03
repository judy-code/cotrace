import { useFilteredTalents } from '@/hooks/useFilteredTalents'
import { EmptyState } from '@/components/common/EmptyState'
import { staggerDelay } from '@/lib/utils'
import { TalentCard } from './TalentCard'

export function TalentGrid() {
  const { talents, followedIds } = useFilteredTalents()

  if (!talents.length) return <EmptyState text="沒有符合條件的人才" />

  return (
    <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-2 md:p-6 lg:grid-cols-1">
      {talents.map((t, i) => (
        <div key={t.id} className="animate-in fade-in slide-in-from-bottom-2 duration-500" style={staggerDelay(i)}>
          <TalentCard talent={t} isFollower={followedIds.has(t.id)} />
        </div>
      ))}
    </div>
  )
}
