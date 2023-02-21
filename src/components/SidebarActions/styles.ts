import styled from "styled-components";

export const Actions = styled.div`
display: flex;
justify-content: space-between;
flex-wrap: wrap;
align-items: center;
gap: .5rem;
padding: .3rem;
margin-top: 1rem;
border-radius: ${props => props.theme.b_radius};
background: ${props => props.theme.colors.second_bg};
overflow: hidden;
`

export const Button = styled.button`
display: flex;
align-items: center;
justify-content: center;
flex: 1;
gap: .3rem;
padding: .35rem .3rem;
border-radius: .3rem;
background: #1a1a1a;

  &:hover,
  &.active {
    background: #2a2a2a;

    i,span {
      color: ${props => props.theme.colors.text}
    }
  }

  i, span {
    pointer-events: none;
    color: #9a9aa0;
  }
  
  i {
    display: flex;
    font-size: .9rem;
  }

  span {
    pointer-events: none;
    font-size: .58rem;
    font-weight: bold;
  }
`