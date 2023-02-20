import React from "react"
import { Container } from "./styles"

import { Header } from "./layouts/Header"
import { Sidebar } from "./layouts/Sidebar"
import { Main } from "./layouts/Main"
import { Settings } from "./layouts/Settings"
import { Footer } from "./layouts/Footer"
import { useChats } from "./contexts/chatsContext"

export const App: React.FC = () => {
  const { chats } = useChats()

  console.log('[App]', { chats })

  return (
    <Container>
      <Header />
      <Sidebar />
      <Main />
      <Settings />
      <Footer />
    </Container>
  )
}