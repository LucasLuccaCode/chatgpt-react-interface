import React, { ReactNode } from "react"
import styled from "styled-components"

import { ButtonCss } from "../Button"
import { Link } from "react-router-dom"

const LinkButtonStyled = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .5rem;
  width: 100%;
  height: max-content;
  ${() => ButtonCss}
`

interface ILinkButtonProps {
  children: ReactNode;
  to: string;
}

export const LinkButton: React.FC<ILinkButtonProps> = ({ children, to }) => {
  return (
    <LinkButtonStyled to={to}>
      {children}
    </LinkButtonStyled>
  )
}