import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  gap:  ${props => props.theme.margins.space};
  padding-right: ${props => props.theme.margins.space};
  width: 100%;
  height: 100%;
  grid-template-columns: 3.5fr 9fr 3fr;
  grid-template-rows: 1fr 9fr 1.5fr;
  grid-template-areas:
    "sidebar header header"
    "sidebar main settings"
    "sidebar footer footer";
`