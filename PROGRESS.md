# PROGRESS.md

給接續工作用的進度紀錄，開新對話時先讀這份，不用重新分析 PRD／掃程式碼。

## 2026-07-02

- 讀取 PRD 0.9.0（專案根目錄 `../CoTrace_MVP_PRD 0.9.0｜Notion (...).html`），
  比對 `my-project/src` 現有程式碼
- 更新 `CLAUDE.md`：
  - 「專案簡介」補上 PRD 版本號與 Sender/Talent/Exchange 核心術語
  - 新增「**PRD 對照與目前實作範圍**」章節（完整落差表，含每個模組✅/⚠️/❌狀態）
  - 「待辦事項」拆成「既有技術債」+「PRD 0.9.0 新功能」兩類
- 結論：現有網站只做了 PRD 一~四章（單向邀請/名片交換/聊天），PRD 新增的
  **雙向市場**（需求名片＋視角切換＋關注）與**信任機制**（面談評分）完全未開發

## 2026-07-02（續）

- **收藏 vs 保留區 命名釐清（已完成）**：從 PRD 原始 HTML 匯出文字比對，確認 PRD 3.1
  功能總覽表正式名稱為「收藏(Save)」，4.4.2 行為細節稱容器為「保留區」（PRD 原文
  本身用詞不一致，非程式碼命名錯誤）。行為邏輯（僅作用於人選名片、不觸發通知）
  已完全符合 PRD，唯一落差是 UI 文字。已將 `TalentDetailPanel.jsx` 按鈕/toast、
  `CardBoxPage.jsx` 頁籤統一改為「收藏」；內部 action/state（`ADD_KEEP`/`keepList`）
  維持不變。確認「收藏」（人選名片、不觸發通知）與 PRD 6.4「關注」（需求名片、
  觸發通知）是兩套獨立機制，未來不會共用元件。

## 2026-07-02（續 2）

- **通知系統重構（已完成）**：
  - `navItems.js`：icon `Inbox` → `Bell`、label「邀請」→「通知」（`BottomNav`／`Sidebar` 共用同一份設定，自動套用）
  - `InvitesPage.jsx` 改用 `Tabs` 拆成「邀請／已邀請／關注」三子頁籤（路徑仍是 `/invites`，未改路徑本身）
  - 過程中發現送出邀請（`InviteForm`／`CardBoxInviteDialog`）原本只跳 toast、沒有真的存資料，
    「已邀請」頁籤沒有東西可顯示 —— 已新增 `state.sentInvites` + `SEND_INVITE` action，
    兩個發送邀請的流程都會 dispatch，`SentInviteRow.jsx` 顯示「邀請中」狀態
    （固定 pending，因為是本機模擬、沒有對方帳號可真的回應）
  - 「關注」頁籤目前只有空狀態骨架，資料來源依賴下面第 2 項「關注機制」
  - 同步更新 `Design.md` 圖示對照表、`CLAUDE.md` 路由表／落差表／action 清單
  - `npm run lint` + `npm run build` 皆過

## 2026-07-02（續 3）

- **需求名片（Job Card）（已完成）**：
  - 新增 `data/jobCardOptions.js`：`JOB_WORK_MODE_OPTIONS`／`JOB_TIMELINE_OPTIONS`／
    `JOB_CAREER_LEVELS`／`MAX_JOB_CARDS`（=10），刻意跟人選名片既有的
    `workModeOptions.js`／`careerLevels.js` 分開，因為 PRD 6.2.1 跟 4.2.1 選項數值本來就不同
    （例如需求名片工作模式多了「合約／合夥」）
  - `state`：新增 `jobCards: []` + `blankJobCardData()`，reducer 加 `ADD_JOB_CARD`
    （超過上限忽略）/`UPDATE_JOB_CARD`/`DELETE_JOB_CARD`
  - UI：設定頁新增 `JobCardCard`（顯示張數、開管理入口）→ `JobCardManagerSheet`
    （清單/刪除/開新增編輯）→ `JobCardFormDialog`（8 欄位表單，草稿+送出才寫回的模式，
    跟 `BuildWizard`/`ContactEditDialog` 一致）
  - `npm run lint` + `npm run build` 皆過；同步更新 `CLAUDE.md` 落差表/action 清單/模擬資料清單

## 2026-07-02（續 4）

- **探索視角切換（部分完成）**：
  - 新增 `state.explorePerspective`（`'hire'`／`'jobseek'`）+ `SET_EXPLORE_PERSPECTIVE` action
  - 新增 `data/jobCardPool.js`：4 筆「別人發布」的需求名片範例，對應 `talentPool.js` 的定位，
    跟自己在設定頁管理的 `jobCards` 分開
  - 新增 `PerspectiveSwitcher`（探索頁左上角，點擊左側滑出選單，符合 PRD 6.3.1 UI 規格）、
    `JobPostCard`/`JobPostGrid`（PRD 6.3.2 卡片顯示公司名稱/職稱/工作模式/預算）
  - `ExplorePage.jsx` 依視角切換渲染 `TalentGrid` 或 `JobPostGrid`
  - **刻意跳過本輪**（跟使用者確認過）：需求名片詳情頁 + PRD 6.4.1「關注」CTA
    （點需求名片目前沒有詳情頁可點進去，只做到列表瀏覽）；`FilterDrawer` 沒有依視角換欄位標籤，
    也沒有套用預算篩選（需求名片預算是自由格式文字如「140–160萬/年薪」「股權為主，可談」，
    不是人選名片 `salary` 那種數字，無法直接套用現有的 `sal` 數字篩選邏輯）
  - `npm run lint` + `npm run build` 皆過；同步更新 `CLAUDE.md`

## 2026-07-02（續 5）

