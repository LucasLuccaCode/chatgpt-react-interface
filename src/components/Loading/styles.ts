import styled, { css, keyframes } from "styled-components";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

interface SpinnerProps {
  size?: string
}

export const Spinner = styled.div<SpinnerProps>`
  ${({ size }) => css` 
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: .27rem solid rgba(255, 255, 255, .1);
    border-left-color: #5768ef;
    border-radius: 50%;
    margin: auto;
    width: ${size || '1rem'};
    height: ${size || '1rem'};
    animation: ${spin} .9s linear infinite;
  `
}`