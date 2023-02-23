import styled from "styled-components";

export const SearchForm = styled.form`
display: flex;
gap: .3rem;
width: 100%;
padding: .3rem;
border-radius: ${props => props.theme.b_radius};
border: 2px solid transparent;
background: ${props => props.theme.colors.second_bg};

  &:focus-within {
    border: 2px solid ${props => props.theme.colors.details};
  }
`

export const InputSearch = styled.input`
  flex: 1;
  flex-direction: column;
  border: 0;
  outline: 0;
  color: ${props => props.theme.colors.text};
  background: transparent;
  overflow: hidden;
`

export const Button = styled.button`
background: #1a1a1a;
padding: .3rem;
border-radius: .3rem;

  &:hover {
    background: #2a2a2a;
  }

  i {
    font-size: .8rem;
    color: ${props => props.theme.colors.text};
  }

`