import React, { useMemo } from "react"

import GlobalStyle from './styles/global'
import { AppContainer } from "./styles"

import { ThemeProvider } from "styled-components"
import { ChatActionsProvider } from "./contexts/chatActionsContext"
import { useSettings } from "./contexts/settingsContext"

import { Header } from "./layouts/Header"
import { Sidebar } from "./layouts/Sidebar"
import { Main } from "./layouts/Main"
import { Settings } from "./layouts/Settings"
import { Status } from "./layouts/Status"
import { Footer } from "./layouts/Footer"

import dark from "./styles/themes/dark"
import light from "./styles/themes/light"

export const App: React.FC = () => {
  const { settings } = useSettings()

  const theme = useMemo(() => {
    return settings.darkTheme ? dark : light
  }, [settings.darkTheme])

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Header />
        <ChatActionsProvider>
          <Sidebar />
        </ChatActionsProvider>
        <Main />
        <Settings />
        <Status />
        <Footer />

        <GlobalStyle />
      </AppContainer>
    </ThemeProvider>
  )
}