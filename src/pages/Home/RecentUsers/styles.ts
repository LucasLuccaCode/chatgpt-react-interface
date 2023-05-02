import styled from "styled-components";

export const RecentUsersStyled = styled.section``;

export const Content = styled.div`
  position: sticky;
  top: .8rem;
  display: grid;
  grid-template-rows: max-content 1fr;
  height: calc(100vh - 1.5rem);
  padding-top: .8rem;
  margin-top: .8rem;
  /* border-radius: .5rem .5rem 0 0; */
  border-radius: .5rem;
  background-color: ${props => props.theme.colors.bg.secondary};
`

export const Title = styled.h2`
  font-size: .8rem;
  padding: 0 .8rem;
  color: ${props => props.theme.colors.text.title};
  margin-bottom: .5rem;
`

export const UserList = styled.ul`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  /* gap: .5rem; */
  padding-left: .8rem;
  padding-right: .8rem;
  padding-bottom: .6rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: .2rem;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 50px;
    background: ${props => props.theme.colors.opaque};
  }
`

export const UserCard = styled.li`
  padding: .8rem .5rem;
  border-top: 1px solid rgba(255, 255, 255, .05);
  /* border-radius: .5rem; */
  /* background: ${props => props.theme.colors.bg.secondary}; */
  transition: all .3s ease;
  
  &:hover {
    /* background: ${props => props.theme.colors.opaque}; */
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
`


