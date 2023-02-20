import React from "react"
import { Container } from "./styles"

import { Header } from "./layouts/Header"
import { Sidebar } from "./layouts/Sidebar"
import { Main } from "./layouts/Main"
import { Settings } from "./layouts/Settings"
import { Footer } from "./layouts/Footer"
import { ChatActionsProvider } from "./contexts/chatActionsContext"

export const App: React.FC = () => {
  return (
    <Container>
      <Header />

      <ChatActionsProvider>
        <Sidebar />
      </ChatActionsProvider>
      
      <Main />
      <Settings />
      <Footer />
    </Container>
  )
}