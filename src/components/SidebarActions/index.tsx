import { useChats } from "../../contexts/chatsContext"
import { useApi } from "../../contexts/apiContext"
import { useChatActions } from "../../contexts/chatActionsContext"

import { Actions, Button } from "./styles"
import React from "react"

export type QuestionEntryType = HTMLTextAreaElement | null

interface Props {
  setFilter: React.Dispatch<React.SetStateAction<string>>
}

export const SidebarActions: React.FC<Props> = ({ setFilter }) => {
  const { setCurrentChatId } = useChats()
  const { setApiMessage, setPrompt } = useApi()
  const { selectingChats, setSelectingChats } = useChatActions()

  const handleNewChat = () => {
    setApiMessage(null)
    setPrompt('')
    setFilter('')
    setCurrentChatId(0)

    const questionEntry: QuestionEntryType = document.querySelector('[data-question-entry]')
    questionEntry && questionEntry.focus()
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