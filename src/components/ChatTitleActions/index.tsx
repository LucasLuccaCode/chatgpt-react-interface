import React from "react"
import { useChats } from "../../contexts/chatsContext"
import { useApi } from "../../contexts/apiContext"

import { ActionsContainer, Button } from "./styles"

interface Props {
  editingTitle: boolean,
  setEditingTitle: React.Dispatch<React.SetStateAction<boolean>>,
  updateTitle(): void
}

export const ChatTitleActions: React.FC<Props> = ({
  editingTitle,
  setEditingTitle,
  updateTitle
}) => {
  const { currentChat,currentChatId, setChats } = useChats()
  const { setApiMessage } = useApi()

  const handleClickEdit = () => {
    if (editingTitle) {
      updateTitle()
    }
    setEditingTitle(!editingTitle)
  }

  const handleDeleteClick = () => {
    setChats(prevChats => prevChats.filter(chat => chat.id !== currentChatId))
    setApiMessage({ message: 'Chat excluído com sucesso.', type: 'success' });
  }

  const editButtonClass = editingTitle ? 'check' : 'pencil-fill'

  return (
    <ActionsContainer hasChat={!!currentChat}>
      <Button onClick={handleClickEdit} data-action='edit'>
        <i className={`bi bi-${editButtonClass}`} />
      </Button>
      <Button onClick={handleDeleteClick}>
        <i className="bi bi-trash-fill" />
      </Button>
    </ActionsContainer>
  )
}