import React, { useState } from "react"
import { useChats } from "../../../contexts/chatsContext"
import { useChatActions } from "../../../contexts/chatActionsContext"
import { useApi } from "../../../contexts/apiContext"

import { RemoveChatsButton, SidebarContainer, Title } from "./styles"

import { Search } from "../../../components/Search"
import { Chats } from "../../../components/Chats"
import { SidebarActions } from "../../../components/SidebarActions"

export const Sidebar: React.FC = () => {
  const [filter, setFilter] = useState('')

  const { removeChats } = useChats()
  const { selectingChats, setSelectingChats, chatIdsRemove } = useChatActions()

  const handleChatsRemove = () => {
    chatIdsRemove.length && removeChats(chatIdsRemove)
    setSelectingChats(false)
  }

  return (
    <SidebarContainer>
      <Search filter={filter} setFilter={setFilter} />

      <SidebarActions setFilter={setFilter} />

      {selectingChats ? (
        <RemoveChatsButton onClick={handleChatsRemove}>
          <p>Remover selecionados:</p>
          <span>{chatIdsRemove.length}</span>
        </RemoveChatsButton>
      ) : (
        <Title>CHATS</Title>
      )}

      <Chats filter={filter} />
    </SidebarContainer>
  )
}