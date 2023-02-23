import styled from "styled-components"

export const StatusContainer = styled.div`
grid-area: status;
display: flex;
align-items: center;
width: 100%;
height: 100%;
border-radius: ${props => props.theme.b_radius};
padding: 0 .4rem;
border: 1.5px solid rgba(255, 255, 255, .05);
overflow: hidden;
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