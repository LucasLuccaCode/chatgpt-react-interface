import React from "react"

import { FooterContainer } from "./styles"

import { AskForm } from "../../components/AskForm"

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <AskForm />
    </FooterContainer>
  )
}