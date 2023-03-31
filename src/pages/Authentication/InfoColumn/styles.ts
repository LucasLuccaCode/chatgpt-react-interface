import styled, { css } from "styled-components";
import { Column, Title, Description, Button } from "../styles";

interface PropsWithIsLogin {
  isLogin: boolean;
}

export const InfoColumnStyled = styled(Column) <PropsWithIsLogin>`
  ${({ theme, isLogin }) => css`
    width: 40%;
    z-index: 2;
    order: ${isLogin ? 1 : 0};
    
    & ${Title},
    & ${Description} {
      color: ${theme.colors.text.title};
    }

    & ${Button} {
      background: ${theme.colors.text.title};
      border: 2px solid ${theme.colors.text.title};
      color: ${theme.colors.bg.details};

      &:hover {
        background: transparent;
        color: ${theme.colors.text.title};
      }
    }
  `}
`