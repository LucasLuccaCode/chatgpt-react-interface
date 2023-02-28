import styled from "styled-components";

export const FooterContainer = styled.footer`
grid-area: footer;
display: flex;
flex-direction: column;
margin-bottom: ${props => props.theme.spacing.medium};
border-radius: ${props => props.theme.borderRadius.large};
background: ${props => props.theme.colors.bg.container};
box-shadow: ${props => props.theme.boxShadow.container};
/* transition: border .2s; */
/* overflow: hidden; */

  &:focus-within {
    box-shadow: 0 0 0 1px ${props => props.theme.colors.bg.details};
  }
`