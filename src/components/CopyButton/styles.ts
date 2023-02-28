import styled from "styled-components";

export const StyledCopyButton = styled.button`
  padding: .3rem;
  border-radius: .3rem;
  background: transparent;
  transition: background .2s ease;

  &:active {
    transform: none;
  }

  &:hover {
    background: ${props => props.theme.colors.bg.details};

    i {
      color: ${props => props.theme.colors.text.details};
    }
  }

  i {
    color: ${props => props.theme.colors.text.answer};
  }
`