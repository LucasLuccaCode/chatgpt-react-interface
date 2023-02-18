import styled from "styled-components";

export const ChatsContainer = styled.ul`
flex: 1;
margin-top: .5rem;
overflow-y: auto;

  &::-webkit-scrollbar {
    width: .2rem;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.secondary};
    border-radius: 20px;
  }
`

export const Placeholder = styled.p`
font-size: .7rem;
text-align: center;
color: #4a4a50;
margin-top: .5rem;
`