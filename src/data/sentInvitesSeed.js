// 通知頁「已邀請」分頁的範例資料，欄位形狀對照 `appReducer.js` 的 `SEND_INVITE` action
// 產生的形狀。talentId 對應 `talentPool.js` 既有人才，狀態固定 pending（本機模擬、
// 沒有對方帳號可真的回應），跟 `SentInviteRow.jsx` 一律顯示「邀請中」的邏輯一致。
export const INITIAL_SENT_INVITES = [
  {
    id: 9001, talentId: 1, name: '策略型產品人', title: '產品經理', company: '', ai: 0,
    why: '我們正在找有 B2C 經驗的產品負責人，看到你的背景非常心動，希望能進一步聊聊。',
    position: '資深產品經理', salary: 'NT$150–180萬/年', status: 'pending',
  },
  {
    id: 9002, talentId: 4, name: '品牌故事編織者', title: '行銷企劃', company: '', ai: 3,
    why: '你的品牌內容作品集讓我們印象深刻，想邀請你加入我們的行銷團隊。',
    position: '品牌行銷專員', salary: 'NT$65–75萬/年', status: 'pending',
  },
]
