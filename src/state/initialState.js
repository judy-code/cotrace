import { genCode } from '@/lib/code'
import { FOLDER_DEFAULTS } from '@/data/folderDefaults'
import { INITIAL_TALENT_POOL } from '@/data/talentPool'
import { INITIAL_INVITES } from '@/data/invites'
import { INITIAL_CHAT_THREADS } from '@/data/chatThreads'
import { INITIAL_JOB_CARD_POOL } from '@/data/jobCardPool'
import { INITIAL_RECEIVED_FOLLOWS } from '@/data/receivedFollows'
import { SAMPLE_CARD_DATA, SAMPLE_CONTACT_DATA } from '@/data/sampleProfile'
import { INITIAL_CARD_BOX_LIST, INITIAL_KEEP_LIST, INITIAL_BLOCK_LIST } from '@/data/cardBoxSeed'
import { INITIAL_SENT_INVITES } from '@/data/sentInvitesSeed'
import { INITIAL_JOB_CARDS } from '@/data/jobCardsSeed'

export function blankCardData() {
  return {
    title: '',
    jobTitle: '',
    level: '',
    company: '',
    companyHidden: false,
    lang: [],
    bio: '',
    skills: [],
    goodAt: '',
    wantTo: '',
    values: [],
    valCustom: '',
    salary: '',
    salaryUnit: '年薪',
    salaryMinus: 0,
    location: '',
    workMode: [],
    workTime: [],
    styleQ: {},
    code: genCode(),
  }
}

export function blankJobCardData() {
  return {
    id: null,
    title: '',
    company: '',
    workMode: [],
    budget: '',
    timeline: '',
    location: '',
    level: '',
    skills: [],
    description: '',
  }
}

// 2026-07：所有清單都預先塞入範例資料（見 `src/data/*Seed.js`／`sampleProfile.js`），
// 讓使用者一登入（含開發用快速登入）就能直接瀏覽/操作每個頁面，不用先手動跑過
// 「同意邀請」「收藏」「建立名片」等流程才會有內容可看。真正要清空重新開始的話，
// 相關頁面既有的「刪除」「取消收藏」等操作都還是正常運作，會從這份初始清單移除。
export function createInitialState() {
  return {
    isLoggedIn: false,
    user: null,
    authDialogOpen: false,
    isVerified: true,
    permission: '1',
    contactData: { ...SAMPLE_CONTACT_DATA },
    folders: [...FOLDER_DEFAULTS],
    keepList: [...INITIAL_KEEP_LIST],
    blockList: [...INITIAL_BLOCK_LIST],
    cardBoxList: [...INITIAL_CARD_BOX_LIST],
    filterState: { titleKw: '', skill: '', locs: [], sal: '', salUnit: 'year' },
    cardData: { ...SAMPLE_CARD_DATA },
    talentPool: [...INITIAL_TALENT_POOL],
    invites: [...INITIAL_INVITES],
    sentInvites: [...INITIAL_SENT_INVITES],
    jobCards: [...INITIAL_JOB_CARDS],
    jobCardPool: [...INITIAL_JOB_CARD_POOL],
    followedJobCards: INITIAL_JOB_CARD_POOL.filter((j) => [2, 4].includes(j.id)),
    receivedFollows: [...INITIAL_RECEIVED_FOLLOWS],
    explorePerspective: 'hire',
    chatThreads: [...INITIAL_CHAT_THREADS],
  }
}
