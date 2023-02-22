import React from "react"
import { useApi } from "../../contexts/apiContext"

import { StatusContainer, ProgressMessage } from "./styles"

export const Status: React.FC = () => {
  const { apiMessage, prompt } = useApi()

  const renderProgressMessage = (): string | null => {
    if (apiMessage) {
      return apiMessage
    }
    if (prompt.length) {
      return `Sua pergunta contém ${prompt.length} caracteres...`
    }
    return null
  }

  return (
    <StatusContainer>
      <ProgressMessage className="nowrap">
        {renderProgressMessage()}
      </ProgressMessage>
    </StatusContainer>
  )
}