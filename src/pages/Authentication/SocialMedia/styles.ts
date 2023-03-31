import styled from "styled-components"

export const SocialMediaStyled = styled.ul`
  display: flex;
  gap: ${props => props.theme.spacing.medium};
`

export const SocialItem = styled.li`
  border-radius: 50%;

  a {
    display: flex;
  }
`

export const SocialIcon = styled.i`
  font-size: 1.2rem;
  margin-top: -.3rem;
  opacity: .8;
  color: ${props => props.theme.colors.text.title};
  transition: opacity .3s ease, transform .2s ease;

  &:hover {
    /* transform: scale(1.1); */
    opacity: 1;
  }
`