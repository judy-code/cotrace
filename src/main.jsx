import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import App from './App.jsx'
import { AppProvider } from '@/state/AppContext'
import { Toaster } from '@/components/ui/sonner'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ''}>
      <HashRouter>
        <AppProvider>
          <App />
          <Toaster position="bottom-center" />
        </AppProvider>
      </HashRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
)
