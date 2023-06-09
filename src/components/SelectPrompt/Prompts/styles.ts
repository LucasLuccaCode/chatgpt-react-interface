import styled from "styled-components";

export const PromptsStyled = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0 .5rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: .3rem;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.border};
    border-radius: 50px;
  }
`;

export const PromptCard = styled.li`
  cursor: pointer;
  font-size: .8rem;
  color: ${props => props.theme.colors.text.title};
  padding: 1rem .5rem;
  
  &:not(:last-child){
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }

  &:hover {
    background-color: rgba(255, 255, 255, .05);
  }
`