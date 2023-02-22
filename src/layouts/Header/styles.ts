import styled from "styled-components";

export const HeaderContainer = styled.header`
grid-area: header;
display: flex;
flex-direction: column;
gap: .8rem;
padding-bottom: .3rem;
margin-top: ${props => props.theme.margins.space};
/* overflow: hidden; */
`

export const Title = styled.h1`
font-size: 1rem;
color: ${props => props.theme.colors.text};
`

export const ChatTitleContainer = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
gap: .5rem;
`

export const ChatTitle = styled.h2`
flex: 1;
font-size: .9rem;
color: ${props => props.theme.colors.text};
padding: .2rem 0;
padding-left: .4rem;
/* font-weight: normal; */
border-left: 2px solid  ${props => props.theme.colors.details};
transition: all .3s;
font-family: serif;

  &::first-letter {
    text-transform: uppercase;
  }

  &:focus {
    text-overflow: initial;
    outline: 1px solid rgba(255, 255, 255, .1);
  }

  &.editing {
    padding-left: .3rem;

    &::first-letter {
      text-transform: none;
    }
  }
`