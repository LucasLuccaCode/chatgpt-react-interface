import styled, { css, keyframes } from "styled-components";

interface PropsWithIsLogin {
  isLogin: boolean;
}

export const Container = styled.section`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
`

export const Card = styled.div<PropsWithIsLogin>`
  ${({ theme, isLogin }) => css`
    position: relative;
    display: flex;
    width: 70%;
    min-height: 60%;
    border-radius: ${theme.borderRadius.large};
    background: ${theme.colors.bg.secondary};
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: ${isLogin ? '60%' : '0'};
      width: 40%;
      height: 100%;
      background: ${theme.colors.bg.details};
      transition: left .5s ease-in-out;
      z-index: 1;
    }
  `
  }`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${props => props.theme.spacing.large};
  align-items: center;
  padding: ${props => props.theme.spacing.large};
`

export const Title = styled.h2`
  font-size: 1.1rem;
`

export const Description = styled.p`
  font-size: .7rem;
  line-height: .9rem;
  text-align: center;
`

export const ButtonAnimation = keyframes`
  to {
    left: 100%;
  }
`

export const Button = styled.button`
  position: relative;
  cursor: pointer;
  padding: .3rem 0;
  font-weight: bold;
  font-size: .5rem;
  color: ${props => props.theme.colors.text.title};
  min-width: 6rem;
  text-transform: uppercase;
  max-width: 90%;
  border-radius: 50px;
  transition: background .3s ease;
  overflow: hidden;

  &::after {
   content: "";
   position: absolute;
   top: 0;
   left: -50%;
   width: 50%;
   height: 100%;
   background: linear-gradient(to right, transparent, rgba(255,255,255, .3), transparent);
   animation: ${ButtonAnimation} 1s ease infinite;
 }
`