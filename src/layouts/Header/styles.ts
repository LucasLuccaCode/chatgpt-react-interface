import styled from "styled-components";

export const HeaderContainer = styled.header`
grid-area: header;
display: flex;
flex-direction: column;
gap: .5rem;
margin-top: ${props => props.theme.margins.space};
padding: 0 1rem;
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
padding: .3rem 0;
font-weight: normal;
transition: all .3s;
border-radius: ${props => props.theme.b_radius};

  &::first-letter {
    text-transform: capitalize;
  }

  &:focus {
    outline: 1.8px solid rgba(255, 255, 255, .1);
    text-overflow: initial;
  }

  &.editing {
    padding-left: .3rem;

    &::first-letter {
      text-transform: none;
    }
  }
`