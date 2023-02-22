import React from "react"
import { useChats } from "../../contexts/chatsContext";

import { MainContainer, Placeholder } from "./styles"

import { ChatContent } from "../../components/ChatContent"

export const Main: React.FC = () => {
  const { currentChat } = useChats();

  const mainClass = currentChat ? 'has-chat' : ''

  return (
    <MainContainer className={mainClass}>
      {!currentChat?.data.length ? (
        <Placeholder>O conteúdo do chat aparecerá aqui...</Placeholder>
      ) : (
        <ChatContent />
      )}
    </MainContainer>
  )
}