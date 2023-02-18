import styled from "styled-components";

export const ActionsContainer = styled.div`
display: flex;
align-items: center;
gap: .5rem;
`

export const Button = styled.button`
padding: .35rem .3rem;
border-radius: .3rem;
background: #1a1a1a;

  &:hover {
    background: #2a2a2a;

    i {
      color: ${props => props.theme.colors.text};
    }
  }

  i {
    display: flex;
    font-size: .8rem;
    color: #aaaab0;
  }
`