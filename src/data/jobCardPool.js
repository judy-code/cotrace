// PRD 6.3「找工作視角」瀏覽的需求名片池：對應 talentPool.js 的定位，
// 是「別人發布」的需求名片範例，與 jobCards（自己在設定頁管理的需求名片）分開維護。
export const INITIAL_JOB_CARD_POOL = [
  {
    id: 1, title: '資深後端工程師', company: 'Crescendo Studio',
    workMode: ['遠端', '全職'], budget: '140–160萬/年薪', timeline: '一個月內',
    location: '台北市（可遠端）', level: '中階',
    skills: ['Node.js', 'PostgreSQL', 'AWS'],
    description: '我們正在重構核心訂單系統，需要有高併發經驗的後端工程師加入，一起把系統從單體架構拆分為服務化。',
    ai: 0,
  },
  {
    id: 2, title: '產品設計師', company: 'MAYO Design',
    workMode: ['現場', '全職'], budget: '90–120萬/年薪', timeline: '立即開始',
    location: '台北市', level: '中階',
    skills: ['Figma', 'Design System', '用戶研究'],
    description: '負責 B2B SaaS 產品的介面設計與體驗優化，會直接與創辦人和工程團隊密切合作。',
    ai: 1,
  },
  {
    id: 3, title: '成長行銷顧問', company: 'AppWorks',
    workMode: ['混合式', '合約'], budget: '月費可談', timeline: '季度內',
    location: '台北市', level: '高階',
    skills: ['成長駭客', '數據分析', 'SEO'],
    description: '協助被投新創建立成長行銷框架，以顧問形式每週投入 2–3 天，時程約一季。',
    ai: 2,
  },
  {
    id: 4, title: '共同創辦人（技術）', company: '匿名早期新創',
    workMode: ['現場', '合夥'], budget: '股權為主，可談', timeline: '待定',
    location: '台北市', level: '經營管理',
    skills: ['系統架構', '團隊管理', '新創經驗'],
    description: '尋找志同道合的技術夥伴一起從 0 到 1，希望對方有獨立帶隊出過產品的經驗。',
    ai: 3,
  },
]
