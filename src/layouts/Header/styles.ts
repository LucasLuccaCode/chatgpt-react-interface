import styled from "styled-components";

export const HeaderContainer = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: column;
  gap: .5rem;
  margin-top: ${props => props.theme.margins.space};
  padding: 0 1rem;
  padding-bottom: .5rem;
`

export const ChatTitleContainer = styled.div`
  display: flex;
  gap: .5rem;
  align-items: center;
  justify-content: space-between;
`

export const Title = styled.h1`
font-size: 1rem;
color: ${props => props.theme.colors.text};
`

export const ChatTitle = styled.h2`
width: 100%;
font-size: 1rem;
color: ${props => props.theme.colors.text};
font-weight: normal;
`