- **關注機制（已完成）**：
  - 新增需求名片詳情頁 `/explore/job/:jobId`（`JobPostDetailPanel`/`JobPostDetailPage`），
    有「關注」/「已關注（取消）」切換按鈕；`JobPostCard` 從靜態 div 改成可點擊按鈕導頁進來
  - 新增 `state.followedJobCards` + `FOLLOW_JOB_CARD`（依 id 去重，符合 PRD 6.4.1「不可重複
    關注」）/`UNFOLLOW_JOB_CARD`；設定頁新增「關注中的需求」卡片 → `FollowedJobsManagerSheet`
    可取消關注
  - Sender 端通知：跟使用者確認過，這個 app 是單一使用者本機模擬、沒有其他帳號可以真的
    關注你，所以跟 `invites.js` 一樣新增 `data/receivedFollows.js` 預先 seed 2 筆模擬通知
    （`talentId` 對應 `talentPool.js` 既有人才），`/invites`「關注」頁籤改用
    `FollowNotificationRow` 顯示，點頭像/名稱可查看人選名片＋執行邀請/收藏/跳過
    （符合 PRD 6.4.3，重用 `CardBoxInviteDialog`）
  - PRD 6.4.2「優先顯示篩選相符的關注人才」：跟使用者確認過也一起做，`TalentGrid.jsx`
    把 `receivedFollows` 中的人才排到篩選結果最前面，並在 `TalentCard` 加一行「關注了你的
    需求名片」提示；「除非已跳過」不用額外處理，因為跳過本來就會把人才從 `talentPool`
    移除，自然不會出現在排序結果裡
  - `npm run lint` + `npm run build` 皆過；同步更新 `CLAUDE.md`（含新路由 `/explore/job/:jobId`）

## 2026-07-02（續 6）

- **品牌識別／設計系統改版（已完成）**：
  - 套用使用者提供的新版 CoTrace logo（拼圖圖標＋COTRACE 字樣，`logo.webp`）：用 sharp
    程式化取樣像素色值（非肉眼估色），裁切出 `public/logo-mark.png`（純圖標）／
    `public/logo-full.png`（堆疊版）／favicon 系列／apple-touch-icon，新增
    `components/common/Logo.jsx`（`LogoMark`/`Logo`/`LogoStacked`）取代原本用 CSS
    手刻的「Co ＋ 色彩化 Trace」純文字 logotype
  - 色彩系統改用直接取樣自 logo 的品牌色（赤陶橙 `#b64937`／米杏 `#f7eedd`／深棕
    `#47211e`），逐一驗算 WCAG AA 對比度後寫入 `src/index.css` 語意 token
  - 字體改用 Google Fonts（Inter + Noto Sans TC），對應中文為主、英數混排的需求
  - 依 Apple Human Interface Guidelines 精神（clarity/deference/depth）在 `Design.md`
    補上「設計原則」一節
  - 使用者反饋後二次調整：**主要背景改回純白**（品牌色只用在標籤／hover 等次要區塊，
    不佔滿整體版面）、**移除紫色系**（`brand-purple*` token 全刪，核心技能標籤改用赤陶橙
    `accent`、解鎖訊息氣泡新增 `brand-espresso-tint`）、**頭像色票**從藍／紫／綠混雜
    改成赤陶橙→橙棕→琥珀金→深棕→沙米五階暖色調、**已驗證徽章**綠色調降飽和度（保留
    「綠＝已驗證」語意但融入暖色調色盤），待回應橙色維持不變（本來就在品牌色相範圍內）
  - `npm run lint` + `npm run build` 皆過，並用 Playwright 對歡迎頁／探索頁／名片詳情／
    通知／聊天／設置頁截圖驗證
- **導覽列改版（已完成）**：
  - 使用者反饋「要一般網頁規範格式，navbar 在上方，手機版才到左側」——把桌面左側常駐
    `Sidebar` ＋ 手機底部 `BottomNav` 的 App 化版型，改成頂部固定導覽列 `Navbar.jsx`
    （桌面版水平排列導覽項目；手機版收合成漢堡選單，用 `Sheet side="left"` 從左側滑出，
    取代原本的底部分頁列）
  - 刪除 `Sidebar.jsx`／`TopBar.jsx`／`BottomNav.jsx` 三元件，合併成單一 `Navbar.jsx`；
    `AppShell.jsx` 簡化為 `Navbar` + `Outlet`
  - `npm run lint` + `npm run build` 皆過，Playwright 驗證桌面水平導覽與手機漢堡選單／
    左側抽屜的展開／導頁行為
  - 同步更新 `Design.md`（新增「品牌識別」「導覽列」章節、色票對應表、響應式中斷點）與
    `CLAUDE.md`（路由表說明、目錄結構）
- **已提交**：`git commit 91d8e8a`「品牌改版：套用新版 CoTrace logo、重製色彩與字體系統、
  導覽列改為頂部橫向排列」，尚未 push 到遠端

## 下一步待完成（建議優先順序，細節見 `CLAUDE.md` →「PRD 對照與目前實作範圍」）

1. **面談與評分機制**：風險徽章 + 面談邀請卡片 + 多維度評分問卷 —— 量體最大，PRD 第五章整章，建議排最後（目前唯一還沒動工的 PRD 0.9.0 新功能大項）
2. 補規則類小項：邀請每日額度限制、名片夾 200 張上限、黑名單容量
3. 較小的收尾項：`FilterDrawer` 依探索視角切換欄位標籤／支援需求名片預算篩選

## 尚未確認事項（需要跟 PM/使用者再對齊）

- PRD 5.5「評分結果處理」PRD 本身標註「待更新」，權重數字可能還會變
- 面談評分是否要在 MVP 就做，或先做需求名片+視角切換這個「雙向市場」半套再上線
