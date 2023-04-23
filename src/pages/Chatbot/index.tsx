import React from "react"

import { ChatbotContainer } from "./styles"

import { ChatActionsProvider } from "../../contexts/chatActionsContext"

import { Header } from "./Header"
import { Sidebar } from "./Sidebar"
import { Main } from "./Main"
import { Settings } from "./Settings"
import { Status } from "./Status"
import { Footer } from "./Footer"


const Chatbot: React.FC = () => {
  return (
    <ChatbotContainer>
      <Header />
      <ChatActionsProvider>
        <Sidebar />
      </ChatActionsProvider>
      <Main />
      <Settings />
      <Status />
      <Footer />
    </ChatbotContainer>
  )
}

export default Chatbot