import styled, { css } from "styled-components";

interface MainContainerProps {
  hasChats: boolean;
}

export const MainContainer = styled.main<MainContainerProps>`${ ({ theme, hasChats }) => css`
  grid-area: main;
  width: 100%;
  height: 100%;
  border-radius: ${theme.borderRadius.large};
  ${!hasChats && `border: 1px solid ${theme.colors.border}`};
  overflow: hidden;
  `
}`

export const Placeholder = styled.li`
display: grid;
place-content: center;
width: 100%;
height: 100%;
font-size: .8rem;
color: ${props => props.theme.colors.text.placeholder};
`