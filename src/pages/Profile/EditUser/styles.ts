import styled from "styled-components"
import { Button } from "../../Authentication/styles";

export const Container = styled.div`
  background: ${props => props.theme.colors.bg.secondary};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: 1rem;
  overflow: hidden;
`

export const Title = styled.h3`
  font-size: .8rem;
  color: ${props => props.theme.colors.text.title};
  text-align: center;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.large};
  margin-top: ${props => props.theme.spacing.top};
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

export const SubmitButton = styled(Button)`
  background: ${props => props.theme.colors.bg.details};
`