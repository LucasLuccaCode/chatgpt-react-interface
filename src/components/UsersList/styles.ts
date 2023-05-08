import styled from "styled-components";

export const UsersListStyled = styled.ul`
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

export const UserCard = styled.li`
  display: flex;
  align-items: center;
  gap: .5rem;
  padding: 1rem .5rem;
  
  &:not(:last-child){
    border-bottom: 1px solid ${props => props.theme.colors.border};
  }

  a:first-child {
    text-align: left;
  }

  a:last-child {
    width: max-content;
    margin: 0 auto;
    margin-right: 0;
  }
`