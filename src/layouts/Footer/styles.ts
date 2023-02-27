import styled from "styled-components";

export const FooterContainer = styled.footer`
grid-area: footer;
display: flex;
flex-direction: column;
margin-bottom: ${props => props.theme.spacing.medium};
border: 1px solid ${props => props.theme.colors.border};
border-radius: ${props => props.theme.borderRadius.large};
/* background-image: ${props => props.theme.colors.bg.gradient}; */
transition: all .2s;
/* overflow: hidden; */

  &:focus-within {
    border-color: ${props => props.theme.colors.borderFocus};
  }
`