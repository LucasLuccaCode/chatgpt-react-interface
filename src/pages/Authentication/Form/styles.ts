import styled from "styled-components"

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.large};
  margin-top: ${props => props.theme.spacing.medium};
  width: 80%;
`

export const Input = styled.input`
  border: 0;
  font-size: .6rem;
  border-radius: ${props => props.theme.borderRadius.small};
  background: ${props => props.theme.colors.opaque};
  color: ${props => props.theme.colors.text.title};
  padding: .4rem;
  width: 100%;
  
  &::placeholder {
    color: ${props => props.theme.colors.text.settings};
  }

  &:focus {
    outline: 2px solid ${props => props.theme.colors.bg.details};
  }
`