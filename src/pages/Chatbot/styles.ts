import styled from "styled-components";

export const ChatbotContainer = styled.section`
  display: grid;
  gap:  ${props => props.theme.spacing.medium};
  padding-right: ${props => props.theme.spacing.medium};
  width: 100%;
  height: 100%;
  grid-template-columns: 3.5fr 9fr 3fr;
  grid-template-rows: 1fr 10fr .8fr 1.8fr;
  grid-template-areas:
    "sidebar header header"
    "sidebar main settings"
    "sidebar status status"
    "sidebar footer footer";
`