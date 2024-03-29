import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { ToastProvider } from './contexts/toastContext'
import { DialogProvider } from './contexts/dialogContext'
import { AuthProvider } from './contexts/authContext'
import { SettingsProvider } from './contexts/settingsContext'
import { ApiProvider } from './contexts/apiContext'
import { ChatsProvider } from './contexts/chatsContext'
import { RouterProvider } from 'react-router-dom'

import { router } from './routes'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      // staleTime: 1 * 60 * 1000, // 1 min em milissegundos
    },
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>

    <ToastProvider>
      <DialogProvider>
        <AuthProvider>
          <SettingsProvider>
            <ApiProvider>
              <ChatsProvider>
                <RouterProvider router={router} />
              </ChatsProvider>
            </ApiProvider>
          </SettingsProvider>
        </AuthProvider>
      </DialogProvider>
    </ToastProvider>

    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider >
  // </React.StrictMode>,
)
