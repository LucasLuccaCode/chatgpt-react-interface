import styled from "styled-components";

export const PromptCardStyled = styled.li`
  display: flex;
  gap: ${props => props.theme.spacing.medium};
  padding: .5rem;
  border-radius: .8rem;
  background-color: ${props => props.theme.colors.bg.secondary};
`

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: .5rem;
  overflow: hidden;
`

export const Title = styled.div`
  display: flex;
  align-items: baseline;
  width: 100%;
`

export const Dot = styled.span`
  font-size: .8rem;
  margin: 0 .1rem;
  color: ${props => props.theme.colors.borderFocus};
`

export const PastTime = styled.span`
  font-size: .7rem;
  margin-left: .4rem;
  color: ${props => props.theme.colors.text.placeholder};
  `

export const PrivacyIcon = styled.i`
  font-size: .6rem;
  color: ${props => props.theme.colors.text.placeholder};
`

export const Description = styled.section`
  font-size: .7rem;
  color: ${props => props.theme.colors.text.title};

  &::first-letter {
    text-transform: uppercase;
  }
`

export const Reactions = styled.section`
  display: flex;
  justify-content: space-between;

  button {
    display: flex;
    align-items: baseline;
    gap: .4rem;
    border-radius: 50px;
    padding: .2rem .6rem;
    background: transparent;
    transition: all .3s ease;

    &:hover {
      background: ${props => props.theme.colors.opaque};
    }

    i, span {
      font-size: .7rem;
      color: ${props => props.theme.colors.text.placeholder};
    }

    i.bi-heart-fill,
    i.bi-heart-fill ~ span {
      color: rgba(249, 24, 128, .5);
    }

    i.bi-star-fill,
    i.bi-star-fill ~ span  {
      color: rgba(255, 255, 0, .5);
    }

    &.like {
      &:hover {
        background: rgba(249, 24, 128, .2);
        
        i, span {
          color: rgba(249, 24, 128);
        }
      }

    }

    &.favorite {
      &:hover {
        background: rgba(255, 255, 0, .2);
        
        i, span {
          color: rgba(255, 255, 0);
        }
      }

    }

    &.share {
      &:hover {
        background: rgba(0, 186, 124, .2);
        
        i, span {
          color: rgba(0, 186, 124);
        }
      }

    }
  }
`