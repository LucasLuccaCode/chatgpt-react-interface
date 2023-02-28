import styled, { css } from "styled-components"

export const ChatContentItem = styled.li`
  width: 100%;
  border-radius: ${props => props.theme.spacing.medium};
`

export const Question = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.medium};
  width: 100%;
  overflow: hidden;

  i {
    margin-top: .15rem;
  }
`

export const Icon = styled.i`
  font-size: .8rem;
  color: ${props => props.theme.colors.bg.details};
`

export const Prompt = styled.pre`
  flex: 1;
  font-size: .7rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  color: ${props => props.theme.colors.text.question};
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.2rem; 

  &::first-letter {
    text-transform: uppercase;
  }
`

interface ChatContentItemProps {
  isLoading?: boolean
}

export const Answer = styled.div<ChatContentItemProps>`${({ theme, isLoading }) => css`
  font-size: .7rem;
  color: ${theme.colors.text.answer};
  padding: ${theme.spacing.medium};
  width: 100%;
  margin-top: .6rem;
  margin-left: 1px;
  border-radius: ${isLoading ? theme.spacing.small : theme.spacing.medium};
  background: ${theme.colors.bg.secondary};
  box-shadow: ${theme.boxShadow.container};
  `
}`

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Title = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.medium};
  align-items: center;

  i {
    color: ${props => props.theme.colors.text.answer};
  }

  h4 {
    font-size: .7rem;
    color: ${props => props.theme.colors.text.answer};
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }
`

export const Output = styled(Prompt)`
  margin-top: 1rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  color: ${props => props.theme.colors.text.answer};
`