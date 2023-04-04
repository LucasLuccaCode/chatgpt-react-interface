import * as Toast from '@radix-ui/react-toast';
import styled, { keyframes } from 'styled-components';

export const ToastContainer = styled.section`
  position: fixed;
  bottom: 0;
  right: 0;
`

export const ToastProvider = styled(Toast.Provider)`
`

export const ToastViewport = styled(Toast.Viewport)`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
  width: 390px;
  max-width: 100vw;
  margin: 0;
  list-style: none;
  z-index: 2147483647;
  outline: none;
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
  background-color: ${props => props.theme.colors.bg.secondary};
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  padding: 15px;
  display: grid;
  grid-template-areas: 'title action' 'description action';
  grid-template-columns: auto max-content;
  column-gap: 15px;
  align-items: center;
  box-shadow: 0 1px 2px 1px ${props => props.theme.colors.opaque};

  &[data-state='open']{
    animation: ${SlideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  &[data-state='closed']{
    animation: ${Hide} 100ms ease-in;
    /* animation: ${SwipeOut} 100ms ease-out; */
  }
`

export const ToastTitle = styled(Toast.Title)`
  grid-area: title;
  margin-bottom: 5px;
  font-weight: 500;
  color: #3a3a40;
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
  border-radius: 4px;
  font-weight: 500;
  
  &.small {
    font-size: .6rem;
    padding: .4rem .5rem;
    line-height: .6rem;
    background: ${props => props.theme.colors.bg.details};
    border: 2px solid transparent;
    transition: .2s ease;
    
    &:hover {
      background: transparent;
      color: ${props => props.theme.colors.bg.details};
      border-color: ${props => props.theme.colors.bg.details};
    }
  }
  
  &.large {
    font-size: 15px;
    padding: 0 15px;
    line-height: 35px;
    height: 35px;
  }

  
  &:focus {
    box-shadow: 0 0 0 2px ${props => props.theme.colors.bg.details};
  }
`