import styled, { css } from "styled-components";

interface HeaderContainerProps { 
  hasTitle: boolean; 
}

export const HeaderContainer = styled.header<HeaderContainerProps>`${({ theme, hasTitle }) => css`
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.medium};
  margin-top: ${theme.spacing.medium};
  padding: ${theme.spacing.medium};
  border-radius: ${theme.borderRadius.medium};
  background: ${props => props.theme.colors.bg.container};
  box-shadow: ${props => props.theme.boxShadow.container};

  ${!hasTitle && `
  pointer-events: 
  none; 
  cursor: not-allowed;`
  }
  /* overflow: hidden; */

  &:focus-within {
    box-shadow: 0 0 0 1px ${props => props.theme.colors.bg.details};
  }
  `
}`

interface ChatTitleProps { 
  editingTitle: boolean;
}

export const ChatTitle = styled.h1<ChatTitleProps>`${({ editingTitle, theme }) => css`
  flex: 1;
  font-size: .85rem;
  font-family: 'Poppins', sans-serif;
  color: ${theme.colors.text.title};

  &::first-letter {
    text-transform: uppercase;
    ${editingTitle && 'text-transform: none'}
  }

  &:focus {
    text-overflow: initial;
    outline: none;
    ${editingTitle && 'cursor: text'}
  }

  &.nowrap {
    white-space: nowrap;
  }
`}`
