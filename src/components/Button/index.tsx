import React from "react"
import styled, { css } from "styled-components"

export const ButtonCss = css`
  color: ${props => props.theme.colors.text.details};
  text-align: center;
  font-size: .7rem;
  padding: .3rem .5rem;
  border: 2px solid ${props => props.theme.colors.bg.details};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: bold;
  background: ${props => props.theme.colors.bg.details};
  transition: background .2s ease;

  &:hover {
    background: transparent;
    color: ${props => props.theme.colors.bg.details};
  }
  
  &:focus {
    outline-color: ${props => props.theme.colors.bg.details};
  }

  &.normal {
    width: max-content;
  }

  &.full {
    flex: 1;
  }
`

export const ButtonStyled = styled.button`
  ${() => ButtonCss}
`

interface IButtonProps {
  text: string;
  size: 'normal' | 'full';
  handleClick?(): void;
}

export const Button: React.FC<IButtonProps> = ({ text, size, handleClick = () => { } }) => {
  return (
    <ButtonStyled className={size} onClick={handleClick}>
      {text}
    </ButtonStyled>
  )
}