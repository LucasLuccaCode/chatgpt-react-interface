import React from "react"
import { useNavigate } from "react-router-dom"

import { useChats } from "../../contexts/chatsContext"
import { useApi } from "../../contexts/apiContext"
import { useChatActions } from "../../contexts/chatActionsContext"
import { useAuth } from "../../contexts/authContext"

import { Actions, Button } from "./styles"

export type QuestionEntryType = HTMLTextAreaElement | null

interface Props {
  setFilter: React.Dispatch<React.SetStateAction<string>>
}

export const SidebarActions: React.FC<Props> = ({ setFilter }) => {
  const { setCurrentChat } = useChats()
  const { setApiMessage, setPrompt } = useApi()
  const { selectingChats, setSelectingChats } = useChatActions()
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleNewChat = () => {
    setApiMessage(null)
    setPrompt('')
    setFilter('')
    setCurrentChat(null)
    navigate(`/${user?.id}/chatbot`)
  }

  const handleRemoveChat = () => {
    setSelectingChats(prevState => !prevState)
  }

  return (
    <Actions>
      <Button onClick={handleNewChat}>
        <i className="bi bi-plus" />
        <span>Novo</span>
      </Button>
      <Button className={selectingChats ? 'active' : ''} onClick={handleRemoveChat}>
        {selectingChats ? <i className="bi bi-x" /> : <i className="bi bi-dash" />}
        <span>{selectingChats ? 'Cancelar' : 'Remover'}</span>
      </Button>
    </Actions>
  )
}