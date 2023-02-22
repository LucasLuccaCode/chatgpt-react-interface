import ReactDOM from 'react-dom/client'

import { SettingsProvider } from './contexts/settingsContext'
import { ChatsProvider } from './contexts/chatsContext'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from './styles/global'
import dark from './styles/themes/dark'

import { App } from './App'
import { ApiProvider } from './contexts/apiContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <SettingsProvider>
    <ChatsProvider>
      <ApiProvider>
        <ThemeProvider theme={dark}>
          <App />
          <GlobalStyle />
        </ThemeProvider>
      </ApiProvider>
    </ChatsProvider>
  </SettingsProvider>
  // </React.StrictMode>,
)
