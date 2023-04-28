import styled from "styled-components";

export const PromptsStyled = styled.ul`
  position: relative;
  width: 100%;
`

export const EmptyMessage = styled.h4`
  width: 100%;
  font-size: .8rem;
  text-align: center;
  font-weight: 400;
  margin-top: 1rem;
  color: ${props => props.theme.colors.text.placeholder};
`