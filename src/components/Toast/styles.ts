import * as Toast from '@radix-ui/react-toast';
import styled, { keyframes } from 'styled-components';

export const ToastContainer = styled.section`
  position: fixed;
  bottom: .6rem;
  right: .6rem;
`

export const ToastProvider = styled(Toast.Provider)``

export const ToastViewport = styled(Toast.Viewport)`
  display: flex;
  flex-direction: column;
  gap: .5rem;
  width: max-content;
  max-width: 100vw;
  padding: .5rem;
  z-index: 1000;
`

const Hide = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: .5;
  }
`

const SlideIn = keyframes`
  from {
    transform: translateX(calc(100% + 10px));
  }
  to {
    transform: translateX(0);
  }
`

const SwipeOut = keyframes`
  from {
    transform: translateX(10px);
  }
  to {
    transform: translateX(calc(100% + 10px));
  }
`

export const ToastRoot = styled(Toast.Root)`
  display: grid;
  grid-template-areas: 'title action' 'description action';
  grid-template-columns: auto max-content;
  column-gap: .5rem;
  align-items: center;
  padding: .8rem;
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  background-color: ${props => props.theme.colors.bg.toast};
  /* backdrop-filter: blur(5px); */
  
  &[data-state='open']{
    animation: ${SlideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  &[data-state='closed']{
    animation: ${Hide} 100ms ease-in;
    /* animation: ${SwipeOut} 100ms ease-out; */
  }
  
  &:focus {
    outline: 1px solid ${props => props.theme.colors.bg.details};
  }
`

export const ToastTitle = styled(Toast.Title)`
  grid-area: title;
  margin-bottom: 5px;
  font-weight: 500;
  color: ${props => props.theme.colors.text.title};
  font-size: .7rem;

  &.info {
    color: ${props => props.theme.colors.text.info};
  }

  &.error {
    color: ${props => props.theme.colors.text.error};
  }

  &.success {
    color: ${props => props.theme.colors.text.success};
  }
`

export const ToastDescription = styled(Toast.Description)`
  grid-area: description;
  margin: 0;
  color: #4a4a50;
  font-size: 13px;
  line-height: 1.3;
`

export const ToastAction = styled(Toast.Action)`
  grid-area: action;
`

export const Button = styled.button`
  all: unset;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: .3rem;
  font-weight: 500;
  
  font-size: .6rem;
  padding: .4rem .5rem;
  border: 2px solid transparent;
  background: ${props => props.theme.colors.bg.details};
  transition: .2s ease;
  
  &:hover {
    background: transparent;
    color: ${props => props.theme.colors.bg.details};
    border-color: ${props => props.theme.colors.bg.details};
  }
`