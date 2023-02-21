import React from "react"

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

  const handleClickEdit = () => {
    if (editingTitle) {
      updateTitle()
    }
    setEditingTitle(!editingTitle)
  }

  const editButtonClass = editingTitle ? 'check' : 'pencil-fill'

  return (
    <ActionsContainer>
      <Button onClick={handleClickEdit} data-action='edit'>
        <i className={`bi bi-${editButtonClass}`} />
      </Button>
      <Button>
        <i className="bi bi-trash-fill" />
      </Button>
    </ActionsContainer>
  )
}