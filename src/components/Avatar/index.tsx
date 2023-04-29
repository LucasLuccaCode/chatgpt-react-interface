import { AvatarStyled } from "./styles";

import { getNameInitials } from "../../utils/getNameInitials";

interface IAvatarProps {
  avatar_url?: string;
  isAuthor?: boolean;
  username?: string;
  sizeRem: string;
}

export const Avatar: React.FC<IAvatarProps> = ({ avatar_url, isAuthor, username, sizeRem }) => {
  return (
    <AvatarStyled avatar_url={avatar_url} isAuthor={isAuthor} sizeRem={sizeRem} >
      {!avatar_url && (
        <span>{getNameInitials(username)}</span>
      )}
    </AvatarStyled>
  )
}