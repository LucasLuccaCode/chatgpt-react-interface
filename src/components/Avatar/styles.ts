import styled, { css } from "styled-components";

interface AvatarProps {
  avatar_url?: string;
  isAuthor?: boolean;
  sizeRem: string;
}

export const AvatarStyled = styled.div<AvatarProps>`
  ${({ theme, avatar_url, isAuthor, sizeRem }) => css`
    display: grid;
    place-items: center;
    height: ${sizeRem};
    width: ${sizeRem};
    min-height: ${sizeRem};
    min-width: ${sizeRem};
    border-radius: 50%;
    
    ${avatar_url ? css`
      background-image: url(${avatar_url});
      border: 3px solid ${props => props.theme.colors.text.title};
      background-size: cover;
      backdrop-position: center;
    ` : css`
      background-color: ${isAuthor ? theme.colors.bg.details : theme.colors.bg.button};
    `}

    span {
      font-size: .7rem;
      font-weight: bold;
      text-transform: uppercase;
    }
  `}
`;