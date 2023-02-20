import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from './styles/global'
import dark from './styles/themes/dark'

import { App } from './App'
import { ChatsProvider } from './contexts/chatsContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <ChatsProvider>
      <ThemeProvider theme={dark}>
        <App />
        <GlobalStyle />
      </ThemeProvider>
    </ChatsProvider>
  // </React.StrictMode>,
)
