import React from "react"
import { useChats } from "../../contexts/chatsContext"

import { ActionsContainer, Button } from "./styles"

interface Props {
  editingTitle: boolean,
  setEditingTitle: React.Dispatch<React.SetStateAction<boolean>>,
  renameTitle(): void
}

export const ChatTitleActions: React.FC<Props> = ({
  editingTitle,
  setEditingTitle,
  renameTitle
}) => {
  const { currentChat, currentChatId, removeChats } = useChats()

  const handleClickEdit = () => {
    if (editingTitle) {
      renameTitle()
    }
    setEditingTitle(!editingTitle)
  }

  const handleDeleteClick = () => {
    removeChats([currentChatId])
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