// 「我」的名片草稿與聯絡資料範例，讓剛登入（含開發用快速登入）的使用者不用先跑一遍
// 建立名片精靈，就能直接在設置頁／CardView 預覽看到一張填好的名片，方便瀏覽與操作
// 既有功能（重新編輯名片、個資定價、實名認證後解鎖的欄位等）。
// 欄位定義對照 `src/state/initialState.js` 的 `blankCardData()`／`blankJobCardData()`。
export const SAMPLE_CARD_DATA = {
  title: '設計思考實踐者',
  jobTitle: '產品設計師',
  level: '中階（專業獨立）',
  company: 'Crescendo Studio',
  companyHidden: false,
  lang: ['中文', '英文'],
  bio: '五年 B2B SaaS 產品設計經驗，擅長把複雜的商業邏輯轉化成清楚易懂的操作流程，相信好的設計是讓使用者感覺不到設計的存在。',
  skills: ['Figma', 'Design System', '用戶研究', '原型設計'],
  goodAt: '從研究到高保真原型的完整設計流程',
  wantTo: '加入重視使用者體驗、願意投資設計文化的團隊',
  values: ['自主驅動', '開放透明', '創意表達'],
  valCustom: '',
  salary: 110,
  salaryUnit: '年薪',
  salaryMinus: 10,
  location: '台北市（可遠端）',
  workMode: ['混合式', '正職'],
  workTime: ['彈性工時'],
  styleQ: {
    q1: '可以接受不同決策，繼續執行',
    q2: '可接受模糊，能自行釐清',
    q5: '願意加班，但希望提早告知',
  },
  code: 'DV7K3',
}

export const SAMPLE_CONTACT_DATA = {
  firstName: '雅涵',
  lastName: '林',
  areaCode: '+886',
  phone: '912-345-678',
  emailAccount: 'yahan.lin',
  emailDomain: 'gmail.com',
  emailCustomDomain: '',
  price: '500',
}
