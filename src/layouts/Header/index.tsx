import React from "react"
import { useChats } from "../../contexts/chatsContext"

import { HeaderContainer, Title, ChatTitleContainer, ChatTitle } from "./styles"

import { ChatTitleActions } from "../../components/ChatTitleActions"

export const Header: React.FC = () => {
  const { currentChat } = useChats()

  return (
    <HeaderContainer>
      <Title>Chat GPT</Title>
      <ChatTitleContainer>
        <ChatTitle className="nowrap">
          {currentChat?.title || 'Clique em um chat para mostrar o conteúdo ou crie um novo'}
        </ChatTitle>

        <ChatTitleActions />
      </ChatTitleContainer>
    </HeaderContainer>
  )
}