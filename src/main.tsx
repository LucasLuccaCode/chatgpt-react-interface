import ReactDOM from 'react-dom/client'

import { SettingsProvider } from './contexts/settingsContext'
import { ChatsProvider } from './contexts/chatsContext'
import { ApiProvider } from './contexts/apiContext'

import { App } from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <SettingsProvider>
    <ChatsProvider>
      <ApiProvider>
        <App />
      </ApiProvider>
    </ChatsProvider>
  </SettingsProvider>
  // </React.StrictMode>,
)
