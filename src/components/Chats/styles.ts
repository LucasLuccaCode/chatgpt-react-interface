import styled from "styled-components";

export const ChatsContainer = styled.ul`
flex: 1;
margin-top: ${props => props.theme.spacing.large};
overflow-y: auto;

  &::-webkit-scrollbar {
    width: .2rem;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.bg.details};
    border-radius: 20px;
  }
`

export const Placeholder = styled.p`
font-size: .7rem;
text-align: center;
color: ${props => props.theme.colors.text.placeholder};
margin-top: ${props => props.theme.spacing.medium};
`