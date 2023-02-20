import styled from "styled-components"

export const StatusContainer = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
margin-bottom: .6rem;
`

export const ProgressMessage = styled.div`
font-size: .8rem;
color: #aaaab0;
`

export const Stop = styled.button`
font-size: .7rem;
padding: .3rem .5rem;
color: #fff;
font-weight: bold;
border-radius: .2rem;
background: ${props => props.theme.colors.details};
opacity: 1;
transition: opacity .4s ease;

  &.hide {
    opacity: 0;
  }

  &:hover {
    background: #059ddf;
  }
`