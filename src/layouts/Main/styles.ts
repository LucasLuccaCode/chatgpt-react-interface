import styled from "styled-components";

export const MainContainer = styled.main`
grid-area: main;
width: 100%;
height: 100%;
border: 2px solid rgba(255, 255, 255, .05);
padding-top: .5rem;
padding-left: .4rem;
border-radius: ${props => props.theme.b_radius};
overflow: hidden;

  &.has-chat {
    border: 0;
    border-top: 2px solid rgba(255, 255, 255, .05);
  }
`

export const Placeholder = styled.li`
display: grid;
place-content: center;
width: 100%;
height: 100%;
font-size: .8rem;
color: #6a6a70;
`