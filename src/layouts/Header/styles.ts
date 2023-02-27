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
  border: 1.5px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.large};
  ${!hasTitle && `
  pointer-events: 
  none; cursor: not-allowed;`
  }
  /* overflow: hidden; */

  &:focus-within {
    border-color: ${theme.colors.borderFocus};
  }
  `
}`

interface ChatTitleProps { 
  hasTitle: boolean; 
  editingTitle: boolean;
}

export const ChatTitle = styled.h1<ChatTitleProps>`${({ hasTitle, editingTitle, theme }) => css`
  flex: 1;
  font-size: .85rem;
  font-family: 'Poppins', sans-serif;
  color: ${hasTitle ? theme.colors.text.title : theme.colors.text.placeholder};

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
