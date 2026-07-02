// 暖色調品牌色階（赤陶橙 → 橙棕 → 琥珀金 → 深棕 → 沙米），取代原本混雜藍/紫/綠的頭像色票，
// 讓多個頭像並排時仍可互相區分，但色相全數落在品牌色家族內
export const AVATAR_COLORS = [
  { bg: '#fbeae5', fg: '#7a2f1e' },
  { bg: '#f6dfcf', fg: '#94431b' },
  { bg: '#f5e6c8', fg: '#7a5710' },
  { bg: '#e7dcd4', fg: '#47211e' },
  { bg: '#f0eae0', fg: '#6b5645' },
]

export function avatarColor(index) {
  return AVATAR_COLORS[(index ?? 0) % AVATAR_COLORS.length]
}
