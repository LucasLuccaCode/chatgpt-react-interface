import { useChats } from "../../contexts/chatsContext"
import { useApi } from "../../contexts/apiContext"
import { useChatActions } from "../../contexts/chatActionsContext"

import { Actions, Button } from "./styles"

export const SidebarActions: React.FC = () => {
  const { setCurrentChatId } = useChats()
  const { setApiMessage } = useApi()
  const { selectingChats, setSelectingChats } = useChatActions()

  const handleNewChat = () => {
    setCurrentChatId(0)
    setApiMessage('')

    const entryQuestion: HTMLTextAreaElement | null = document.querySelector('textarea')
    entryQuestion && entryQuestion.focus()
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
      <Button onClick={handleRemoveChat}>
        {selectingChats ? <i className="bi bi-x" /> : <i className="bi bi-dash" />}
        <span>{selectingChats ? 'Cancelar' : 'Remover'}</span>
      </Button>
    </Actions>
  )
}