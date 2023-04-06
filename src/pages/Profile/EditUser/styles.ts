import styled from "styled-components"
import { Button } from "../../Authentication/styles";

export const Container = styled.div`
  border-radius: ${props => props.theme.borderRadius.medium};
  width: 100%;
  /* background: ${props => props.theme.colors.bg.secondary}; */
`

export const Title = styled.h3`
  font-size: .8rem;
  color: ${props => props.theme.colors.text.title};
  text-align: center;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.large};
  width: 500px;
  margin: 0 auto;
  max-width: 95%;
  margin-top: ${props => props.theme.spacing.top};
`

export const Input = styled.input`
  border: 0;
  font-size: .6rem;
  border-radius: ${props => props.theme.borderRadius.small};
  /* background: ${props => props.theme.colors.opaque}; */
  color: ${props => props.theme.colors.text.title};
  padding: .4rem;
  width: 100%;
  outline: 2px solid ${props => props.theme.colors.opaque};
  background: transparent;
  transition: all .3s ease;
  
  &::placeholder {
    color: ${props => props.theme.colors.text.settings};
  }

  &:focus {
    outline-color: ${props => props.theme.colors.bg.details};
    /* background: ${props => props.theme.colors.bg.details}; */
  }
`

export const SubmitButton = styled(Button)`
  background: ${props => props.theme.colors.bg.details};
  margin: 0 auto;
  margin-right: 0;
  padding: .4rem .5rem;
  border-radius: .3rem;
  width: max-content;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.medium};
  width: 100%;
`

export const Label = styled.label`
  font-size: .7rem;
  color: ${props => props.theme.colors.text.settings};
`