import React, { ReactNode } from "react"
import styled from "styled-components"
import { ButtonStyled } from "../Button";

export const FollowerButtonStyled = styled(ButtonStyled)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .3rem;
`

interface FollowerButtonProps {
  children: ReactNode;
  size: 'normal' | 'full';
  handleOnClick?(): void;
}

export const FollowerButton: React.FC<FollowerButtonProps> = ({ children, size, handleOnClick = () => { } }) => {
  return (
    <FollowerButtonStyled className={size} onClick={handleOnClick}>
      {children}
    </FollowerButtonStyled>
  )
}