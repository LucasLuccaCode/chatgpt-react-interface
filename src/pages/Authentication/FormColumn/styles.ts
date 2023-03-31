import styled from "styled-components";

import { Button, Column, Description, Title } from "../styles";

export const FormColumnStyled = styled(Column)`
  display: flex;
  
  width: 60%;

  & ${Title} {
    color: ${props => props.theme.colors.bg.details};
  }

  & ${Button} {
    border: 2px solid ${props => props.theme.colors.bg.details};
    background: ${props => props.theme.colors.bg.details};

    &:hover {
      background: transparent;
      color: ${props => props.theme.colors.bg.details};
    }
  }

  & ${Description} {
    color: ${props => props.theme.colors.text.title};
    opacity: .8;
  }
`