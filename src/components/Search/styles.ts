import styled from "styled-components";

export const SearchForm = styled.form`
  display: flex;
  gap: .3rem;
  width: 100%;
  padding: ${props => props.theme.spacing.small};
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid transparent;
  background: ${props => props.theme.colors.bg.primary};
  transition: border-color .3s ease;

  &:focus-within {
    border-color: ${props => props.theme.colors.bg.details};
  }
`

export const InputSearch = styled.input`
  flex: 1;
  flex-direction: column;
  border: 0;
  font-size: .7rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  outline: 0;
  color: ${props => props.theme.colors.text.title};
  background: transparent;
  overflow: hidden;

  &::placeholder {
    color: ${props => props.theme.colors.text.placeholder};
  }
`

export const Button = styled.button`
  padding: .2rem;
  border-radius: ${props => props.theme.borderRadius.medium};
  background: ${props => props.theme.colors.bg.details};
  border: 2px solid ${props => props.theme.colors.bg.details};
  outline: 1px solid transparent;
  transition: background .2s ease;

  &:hover {
    background: transparent;
    
    i {
      color: ${props => props.theme.colors.bg.details};
    }
  }
  
  &:focus {
    outline-color: ${props => props.theme.colors.bg.details};
  }

  i {
    font-size: .7rem;
    color: ${props => props.theme.colors.text.details};
  }
`