import { Routes, Route } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { RequireAuth } from '@/components/layout/RequireAuth'
import HomePage from '@/pages/HomePage'
import BuildPage from '@/pages/BuildPage'
import ExplorePage from '@/pages/ExplorePage'
import TalentDetailPage from '@/pages/TalentDetailPage'
import JobPostDetailPage from '@/pages/JobPostDetailPage'
import InvitesPage from '@/pages/InvitesPage'
import CardBoxPage from '@/pages/CardBoxPage'
import ChatPage from '@/pages/ChatPage'
import ChatThreadPage from '@/pages/ChatThreadPage'
import SettingsPage from '@/pages/SettingsPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/build" element={<BuildPage />} />
        <Route path="/explore" element={<ExplorePage />}>
          <Route path=":talentId" element={<TalentDetailPage />} />
          <Route path="job/:jobId" element={<JobPostDetailPage />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/invites" element={<InvitesPage />} />
          <Route path="/cardbox" element={<CardBoxPage />} />
          <Route path="/chat" element={<ChatPage />}>
            <Route path=":threadId" element={<ChatThreadPage />} />
          </Route>
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>
    </Routes>
  )
}
