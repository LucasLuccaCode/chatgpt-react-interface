import styled, { css } from "styled-components";

interface ActionsContainerProps {
  hasChat: boolean;
}

export const ActionsContainer = styled.div<ActionsContainerProps>`${({ hasChat, theme }) => css`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.medium};

  ${!hasChat && `opacity: .5`}
`}`

export const Button = styled.button`
  padding: .35rem .3rem;
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 2px solid ${props => props.theme.colors.bg.details};
  background: ${props => props.theme.colors.bg.details};
  transition: background .2s ease;

  &:hover {
    background: transparent;

    i {
      color: ${props => props.theme.colors.bg.details};
    }
  }

  i {
    display: flex;
    font-size: .7rem;
    color: ${props => props.theme.colors.text.details};
  }
`