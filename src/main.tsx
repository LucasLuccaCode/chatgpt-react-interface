import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from './styles/global'
import dark from './styles/themes/dark'

import { App } from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={dark}>
      <App />
      <GlobalStyle />
    </ThemeProvider>
  </React.StrictMode>,
)
