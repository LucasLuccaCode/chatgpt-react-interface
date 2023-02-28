import styled from "styled-components";

export const SettingsContainer = styled.section`
  grid-area: settings;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: ${props => props.theme.spacing.top};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.theme.spacing.medium};
  overflow-x: hidden;
  /* border: 1px solid ${props => props.theme.colors.opaque}; */
  background: ${props => props.theme.colors.bg.container};
  box-shadow: ${props => props.theme.boxShadow.container};
  overflow-y: auto;

  input {
    cursor: pointer;
  }


  &::-webkit-scrollbar {
    width: .1rem;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.bg.details};
    border-radius: 50px;
  }
`

export const Division = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.top};
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.large};
  width: 100%;
`
export const Control = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: ${props => props.theme.spacing.small};

  input[type='range'] {
    flex: 1;
  }

  span {
    font-size: .6rem;
    color: ${props => props.theme.colors.text.settings};
    margin-left: ${props => props.theme.spacing.small};
    opacity: .5;
  }
`

export const Label = styled.label`
  color: ${props => props.theme.colors.text.settings};
  margin-right: ${props => props.theme.spacing.top};
  font-size: .7rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const InputRange = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  height: .4rem;
  background-color: ${props => props.theme.colors.bg.inputRange};
  border-radius: 50px;

  &::-webkit-slider-thumb {
    appearance: none;
    width: .7rem;
    height: .7rem;
    background: ${props => props.theme.colors.bg.details};
    border-radius: 50%;
  }

  &::-moz-range-thumb {
    appearance: none;
    width: .7rem;
    height: .7rem;
    background: ${props => props.theme.colors.bg.details};
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
  background: ${props => props.theme.colors.opaque};
  border-radius: 50px;

  &:checked {
    background: ${props => props.theme.colors.bg.inputRange};
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: var(--height);
    height: var(--height);
    background-color: ${props => props.theme.colors.text.title};
    border-radius: 50%;
    transition: all 0.3s;
  }

  &:checked::before {
    transform: translateX(100%);
    background: ${props => props.theme.colors.bg.details};
  }
`

export const Buttons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.medium};
  align-items: center;
`

export const Button = styled.button`
  flex: 1;
  font-size: .6rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  padding: .4rem .3rem;
  margin-top: ${props => props.theme.spacing.top};
  text-transform: capitalize;
  border-radius: ${props => props.theme.borderRadius.small};
  color: ${props => props.theme.colors.text.details};
  border: 2px solid ${props => props.theme.colors.bg.details};
  background: ${props => props.theme.colors.bg.details};
  transition: background .2s ease;
  
  &:hover {
    color: ${props => props.theme.colors.bg.details};
    background: transparent;
  }

  &:active {
    transform: scale(.95)
  }
`