import styled from "styled-components";

export const SidebarContainer = styled.section`
grid-area: sidebar;
display: flex;
flex-direction: column;
padding: .6rem;
background: #1a1a1a;
background-image: linear-gradient(to right, #1a1a1a, #151515);
overflow: hidden;
`

export const Title = styled.h2`
font-size: .6rem;
color: #5a5a60;
margin-top: 1rem;
`

export const RemoveChatsButton = styled.button`
display: flex;
align-items: center;
justify-content: center;
gap: .3rem;
padding: .4rem .5rem;
margin-top: 1rem;
font-size: .6rem;
font-weight: bold;
color: ${props => props.theme.colors.details};
border-radius: .2rem;
border: 2px solid ${props => props.theme.colors.details};
/* background: rgba(255, 255, 255, .1); */
white-space: nowrap;
background: transparent;

  &:hover {
    color: ${props => props.theme.colors.secondary};
    background: ${props => props.theme.colors.details};
  }

  &:active {
    transform: scale(.95)
  }

  span {
    /* color: ${props => props.theme.colors.text}; */
  }
`