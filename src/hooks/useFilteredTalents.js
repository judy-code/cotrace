import { useAppState } from './useAppState'

/** 依 filterState 篩選＋排序人才清單，供 TalentGrid（桌面／平板列表）與
 *  TalentSwipeStack（手機版滑動堆疊）共用，避免篩選邏輯分岔。 */
export function useFilteredTalents() {
  const { talentPool, filterState, receivedFollows } = useAppState()

  const list = talentPool.filter((t) => {
    if (filterState.titleKw) {
      const kw = filterState.titleKw.toUpperCase()
      if (t.title.toUpperCase().indexOf(kw) === -1 && (t.code || '').indexOf(kw) === -1) return false
    }
    if (filterState.skill) {
      const kw = filterState.skill.toLowerCase()
      if (!t.skills.some((s) => s.toLowerCase().includes(kw))) return false
    }
    if (filterState.locs?.length && !filterState.locs.includes(t.loc)) return false
    if (filterState.sal) {
      const threshold = parseInt(filterState.sal, 10) || 0
      const thresholdAnnual = filterState.salUnit === 'month' ? threshold * 12 : threshold
      if (t.salary < thresholdAnnual) return false
    }
    return true
  })

  // PRD 6.4.2：優先顯示篩選相符的關注人才。「除非已跳過」已經被上面的 filter 涵蓋，
  // 因為跳過會把人才從 talentPool 整個移除，不會出現在 list 裡
  const followedIds = new Set(receivedFollows.map((f) => f.talentId))
  const talents = [...list].sort((a, b) => Number(followedIds.has(b.id)) - Number(followedIds.has(a.id)))

  return { talents, followedIds }
}
