import styled from "styled-components";

export const MainContainer = styled.main`
grid-area: main;
border: 1px solid rgba(255, 255, 255, .05);
border-radius: ${props => props.theme.b_radius};
background: #151515;
overflow: hidden;
`