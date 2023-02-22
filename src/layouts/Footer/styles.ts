import styled from "styled-components";

export const FooterContainer = styled.footer`
grid-area: footer;
display: flex;
flex-direction: column;
margin-bottom: ${props => props.theme.margins.space};
border: 1.5px solid rgba(255, 255, 255, .05);
border-radius: ${props => props.theme.b_radius};
background-image: linear-gradient(to right, rgba(255, 255, 255, .03) 50%, rgba(255, 255, 255, .02));
/* overflow: hidden; */
transition: all .2s;

  &:focus-within {
    border: 2px solid ${props => props.theme.colors.details};
  }
`