import React, { useState } from "react"

import { FooterContainer } from "./styles"

import { AskForm } from "../../components/AskForm"
import { Status } from "../../components/FooterStatus"
import { ApiProvider } from "../../contexts/apiContext"

export const Footer: React.FC = () => {
  const [question, setQuestion] = useState<string>("")

  return (
    <FooterContainer>
      <ApiProvider>
        <Status question={question} />
        <AskForm question={question} setQuestion={setQuestion} />
      </ApiProvider>
    </FooterContainer>
  )
}