import ReactDOM from 'react-dom/client'

import { ToastProvider } from './contexts/toastContext'
import { AuthProvider } from './contexts/authContext'
import { SettingsProvider } from './contexts/settingsContext'
import { ApiProvider } from './contexts/apiContext'
import { ChatsProvider } from './contexts/chatsContext'
import { RouterProvider } from 'react-router-dom'

import { router } from './routes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <ToastProvider>
    <AuthProvider>
      <SettingsProvider>
        <ApiProvider>
          <ChatsProvider>
            <RouterProvider router={router} />
          </ChatsProvider>
        </ApiProvider>
      </SettingsProvider>
    </AuthProvider>
  </ToastProvider>
  // </React.StrictMode>,
)
