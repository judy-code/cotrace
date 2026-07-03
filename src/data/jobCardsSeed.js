// 設置頁「需求名片」管理入口的範例資料（我自己發布的需求名片），
// 欄位形狀對照 `initialState.js` 的 `blankJobCardData()`。
export const INITIAL_JOB_CARDS = [
  {
    id: 8001, title: '資深前端工程師', company: 'Crescendo Studio',
    workMode: ['遠端', '全職'], budget: '130–150萬/年薪', timeline: '一個月內',
    location: '台北市（可遠端）', level: '中階',
    skills: ['React', 'TypeScript', 'Next.js'],
    description: '負責重構主力產品的前端架構，需要熟悉現代前端工程化與效能優化。',
  },
  {
    id: 8002, title: '資深視覺設計師', company: 'Crescendo Studio',
    workMode: ['現場', '兼職'], budget: '月薪 6–8萬', timeline: '立即開始',
    location: '台北市', level: '中階',
    skills: ['品牌識別', '平面設計', '插畫'],
    description: '協助打造品牌視覺系統，包含行銷素材與產品內部插畫風格。',
  },
]
