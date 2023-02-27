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
  background: ${props => props.theme.colors.bg.button};

  &:hover {
    background: ${props => props.theme.colors.bg.buttonHover};

    i {
      color: ${props => props.theme.colors.text.title};
    }
  }

  i {
    display: flex;
    font-size: .7rem;
    color: ${props => props.theme.colors.text.button};
  }
`