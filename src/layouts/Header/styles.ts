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
  /* background: cyan; */
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: .2rem 0;
  transition: padding-left .3s ease;

  &:focus {
    outline: 1px solid ${props => props.theme.colors.bg.details};
    padding-left: .5rem;
    text-overflow: initial;
    cursor: text;
  }

  &::first-letter {
    text-transform: uppercase;
    ${editingTitle && 'text-transform: none'}
  }

  &.nowrap {
    white-space: nowrap;
  }
`}`
