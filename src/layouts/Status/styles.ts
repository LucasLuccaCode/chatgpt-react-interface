import styled from "styled-components"

export const StatusContainer = styled.div`
  grid-area: status;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: 0 .4rem;
  background: ${props => props.theme.colors.bg.container};
  box-shadow: ${props => props.theme.boxShadow.container};
  overflow: hidden;
`

export const Message = styled.div`
  width: 100%;

  p, p.info {
    font-size: .7rem;
    color: ${props => props.theme.colors.text.info};
  }

  p.error {
    color: ${props => props.theme.colors.text.error};
  }

  p.success {
    color: ${props => props.theme.colors.text.success};
  }
`