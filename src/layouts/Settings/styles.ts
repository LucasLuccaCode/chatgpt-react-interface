import styled from "styled-components";

export const SettingsContainer = styled.section`
grid-area: settings;
display: flex;
flex-direction: column;
justify-content: space-between;
height: 100%;
gap: 1rem;
border-radius: ${props => props.theme.b_radius};
padding: .5rem;
border: 2px solid rgba(255, 255, 255, .05);
overflow-x: hidden;
overflow-y: auto;

  &::-webkit-scrollbar {
    width: .1rem;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.secondary};
    border-radius: 20px;
  }
`

export const Division = styled.div`
display: flex;
flex-direction: column;
gap: 1rem;
`

export const Wrapper = styled.div`
display: flex;
flex-direction: column;
gap: .5rem;
width: 100%;
`
export const Control = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
gap: .5rem;

  input {
    flex: 1;
  }

  span {
    font-size: .6rem;
    color: #8a8a90;
    margin-left: .5rem;
  }
`

export const Label = styled.label`
color: #aaaab0;
margin-right: 1rem;
font-size: .8rem;
white-space: nowrap;
text-overflow: ellipsis;
overflow: hidden;
`

export const InputCheckbox = styled.input`
display: flex;
align-items: center;
justify-content: center;
position: relative;
appearance: none;
width: 1rem;
height: 1rem;
border-radius: .2rem;
background: rgba(0, 0, 0, 1);

  &:checked::before {
    content: "";
    position: absolute;
    border-left: .18rem solid ${props => props.theme.colors.details};
    border-bottom: .18rem solid ${props => props.theme.colors.details};
    display: inline-block;
    width: .4rem;
    height: .3rem;
    margin-top: -.2rem;
    transform: rotate(-45deg);
  }
`

export const InputRange = styled.input`
-webkit-appearance: none;
-moz-appearance: none;
appearance: none;
width: 100%;
height: .4rem;
background-color: rgba(255, 255, 255, .1);
border-radius: 5px;

  &::-webkit-slider-thumb {
    appearance: none;
    width: .7rem;
    height: .7rem;
    background-color: ${props => props.theme.colors.details};
    border-radius: 50%;
  }

  &::-moz-range-thumb {
    appearance: none;
    width: .7rem;
    height: .7rem;
    background-color: ${props => props.theme.colors.details};
    border-radius: 50%;
  }
`

export const InputToggle = styled.input`
--width: 1.6rem;
--height: .8rem;
-webkit-appearance: none;
-moz-appearance: none;
appearance: none;
position: relative;
display: inline-block;
width: var(--width);
min-width: var(--width);
max-width: var(--width);
height: .8rem;
background: rgba(255, 255, 255, .1);
border-radius: 50px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: var(--height);
    height: var(--height);
    background-color: ${props => props.theme.colors.text};
    border-radius: 50%;
    transition: all 0.3s;
  }

  &:checked::before {
    transform: translateX(100%);
    background: ${props => props.theme.colors.details};
  }
`

export const Buttons = styled.div`
display: flex;
gap: .5rem;
align-items: center;
`

export const Button = styled.button`
flex: 1;
font-size: .6rem;
font-weight: bold;
color: #efefff;
padding: .5rem;
margin-top: 1rem;
text-transform: capitalize;
border-radius: .25rem;
background: rgba(255, 255, 255, .1);

  &:hover {
    background: rgba(255, 255, 255, .2);
  }

  &:active {
    transform: scale(.95)
  }
`