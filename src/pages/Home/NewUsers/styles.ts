import styled from "styled-components";

export const NewUsersStyled = styled.section`
  /* background: red; */
`;

export const Content = styled.div`
  position: sticky;
  top: 0;
  padding: .6rem 20px;
  height: 100vh;
  border-radius: 5px;
  background-color: ${props => props.theme.colors.bg.secondary};
`