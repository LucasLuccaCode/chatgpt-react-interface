import React from "react"

import { StatusContainer, Progress } from "./styles"

export const Status: React.FC = () => {
  return (
    <StatusContainer>
      <Progress>
        Aguardando resposta da api...
      </Progress>
    </StatusContainer>
  )
}