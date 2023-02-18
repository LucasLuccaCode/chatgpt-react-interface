import React from "react"

import { MainContainer } from "./styles"

import { ChatContent } from "../../components/ChatContent"

export const Main: React.FC = () => {
  return (
    <MainContainer>
      <ChatContent />
    </MainContainer>
  )
}