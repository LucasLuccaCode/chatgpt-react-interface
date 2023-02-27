import styled from "styled-components";

export const SearchForm = styled.form`
  display: flex;
  gap: .3rem;
  width: 100%;
  padding: ${props => props.theme.spacing.small};
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid transparent;
  background: ${props => props.theme.colors.bg.primary};

  &:focus-within {
    border-color: ${props => props.theme.colors.borderFocus};
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
  background: ${props => props.theme.colors.bg.button};
  padding: .3rem;
  border-radius: ${props => props.theme.borderRadius.medium};
  outline: 1.7px solid transparent;

  &:hover {
    background: ${props => props.theme.colors.bg.buttonHover};
  }

  &:focus {
    outline-color: ${props => props.theme.colors.borderFocus};
  }

  i {
    font-size: .8rem;
    color: ${props => props.theme.colors.text.title};
  }

`