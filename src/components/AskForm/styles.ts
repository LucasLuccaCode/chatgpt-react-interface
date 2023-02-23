import styled from "styled-components";

export const AskFormContainer = styled.form`
flex: 1;
display: flex;
align-items: center;
gap: .5rem;
border-radius: .2rem;
padding: .4rem;
transition: border .3s;
`

export const QuestionEntry = styled.textarea`
flex: 1;
font-size: .8rem;
color: ${props => props.theme.colors.text};
border-radius: .3rem;
background: transparent;

  &.disabled {
    cursor: none;
    pointer-events: none;
    opacity: .5;
  }

  &::placeholder {
    color: #4a4a50;
  }
`

export const SearchButton = styled.button`
padding: .25rem;
border-radius: .2rem;
border: 1.5px solid transparent;
background: transparent;
transition: background .3s ease;

  &:hover {
    background: rgba(255, 255, 255, .08);
  }

  &:focus {
    border: 1.5px solid rgba(255, 255, 255, .1);
  }

  i {
    font-size: 1rem;
    color: ${props => props.theme.colors.details};
  }
`