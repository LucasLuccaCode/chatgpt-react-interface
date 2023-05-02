import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

interface AuthorLinkStyledProps {
  sizerem: string;
}

const AuthorLinkStyled = styled(Link)<AuthorLinkStyledProps>`
  ${({ theme, sizerem }) => css`
    font-size: ${sizerem};
    color: ${theme.colors.text.title};
    font-weight: bold;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-transform: capitalize;
    overflow: hidden;
    
    &:hover {
      text-decoration: underline;
    }
  `}
`

interface AuthorLinkProps {
  author: string;
  authorId: number;
  sizerem: string;
}

export const AuthorLink: React.FC<AuthorLinkProps> = ({ author, authorId, sizerem }) => {
  return (
    <AuthorLinkStyled to={`/${authorId}/profile`} sizerem={sizerem} title={`Ir para o perfil de ${author}`}>
      {author}
    </AuthorLinkStyled>
  )
}