import React from "react"

import { FooterContainer } from "./styles"

import { AskForm } from "../../components/AskForm"
import { Status } from "../../components/FooterStatus"

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Status />
      <AskForm />
    </FooterContainer>
  )
}