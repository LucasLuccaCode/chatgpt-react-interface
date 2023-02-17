import styled from "styled-components";

export const Container = styled.main`
  grid-area: main;
  background: #151515;
  border: 1px solid rgba(255, 255, 255, .05);
  border-radius: ${props => props.theme.b_radius};
`