import { useApi } from "../../contexts/apiContext"
import { useChats } from "../../contexts/chatsContext"

import { Actions, Button } from "./styles"

export const SidebarActions: React.FC = () => {
  const { setCurrentChatId } = useChats()
  const { setApiMessage } = useApi()

  const handleNewChat = () => {
    setCurrentChatId(0)
    setApiMessage('')
    
    const entryQuestion: HTMLTextAreaElement | null =  document.querySelector('textarea')
    entryQuestion && entryQuestion.focus()
  }

  const handleRemoveChat = () => {

  }

  return (
    <Actions>
      <Button onClick={handleNewChat}>
        <i className="bi bi-plus" />
        <span>Novo</span>
      </Button>
      <Button onClick={handleRemoveChat}>
        <i className="bi bi-dash" />
        <span>Remover</span>
      </Button>
    </Actions>
  )
}