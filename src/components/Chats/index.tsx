import React, { useMemo } from "react"
import { useChats } from "../../contexts/chatsContext"

import { ChatsContainer, Placeholder } from "./styles"

import { Chat } from "./Chat"

interface ChatsProps {
  filter: string
}

export const Chats: React.FC<ChatsProps> = ({ filter }) => {
  const { chats, currentChatId, setCurrentChatId } = useChats()

  const filteredChats = useMemo(() => {
    return chats.filter(({ title }) => title.toLowerCase().includes(filter.toLowerCase()))
  }, [chats, filter])

  return (
    <ChatsContainer>
      {!!chats.length ? (
        filteredChats.map(chat => (
          <Chat
            key={chat.id}
            id={chat.id}
            title={chat.title}
            isActive={chat.id === currentChatId}
            setCurrentChatId={() => setCurrentChatId(chat.id)}
          />
        ))
      ) : (
        <Placeholder>Nenhum chat</Placeholder>
      )}
    </ChatsContainer>
  )
}