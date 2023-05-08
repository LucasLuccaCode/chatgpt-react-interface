import React from "react";

import { UserCard, UsersListStyled } from "./styles";

import { Loading } from "../Loading";
import { Avatar } from "../Avatar";
import { AuthorLink } from "../AuthorLink";
import { LinkButton } from "../LinkButton";

interface UsersListProps {
  isLoading: boolean;
  users?: {
    id: number;
    name: string;
  }[];
}

export const UsersList: React.FC<UsersListProps> = ({ isLoading, users }) => {
  return (
    <UsersListStyled>
      {isLoading && (
        <UserCard key={0}>
          <Loading position="RELATIVE" size="1.2rem" />
        </UserCard>
      )}

      {users?.map(user => (
        <UserCard key={user.id}>
          <Avatar sizeRem="2rem" isAuthor={false} username={user.name} />
          <AuthorLink authorId={user.id} author={user.name} sizerem=".9rem" />
          <LinkButton to={`/${user.id}/profile`}>
            <i className="bi bi-profile" />
            <span>Ver Perfil</span>
          </LinkButton>
        </UserCard>
      ))}
    </UsersListStyled>
  )
}