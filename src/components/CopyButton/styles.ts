import styled from "styled-components";

export const StyledCopyButton = styled.button`
  padding: .3rem;
  border-radius: .3rem;
  background: transparent;

  &:active {
    transform: none;
  }

  &:hover {
    background: ${props => props.theme.colors.bg.buttonHover};
  }

  i {
    color: ${props => props.theme.colors.text.answer};
  }
`