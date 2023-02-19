import React from "react"

import { AskFormContainer, EntryQuestion, ButtonSearch } from './styles'

export const AskForm: React.FC = () => {
  return (
    <AskFormContainer>
      <EntryQuestion rows={3} autoFocus />
        <ButtonSearch type="submit">
          <i className="bi bi-send-fill"></i>
        </ButtonSearch>
    </AskFormContainer>
  )
}