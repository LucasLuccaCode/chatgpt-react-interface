import React, { useMemo } from "react"
import { useChats } from "../../contexts/chatsContext"

import { ChatsContainer, Placeholder } from "./styles"

import { ChatCard } from "./ChatCard"

interface ChatsProps {
  filter: string
}

export const Chats: React.FC<ChatsProps> = ({ filter }) => {
  const { chats } = useChats()

  const filteredChats = useMemo(() => {
    return chats.filter(({ title }) => title.toLowerCase().includes(filter.toLowerCase()))
  }, [chats, filter])

  return (
    <ChatsContainer>
      {!!chats.length ? (
        filteredChats.map(chat => (
          <ChatCard
            key={chat.id}
            id={chat.id}
            title={chat.title}
          />
        ))
      ) : (
        <Placeholder>Nenhum chat</Placeholder>
      )}
    </ChatsContainer>
  )
}