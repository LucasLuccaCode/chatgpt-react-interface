import ReactDOM from 'react-dom/client'

import { SettingsProvider } from './contexts/settingsContext'
import { ChatsProvider } from './contexts/chatsContext'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from './styles/global'
import dark from './styles/themes/dark'

import { App } from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <SettingsProvider>
    <ChatsProvider>
      <ThemeProvider theme={dark}>
        <App />
        <GlobalStyle />
      </ThemeProvider>
    </ChatsProvider>
  </SettingsProvider>
  // </React.StrictMode>,
)
