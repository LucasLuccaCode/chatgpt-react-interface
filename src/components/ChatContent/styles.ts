import styled from "styled-components";

export const StyledChatCard = styled.li`
  width: auto;
`

export const ChatContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.top};
  width: 100%;
  height: 100%;
  padding-top: ${props => props.theme.spacing.medium};
  /* padding: ${props => props.theme.spacing.medium}; */
  padding-right: ${props => props.theme.spacing.small};
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: .2rem;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.bg.details};
    border-radius: 25px;
  }
`