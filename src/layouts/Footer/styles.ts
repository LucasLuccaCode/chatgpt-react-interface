import styled from "styled-components";

export const FooterContainer = styled.footer`
grid-area: footer;
display: flex;
flex-direction: column;
background-image: linear-gradient(to right, #181818, #0f0f0f);
margin-bottom: ${props => props.theme.margins.space};
padding: .6rem;
border: 1px solid rgba(255, 255, 255, .05);
border-radius: ${props => props.theme.b_radius};
  /* overflow: hidden; */
`