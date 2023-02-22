import React from "react"
import { AppContainer } from "./styles"

import { ChatActionsProvider } from "./contexts/chatActionsContext"

import { Header } from "./layouts/Header"
import { Sidebar } from "./layouts/Sidebar"
import { Main } from "./layouts/Main"
import { Settings } from "./layouts/Settings"
import { Status } from "./layouts/Status"
import { Footer } from "./layouts/Footer"

export const App: React.FC = () => {
  return (
    <AppContainer>
      <Header />
      <ChatActionsProvider>
        <Sidebar />
      </ChatActionsProvider>
      <Main />
      <Settings />
      <Status />
      <Footer />
    </AppContainer>
  )
}