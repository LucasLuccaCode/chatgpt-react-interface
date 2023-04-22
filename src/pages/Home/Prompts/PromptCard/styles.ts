import styled from "styled-components";
import { Link } from "react-router-dom";

export const PromptCardStyled = styled.li`
  display: flex;
  gap: .6rem;
  padding: .5rem .8rem;
  border-bottom: 2px solid ${props => props.theme.colors.border};
`

export const Avatar = styled.div`
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.bg.button};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5rem;
  flex: 1;
`

export const Title = styled.div`
  display: flex;
  /* align-items: center; */
  align-items: baseline;
  gap: .5rem;
  width: 100%;
  /* background: red; */
`

export const Name = styled(Link)`
  font-size: .9rem;
  color: ${props => props.theme.colors.text.title};
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`

export const PastTime = styled.span`
  font-size: .7rem;
  color: ${props => props.theme.colors.text.placeholder};
`

export const Privacy = styled.i`
  font-size: .7rem;
  color: ${props => props.theme.colors.text.placeholder};
`

export const Description = styled.section`
  font-size: .8rem;
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
    border-radius: 50px;
    padding: .2rem .6rem;
    background: transparent;
    transition: all .3s ease;

    &:hover {
      background: ${props => props.theme.colors.opaque};
    }

    i {
      font-size: .7rem;
      color: ${props => props.theme.colors.text.placeholder};
    }

    &.like {
      &:hover {
        background: rgba(249, 24, 128, .2);
        
        i {
          color: rgba(249, 24, 128);
        }
      }

    }

    &.favorite {
      &:hover {
        background: rgba(255, 255, 0, .2);
        
        i {
          color: rgba(255, 255, 0);
        }
      }

    }

    &.share {
      &:hover {
        background: rgba(0, 186, 124, .2);
        
        i {
          color: rgba(0, 186, 124);
        }
      }

    }
  }
`