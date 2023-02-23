import React from "react"
import { useApi } from "../../contexts/apiContext"

import { StatusContainer, Message } from "./styles"

export const Status: React.FC = () => {
  const { apiMessage, prompt } = useApi()

  const renderMessage = () => {
    if (apiMessage) {
      return <p className={apiMessage.isError ? 'error' : 'success'}>{apiMessage.message}</p>
    }
    if (prompt.length) {
      return <p>Sua pergunta contém {prompt.length} caracteres...</p>
    }
    return null
  }

  return (
    <StatusContainer>
      <Message className="nowrap">
        {renderMessage()}
      </Message>
    </StatusContainer>
  )
}