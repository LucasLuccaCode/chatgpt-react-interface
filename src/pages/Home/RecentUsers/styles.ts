import styled from "styled-components";

export const RecentUsersStyled = styled.section`
  display: grid;
  grid-template-rows: max-content 1fr;
  height: 100vh;
  padding-top: .6rem;
  border-left: 2px solid ${props => props.theme.colors.border};
`;

export const Title = styled.h2`
  font-size: .8rem;
  padding: 0 .8rem;
  color: ${props => props.theme.colors.text.title};
  margin-bottom: 1rem;
`

export const UserList = styled.ul`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-left: .8rem;
  padding-right: .8rem;
  padding-bottom: .6rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: .2rem;
    /* width: 0; */
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.text.placeholder};
    border-radius: 50px;
  }
`

export const UserCard = styled.li`
  height: max-content;
  padding: .5rem;
  border-radius: ${props => props.theme.borderRadius.large};
  border: 2px solid rgba(255, 255, 255, .05);
  background: ${props => props.theme.colors.bg.secondary};
  transition: transform .3s ease;
  /* overflow: hidden; */
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 2px 1px rgba(0, 0, 0, .05);
  } 
`

export const Details = styled.div`
  display: flex;
  gap: .5rem;
`

export const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: .2rem;
  overflow: hidden;
`

export const RegisteredAt = styled.p`
  font-size: .6rem;
  color: ${props => props.theme.colors.text.title};

  span {
    margin-left: .2rem;
    color: ${props => props.theme.colors.bg.details};
  }
`

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  /* padding: .5rem; */
  margin-top: .5rem;
  gap: .5rem;
  overflow: hidden;

  button {
    flex: 1;
    font-size: .6rem;
    /* font-weight: bold; */
    color: ${props => props.theme.colors.text.title};
    padding: .2rem;
    border: 2px solid ${props => props.theme.colors.bg.details};
    border-radius: ${props => props.theme.borderRadius.medium};
    background: ${props => props.theme.colors.bg.details};

    &:hover {
      background-color: transparent;
      color: ${props => props.theme.colors.bg.details};
    }
  }
`


