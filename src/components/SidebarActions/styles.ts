import styled from "styled-components";

export const Actions = styled.div`
display: flex;
justify-content: space-between;
flex-wrap: wrap;
align-items: center;
gap: ${props => props.theme.spacing.small};
padding: ${props => props.theme.spacing.small};
margin-top: ${props => props.theme.spacing.top};
border-radius: ${props => props.theme.borderRadius.medium};
background: ${props => props.theme.colors.bg.primary};
overflow: hidden;
`

export const Button = styled.button`
display: flex;
align-items: center;
justify-content: center;
flex: 1;
gap: .3rem;
padding: .35rem .3rem;
border-radius: ${props => props.theme.borderRadius.medium};
/* border: 2px solid ${props => props.theme.colors.bg.details}; */
background: ${props => props.theme.colors.bg.secondary};
transition: background .2s ease;

  &:hover,
  &.active {
    background: transparent;

    i,span {
      color: ${props => props.theme.colors.bg.details}
    }
  }

  i, span {
    pointer-events: none;
    color: ${props => props.theme.colors.text.title};
  }
  
  i {
    display: flex;
    font-size: .9rem;
  }

  span {
    pointer-events: none;
    font-size: .58rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
  }
`