import { useQuery } from "@tanstack/react-query"
import axios from "../../../services/axios"

import {
  Actions,
  Details,
  Info,
  RecentUsersStyled,
  RegisteredAt,
  Title,
  UserCard,
  UserList,
} from "./styles"

import { calculateDiferenceData } from "../../../utils/calculateDiferenceDate";

import { Loading } from "../../../components/Loading";
import { Avatar } from "../../../components/Avatar";
import { AuthorLink } from "../../../components/AuthorLink";

interface IRecentUsers {
  id: number;
  name: string;
  created_at: Date;
}

export const RecentUsers: React.FC = () => {

  const { data, isLoading } = useQuery({
    queryKey: ['recent-users'],
    queryFn() {
      return axios.get('/users/recent')
    }
  })

  const users: IRecentUsers[] = data?.data

  console.log(users)

  if (isLoading) {
    return (
      <Loading position="RELATIVE" size="1.5rem" />
    )
  }

  return (
    <RecentUsersStyled>
      <Title>Usuários recentes</Title>
      <UserList>
        {users?.map(user => (
          <UserCard key={user.id}>
            <Details>
              <Avatar isAuthor={false} username={user.name} sizeRem="2rem" />
              
              <Info>
                <AuthorLink author={user.name} authorId={user.id}  sizeRem=".7rem" />
                <RegisteredAt>
                  se cadastrou há <span>{calculateDiferenceData(user.created_at)}</span>
                </RegisteredAt>
              </Info>
            </Details>
            <Actions>
              <button>Seguir</button>
            </Actions>
          </UserCard>
        ))}
      </UserList>
    </RecentUsersStyled>
  )
}