import styled from "styled-components";

export const PromptFormStyled = styled.form`
  display: flex;
  gap: .8rem;
`

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: .5rem;
`

export const Select = styled.select`
  font-size: .7rem;
  padding: .2rem .6rem;
  border-radius: ${props => props.theme.borderRadius.medium};
  width: max-content;
  outline: none;
  color: ${props => props.theme.colors.text.title};
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.opaque};

  option {
    background: ${props => props.theme.colors.bg.secondary};
  }
`;

export const TextArea = styled.textarea`
  font-size: .8rem;
  color: ${props => props.theme.colors.text.title};
  margin: .5rem 0;
  padding: 0 .5rem;
  border-radius: ${props => props.theme.borderRadius.medium};
  background: transparent;

  &::-webkit-scrollbar {
    width: .25rem;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 50px;
    background: ${props => props.theme.colors.border};
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${props => props.theme.colors.border};
  padding-top: .5rem;
`

export const Status = styled.div`
  font-size: .8rem;
  color: ${props => props.theme.colors.text.placeholder};
`

export const Button = styled.button`
  color: #fff;
  font-size: .7rem;
  padding: .3rem .5rem;
  border-radius: 20px;
  width: 30%;
  background-color: ${props => props.theme.colors.bg.details};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0c8de4;
  }

  &:disabled {
    pointer-events: none;
    opacity: .5;
  }
`;