// 第二筆 name 刻意對應 `cardBoxSeed.js` 的 `INITIAL_CARD_BOX_LIST[0].name`，
// 這樣點聊天室頭像時 `ChatThreadView.buildThreadCard()` 才能比對到名片夾裡的名片
// 顯示完整內容（跟第一筆對應 `invites.js` 的做法一致，見該元件的 `buildThreadCard`）。
export const INITIAL_CHAT_THREADS = [
  {
    id: 1, name: 'Kevin Chen', company: 'Crescendo Studio', preview: '感謝回覆！方便這週安排視訊嗎？',
    time: '10:32', unread: true, av: 'KC', ai: 0,
    msgs: [
      { f: 'them', t: '你好！很高興你接受了邀請。我是 CPO Kevin。' },
      { f: 'them', t: '感謝回覆！方便這週安排視訊嗎？' },
    ],
    unlockSent: true, unlockDone: false,
  },
  {
    id: 2, name: '演算法探索家', company: '訊連科技', preview: '太好了，那我們約下週三下午2點方便嗎？',
    time: '昨天', unread: false, av: '演', ai: 0,
    msgs: [
      { f: 'sys', t: '名片交換成功，對話已開啟' },
      { f: 'them', t: '你好，很高興能與你交換名片！我對你在機器學習領域的經驗很感興趣。' },
      { f: 'me', t: '你好！謝謝，我也對貴公司在影像辨識的專案很有興趣，方便多聊聊嗎？' },
      { f: 'them', t: '當然，我們最近在找人一起優化推薦系統的模型表現。' },
      { f: 'sys', t: '你已同意揭露個人聯絡資訊' },
      { f: 'them', t: '太好了，那我們約下週三下午2點方便嗎？' },
    ],
    unlockSent: true, unlockDone: true,
  },
]
