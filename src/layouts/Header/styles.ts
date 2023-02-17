import styled from "styled-components";

export const Container = styled.header`
  grid-area: header;
  background: #050505;
  margin-top: ${props => props.theme.margins.space};
  border-radius: ${props => props.theme.b_radius};
  border: none;
  border: 1px solid rgba(255, 255, 255, .05);
`