import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "../../../services/axios"

import {
  Actions,
  Content,
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
import { useAuth } from "../../../contexts/authContext";
import { useToast } from "../../../contexts/toastContext";
import { FollowerButton } from "../../../components/FollowerButton";
import { Button } from "../../../components/Button";

interface IRecentUsers {
  id: number;
  name: string;
  isFollowing: boolean;
  created_at: Date;
}

export const RecentUsers: React.FC = () => {
  const { user: loggedUser } = useAuth()
  const { updateToast } = useToast()


  const { data, isLoading } = useQuery({
    queryKey: ['recent-users'],
    queryFn() {
      return axios.get('/users/recent')
    }
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn({ isFollowing, userId }: { isFollowing: boolean, userId: number }) {
      if (isFollowing) {
        return axios.post(`/users/${loggedUser?.id}/unfollow/${userId}`)
      }
      return axios.post(`/users/${loggedUser?.id}/follow/${userId}`)
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ['recent-users'] })

      updateToast({
        title: data.data.message,
        type: 'success'
      })
    },
    onError(error: any) {
      const errorMessage = error.response
        ? error.response.data.error
        : error.message

      updateToast({
        title: errorMessage,
        type: 'error'
      })
    }
  })

  const users: IRecentUsers[] = data?.data

  return (
    <RecentUsersStyled>
      <Content>
        <Title>Usuários recentes</Title>

        {isLoading && <Loading position="RELATIVE" size="1.5rem" />}

        <UserList>
          {users?.map(user => (
            <UserCard key={user.id}>
              <Details>
                <Avatar isAuthor={false} username={user.name} sizeRem="2rem" />

                <Info>
                  <AuthorLink author={user.name} authorId={user.id} sizerem=".7rem" />
                  <RegisteredAt>
                    se cadastrou há <span>{calculateDiferenceData(user.created_at)}</span>
                  </RegisteredAt>
                </Info>
              </Details>
              <Actions>
                <FollowerButton
                  size="full"
                  handleOnClick={() => mutation.mutate({ isFollowing: user.isFollowing, userId: user.id })}
                >
                  <i className={`bi bi-${user.isFollowing ? 'dash-lg' : 'plus'}`} />
                  <p>{user.isFollowing ? "Deixar de seguir" : "Seguir"}</p>
                </FollowerButton>
              </Actions>
            </UserCard>
          ))}

          <UserCard>
            <Actions>
              <Button size="full" text="Mostrar mais" />
            </Actions>
          </UserCard>
        </UserList>
      </Content>
    </RecentUsersStyled>
  )
}