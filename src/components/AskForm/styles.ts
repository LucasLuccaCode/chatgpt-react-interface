import styled from "styled-components";

export const AskFormContainer = styled.form`
flex: 1;
display: flex;
align-items: center;
gap: ${props => props.theme.spacing.medium};
padding: ${props => props.theme.spacing.medium};
transition: border .3s;
`

export const QuestionEntry = styled.textarea`
flex: 1;
font-size: .7rem;
font-family: 'Poppins', sans-serif;
color: ${props => props.theme.colors.text.title};
background: transparent;

  &.disabled {
    pointer-events: none;
    opacity: .5;
  }

  &::placeholder {
    color: ${props => props.theme.colors.text.placeholder};
  }
`

export const SendButton = styled.button`
padding: .25rem;
border-radius: .2rem;
border: 1px solid transparent;
background: transparent;
transition: background .3s ease;

  &:hover {
    background: ${props => props.theme.colors.opaque};
  }

  &:focus {
    border-color: ${props => props.theme.colors.bg.details};
  }

  i {
    font-size: 1rem;
    color: ${props => props.theme.colors.bg.details};
  }
`