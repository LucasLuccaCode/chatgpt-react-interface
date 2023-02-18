import styled from "styled-components";

export const SearchForm = styled.form`
display: flex;
padding: .3rem;
border-radius: ${props => props.theme.b_radius};
background: ${props => props.theme.colors.second_bg};
`

export const InputSearch = styled.input`
  flex: 1;
  background: transparent;
  border: 0;
  outline: 0;
  color: ${props => props.theme.colors.text};
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
    color: white;
  }

`