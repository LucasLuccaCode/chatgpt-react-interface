import React, { useState } from "react";
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
import { LinkButton } from "../../../components/LinkButton";

interface IRecentUsers {
  id: number;
  name: string;
  isFollowing: boolean;
  created_at: Date;
}

interface IMutationProps {
  isFollowing: boolean,
  userId: number
}

const perPage = 6

export const RecentUsers: React.FC = () => {
  const [page, setPage] = useState(0)
  const { user: loggedUser } = useAuth()
  const { updateToast } = useToast()


  const { data, isLoading } = useQuery({
    queryKey: ['recent-users', page],
    staleTime: Infinity,
    queryFn() {
      if (loggedUser) {
        return axios.get(`/users/recent?page=${page}&per_page=${perPage}`)
      }
    }
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn({ isFollowing, userId }: IMutationProps) {
      if (isFollowing) {
        return axios.post(`/users/${loggedUser?.id}/unfollow/${userId}`)
      } else {
        return axios.post(`/users/${loggedUser?.id}/follow/${userId}`)
      }
    },
    onSuccess(data) {
      if (data.data.message) {
        queryClient.invalidateQueries({ queryKey: ['recent-users', page] })

        updateToast({
          title: data.data.message,
          type: 'success'
        })
      }
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

  const handleMoreUserClick = () => {
    setPage(prevPage => prevPage + 1)
  }

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
                    se cadastrou há <strong>{calculateDiferenceData(user.created_at)}</strong>
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

              {!loggedUser && (
                <LinkButton to="/auth">
                  Faça login
                </LinkButton>
              )}

              {loggedUser && users?.length == perPage && (
                <Button
                  size="full"
                  text="Mostrar mais"
                  handleClick={handleMoreUserClick}
                />
              )}

            </Actions>
          </UserCard>
        </UserList>
      </Content>
    </RecentUsersStyled>
  )
}