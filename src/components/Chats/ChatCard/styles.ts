import styled from "styled-components";

export const ChatContainer = styled.li`
  border-radius: ${props => props.theme.borderRadius.medium};

  &:active {
    transform: scale(.98);
  }
  
  &:not(:last-child){
    /* border-bottom: 1.5px solid ${props => props.theme.colors.opaque}; */
    margin-bottom: .5rem;
  }
  
  &:hover,
  &.active {
    background: ${props => props.theme.colors.bg.details};
    backdrop-filter: blur(100px);

    h3, i {
      color: ${props => props.theme.colors.text.details};
    }
  }

  &:hover {
    background: ${props => props.theme.colors.opaque};
  }
`

export const Label = styled.label`
cursor: pointer;
display: flex;
align-items: center;
width: 100%;
gap: ${props => props.theme.spacing.medium};
padding: .5rem .4rem;

  i {
    font-size: .8rem;
    color: ${props => props.theme.colors.text.chat};
  }
`

export const InputCheckbox = styled.input`
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
position: relative;
appearance: none;
width: 1rem;
min-width: 1rem;
height: 1rem;
border-radius: .2rem;
border: .1rem solid ${props => props.theme.colors.opaque};
background: ${props => props.theme.colors.opaque};
z-index: 2;


  &:hover {
    /* background: ${props => props.theme.colors.bg.secondary}; */
  }

  &::before {
    content: "";
    position: absolute;
    border-left: .18rem solid ${props => props.theme.colors.bg.details};
    border-bottom: .18rem solid ${props => props.theme.colors.bg.details};
    display: inline-block;
    width: .3rem;
    height: .2rem;
    margin-top: -.15rem;
    transform: rotate(-45deg);
    opacity: 0;
    transition: opacity .2s ease;
  }

  &:checked::before {
    opacity: 1;
  }
`

export const Title = styled.h3`
font-size: .72rem;
font-family: 'Poppins', sans-serif;
font-weight: 600;
color: ${props => props.theme.colors.text.chat};
padding-right: .2rem;

  &::first-letter {
    text-transform: capitalize;
  }
`