import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

interface AuthorLinkStyledProps {
  sizeRem: string;
}

const AuthorLinkStyled = styled(Link) <AuthorLinkStyledProps>`
  ${({ theme, sizeRem }) => css`
    font-size: ${sizeRem};
    color: ${theme.colors.text.title};
    font-weight: bold;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-transform: capitalize;
    overflow: hidden;

    &:hover {
      text-decoration: underline;
    }

    &::first-letter {
    }
  `}
`

interface AuthorLinkProps {
  author: string;
  authorId: number;
  sizeRem: string;
}

export const AuthorLink: React.FC<AuthorLinkProps> = ({ author, authorId, sizeRem }) => {
  return (
    <AuthorLinkStyled to={`/${authorId}/profile`} sizeRem={sizeRem}>
      {author}
    </AuthorLinkStyled>
  )
}