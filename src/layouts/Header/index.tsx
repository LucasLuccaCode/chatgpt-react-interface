import React from "react"

import { HeaderContainer, Title, ChatTitleContainer, ChatTitle } from "./styles"

import { ChatTitleActions } from "../../components/ChatTitleActions"

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Title>Chat GPT</Title>
      <ChatTitleContainer>
        <ChatTitle className="nowrap">
          Defina inteligência artificial
        </ChatTitle>

        <ChatTitleActions />
      </ChatTitleContainer>
    </HeaderContainer>
  )
}