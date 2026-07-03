import { Search, Bell, CreditCard, MessageCircle } from 'lucide-react'

export const NAV_ITEMS = [
  { to: '/explore', label: '探索', icon: Search },
  { to: '/invites', label: '通知', icon: Bell, badge: true, authRequired: true },
  { to: '/cardbox', label: '名片夾', icon: CreditCard, authRequired: true },
  { to: '/chat', label: '聊天', icon: MessageCircle, authRequired: true },
]
