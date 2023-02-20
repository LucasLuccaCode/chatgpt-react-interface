import React, { useEffect, useRef, RefObject, useCallback } from "react"
import { useChats } from "../../contexts/chatsContext"

import { Main, ChatContainer, Placeholder } from "./styles"

import { ChatCard } from "./ChatCard"

export const ChatContent: React.FC = () => {
  const { currentChat } = useChats()
  const chatContainer: RefObject<HTMLUListElement> = useRef(null);

  useEffect(() => {
    if (chatContainer.current) {
      chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
    }
  }, [chatContainer.current])

  const chatContent = currentChat?.data || []

  const renderChatContent = useCallback(() => {
    if (chatContent.length) {
      return (
        chatContent.map(chatItem => (
          <ChatCard key={chatItem.id} chatItem={chatItem} />
        ))
      )
    }

    return (
      <Placeholder>
        O conteúdo do chat clicado aparecerá aqui...
      </Placeholder>
    )
  }, [chatContent])

  return (
    <Main>
      <ChatContainer ref={chatContainer}>
        {renderChatContent()}
      </ChatContainer>
    </Main>
  )
}