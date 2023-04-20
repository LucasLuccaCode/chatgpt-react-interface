import styled from "styled-components";

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

export const Name = styled.h3`
  font-size: .9rem;
  color: ${props => props.theme.colors.text.title};
`


export const More = styled.div`
  cursor: pointer;
  padding: 0 .2rem;
  border-radius: 50px;
  height: max-content;
  border: 1px solid transparent;
  transition: all .3s ease;

  &:hover {
    background: ${props => props.theme.colors.opaque};
  }

  &:active {
    border-color: ${props => props.theme.colors.opaque};
  }
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