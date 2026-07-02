// PRD 6.4.2：求才方於「通知頁→關注」收到別人關注自己需求名片的通知。
// 這個 app 是單一使用者本機模擬，沒有其他真實帳號會關注你，所以跟 invites.js 一樣
// 預先 seed 幾筆模擬通知，talentId 對應 talentPool.js 既有的範例人才。
export const INITIAL_RECEIVED_FOLLOWS = [
  { id: 1, talentId: 3, jobCardTitle: '資深後端工程師', followedAt: '3 小時前' },
  { id: 2, talentId: 2, jobCardTitle: '產品設計師', followedAt: '昨天' },
]
