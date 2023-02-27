import styled from "styled-components";

export const SidebarContainer = styled.section`
grid-area: sidebar;
display: flex;
flex-direction: column;
padding: .6rem;
background: ${props => props.theme.colors.bg.secondary};
overflow: hidden;
`

export const Title = styled.h2`
font-size: .6rem;
color: ${props => props.theme.colors.text.placeholder};
margin-top: ${props => props.theme.spacing.top};
`

export const RemoveChatsButton = styled.button`
display: flex;
align-items: center;
justify-content: center;
gap: .3rem;
padding: .4rem .5rem;
margin-top: ${props => props.theme.spacing.top};
font-size: .6rem;
font-family: 'Poppins', sans-serif;
font-weight: 600;
color: ${props => props.theme.colors.text.details};
border-radius: ${props => props.theme.borderRadius.medium};
border: 2px solid ${props => props.theme.colors.bg.details};
background: ${props => props.theme.colors.bg.details};

  &:hover {
    color: ${props => props.theme.colors.bg.details};
    background: transparent;
  }

  &:active {
    transform: scale(.95)
  }
`