import styled from "styled-components";

export const ChatContainer = styled.li`
cursor: pointer;
display: flex;
align-items: center;
width: 100%;
gap: .5rem;
padding: .8rem .4rem;
border-bottom: 2px solid rgba(0, 0, 0, .3);

  &:hover {
    background: rgba(255, 255, 255, .05);
    border-radius: ${props => props.theme.b_radius};

    h3 {
      color: ${props => props.theme.colors.text};
    }

    i {
      color: #6a6a70;
    }
  }

  i {
    pointer-events: none;
    font-size: .8rem;
    color: #4a4a50;
  }

  h3 {
    pointer-events: none;
    font-size: .8rem;
    color: #8a8a90;
    font-weight: normal;
    padding-right: .3rem;
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
background: rgba(0, 0, 0, 1);

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