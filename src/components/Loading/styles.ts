import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

interface SpinnerTypes {
  size?: string
}

export const Spinner = styled.div<SpinnerTypes>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: .27rem solid rgba(0, 0, 0, 0.1);
  border-left-color: #CE90F4;
  border-radius: 50%;
  margin: auto;
  width: ${props => props.size || '1rem'};
  height: ${props => props.size || '1rem'};
  animation: ${spin} .9s linear infinite;
`;