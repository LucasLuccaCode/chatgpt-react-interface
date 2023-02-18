import React from "react"

import { ActionsContainer, Button } from "./styles"

export const ChatTitleActions: React.FC = () => {
  return (
    <ActionsContainer>
      <Button>
        <i className="bi bi-pencil-fill" />
        {/* <i className="bi bi-check" /> */}
      </Button>
      <Button>
        <i className="bi bi-trash-fill" />
      </Button>
    </ActionsContainer>
  )
}