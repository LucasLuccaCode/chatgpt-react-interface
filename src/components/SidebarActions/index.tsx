import { useChats } from "../../contexts/chatsContext"
import { useApi } from "../../contexts/apiContext"
import { useChatActions } from "../../contexts/chatActionsContext"

import { Actions, Button } from "./styles"

export type QuestionEntryType = HTMLTextAreaElement | null

export const SidebarActions: React.FC = () => {
  const { setCurrentChatId } = useChats()
  const { setApiMessage, setPrompt } = useApi()
  const { selectingChats, setSelectingChats } = useChatActions()

  const handleNewChat = () => {
    setApiMessage('')
    setPrompt('')
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