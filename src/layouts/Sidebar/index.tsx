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

      const totalRemoved = removeChats.length
      const isPlural = totalRemoved > 1 ? 's' : ''

      setApiMessage({
        message: `${totalRemoved} chat${isPlural} removido${isPlural} com sucesso.`,
        type: 'success'
      })
    }
    setSelectingChats(false)
  }

  return (
    <SidebarContainer>
      <Search filter={filter} setFilter={setFilter} />

      {selectingChats ? (
        <RemoveChatsButton onClick={handleChatsRemove}>
          <p>Remover selecionados:</p>
          <span>{removeChats.length}</span>
        </RemoveChatsButton>
      ) : (
        <Title>CHATS</Title>
      )}

      <Chats filter={filter} />
      <SidebarActions setFilter={setFilter} />
    </SidebarContainer>
  )
}