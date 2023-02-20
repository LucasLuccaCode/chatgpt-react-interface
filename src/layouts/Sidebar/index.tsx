import React from "react"
import { useChats } from "../../contexts/chatsContext"
import { useChatActions } from "../../contexts/chatActionsContext"

import { RemoveChatsButton, SidebarContainer, Title } from "./styles"

import { Search } from "../../components/Search"
import { Chats } from "../../components/Chats"
import { SidebarActions } from "../../components/SidebarActions"

export const Sidebar: React.FC = () => {
  const { setChats } = useChats()
  const { selectingChats, setSelectingChats, removeChats } = useChatActions()

  const handleChatsRemove = () => {
    if (removeChats.length) {
      setChats(prevChats => prevChats.filter(chat => !removeChats.includes(chat.id)))
    }
    setSelectingChats(false)
  }

  return (
    <SidebarContainer>
      <Search />
      <Title>Chats</Title>
      <Chats />

      {selectingChats && (
        <RemoveChatsButton onClick={handleChatsRemove}>
          <p>Remover selecionados:</p>
          <span>{removeChats.length}</span>
        </RemoveChatsButton>
      )}
      <SidebarActions />
    </SidebarContainer>
  )
}