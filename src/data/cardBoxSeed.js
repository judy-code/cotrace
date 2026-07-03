// 名片夾頁三個分頁（名片夾／收藏／黑名單）的範例資料，讓剛登入的使用者不用先走過
// 「同意邀請」「收藏」「加入黑名單」的完整流程，就能直接看到三個分頁各自有內容可操作。

// 名片夾（已交換名片，對應 `ACCEPT_INVITE` 產生的形狀，這裡額外補上 CardView 用得到的
// level/code/bio/salary/location/workMode/values 欄位，讓「查看名片」彈窗顯示更完整）。
export const INITIAL_CARD_BOX_LIST = [
  {
    id: 101, name: '演算法探索家', ini: '演', title: '資料科學家', code: 'PX9K4', level: '高階', company: '訊連科技',
    lang: ['中文', '英文'], skills: ['Python', '機器學習', 'A/B 測試'],
    bio: '專注於推薦系統與使用者行為預測，曾主導將產品的個人化推薦點擊率提升 35%。',
    goodAt: '把模糊的業務問題轉化成可驗證的機器學習任務', wantTo: '在更大規模的資料場景磨練模型調優能力',
    values: ['技術創新', '持續學習'], salary: 150, salaryUnit: '年薪', salaryMinus: 5,
    location: '台北市', workMode: ['混合式'], ai: 0, folder: '潛力人選',
  },
  {
    id: 102, name: '使用者旅程繪圖師', ini: '使', title: 'UX 研究員', code: 'UR3M8', level: '中階', company: '91APP',
    lang: ['中文'], skills: ['用戶訪談', '可用性測試', '資訊架構'],
    bio: '相信每個轉換率數字背後都有一段真實的使用者情緒，擅長把質性訪談轉譯成可執行的設計建議。',
    goodAt: '設計並執行完整的可用性測試流程', wantTo: '建立跨團隊都認同的研究文化',
    values: ['開放透明'], salary: 95, salaryUnit: '年薪', salaryMinus: 0,
    location: '台中市', workMode: ['現場'], ai: 1, folder: '',
  },
]

// 收藏（尚未交換名片，Want 區塊仍鎖定，欄位比照 talentPool.js 的人選名片形狀）。
export const INITIAL_KEEP_LIST = [
  {
    id: 103, name: '成長駭客實驗家', ini: '成', title: '成長行銷經理', code: 'GH5T2', level: '中階', company: '隱藏',
    lang: ['中文', '英文'], skills: ['A/B 測試', 'SEO', '數據分析'],
    bio: '用一連串小實驗找出成長槓桿，曾協助電商平台在半年內把獲客成本降低 40%。',
    goodAt: '設計並解讀成長實驗', wantTo: '加入願意快速迭代的產品團隊',
    values: ['商業價值', '持續學習'], ai: 2, salary: 100, loc: '台北市', inviteSent: false,
  },
  {
    id: 104, name: '介面細節控', ini: '介', title: '前端工程師', code: 'FE8Q1', level: '中階', company: '新創 X',
    lang: ['中文'], skills: ['React', 'TypeScript', 'CSS'],
    bio: '對像素級的介面細節有近乎偏執的堅持，也熟悉前端效能優化。',
    goodAt: '把設計稿精準還原成流暢的互動介面', wantTo: '參與從 0 到 1 的產品開發',
    values: ['務實導向'], ai: 3, salary: 110, loc: '新竹市', inviteSent: true,
  },
]

// 黑名單（比照名片夾形狀，只是移到封鎖清單）。
export const INITIAL_BLOCK_LIST = [
  {
    id: 105, name: '陌生開發衝刺手', ini: '陌', title: '業務開發專員', company: '某傳產公司',
    lang: ['中文'], skills: ['陌生開發', '電話銷售'], goodAt: '', wantTo: '', ai: 4, folder: '',
  },
]
