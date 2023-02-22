import styled from "styled-components";

export const ChatContainer = styled.li`
  &:not(:last-child){
    border-bottom: 1.5px solid rgba(0, 0, 0, .3);
  }
  
  &:hover,
  &.active {
    background: rgba(255, 255, 255, .06);
    border-radius: .3rem;

    h3, i {
      color: ${props => props.theme.colors.text};
    }
  }

  &:hover {
    background: rgba(255, 255, 255, .05);
  }
`

export const Label = styled.label`
cursor: pointer;
display: flex;
align-items: center;
width: 100%;
gap: .5rem;
padding: .7rem .4rem;

  i {
    pointer-events: none;
    font-size: .8rem;
    color: #9a9aa0;
  }
`

export const InputCheckbox = styled.input`
pointer-events: auto;
display: flex;
align-items: center;
justify-content: center;
position: relative;
appearance: none;
width: 1rem;
min-width: 1rem;
height: 1rem;
border-radius: .2rem;
background: rgba(255, 255, 255, .05);

  &:checked::before {
    content: "";
    position: absolute;
    border-left: .18rem solid ${props => props.theme.colors.details};
    border-bottom: .18rem solid ${props => props.theme.colors.details};
    display: inline-block;
    width: .3rem;
    height: .2rem;
    margin-top: -.15rem;
    transform: rotate(-45deg);
  }
`

export const Title = styled.h3`
pointer-events: none;
font-size: .75rem;
color: #9a9aa0;
font-weight: normal;
padding-right: .2rem;

  &::first-letter {
    text-transform: capitalize;
  }
`