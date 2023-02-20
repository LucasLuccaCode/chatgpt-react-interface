import React from "react"
import { useApi } from "../../contexts/apiContext"

import { StatusContainer, ProgressMessage } from "./styles"

interface StatusProps {
  question: string
}

export const Status: React.FC<StatusProps> = ({ question }) => {
  const { apiMessage } = useApi()

  const renderProgressMessage = (): string | null => {
    if (apiMessage) {
      return apiMessage
    }
    if (question.length) {
      return `Sua pergunta contém ${question.length} caracteres...`
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