import React, { useState } from "react"
import { useChats } from "../../contexts/chatsContext"
import { useChatActions } from "../../contexts/chatActionsContext"
import { useApi } from "../../contexts/apiContext"

import { RemoveChatsButton, SidebarContainer, Title } from "./styles"

import { Search } from "../../components/Search"
import { Chats } from "../../components/Chats"
import { SidebarActions } from "../../components/SidebarActions"

export const Sidebar: React.FC = () => {
  const [filter, setFilter] = useState('')

  const { setChats } = useChats()
  const { selectingChats, setSelectingChats, removeChats } = useChatActions()
  const { setApiMessage } = useApi()

  const handleChatsRemove = () => {
    if (removeChats.length) {
      setChats(prevChats => prevChats.filter(chat => !removeChats.includes(chat.id)))

      setApiMessage({
        message: `${removeChats.length} Chats removidos com sucesso.`,
        isError: false
      })
    }
    setSelectingChats(false)
  }

  return (
    <SidebarContainer>
      <Search filter={filter} setFilter={setFilter} />
      <SidebarActions setFilter={setFilter} />

      {selectingChats ? (
        <RemoveChatsButton onClick={handleChatsRemove}>
          <p>Remover selecionados:</p>
          <span>{removeChats.length}</span>
        </RemoveChatsButton>
      ) : (
        <Title>CHATS</Title>
      )}

      <Chats filter={filter} />
    </SidebarContainer>
  )
}