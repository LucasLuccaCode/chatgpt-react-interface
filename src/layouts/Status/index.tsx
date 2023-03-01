import React from "react"
import { useApi } from "../../contexts/apiContext"

import { StatusContainer, Message } from "./styles"

export const Status: React.FC = () => {
  const { apiMessage } = useApi()

  return (
    <StatusContainer>
      <Message className="nowrap">
        {apiMessage && <p className={apiMessage.type}>{apiMessage.message}</p>}
      </Message>
    </StatusContainer>
  )
}