import React from "react"
import { useApi } from "../../contexts/apiContext"

import { FooterContainer } from "./styles"

import { AskForm } from "../../components/AskForm"

export const Footer: React.FC = () => {
  const { isFetching } = useApi()
  return (
    <FooterContainer isFetching={isFetching}>
      <AskForm />
    </FooterContainer>
  )
}