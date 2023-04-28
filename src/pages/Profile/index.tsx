import React from "react"
import { NavLink, Outlet, useParams } from "react-router-dom"

import {
  Actions,
  Avatar,
  Container,
  ContentRoute,
  Details,
  ActionButton,
  Followers,
  NavItem,
  NavList,
  Navbar,
  Title,
  ActionLink
} from "./styles"

import axios from "../../services/axios"
import { IProfileData } from "../../types/users"

import { useAuth } from "../../contexts/authContext"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useToast } from "../../contexts/toastContext"

const Profile: React.FC = () => {
  const { user: loggedUser } = useAuth()
  const { userId } = useParams()
  const { updateToast } = useToast()

  function onError(error: any) {
    const errorMessage = error.response
      ? error.response.data.error
      : error.message

    updateToast({
      title: errorMessage,
      type: 'error'
    })
  }

  const { data } = useQuery({
    queryKey: ['profile', userId],
    queryFn() {
      return axios.get(`/users/${userId}/profile`)
    },
    onError
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn() {
      if (user?.visitorIsFollowing) {
        return axios.post(`/users/${loggedUser?.id}/unfollow/${user?.id}`)
      }
      return axios.post(`/users/${loggedUser?.id}/follow/${user?.id}`)
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ['profile', userId] })

      updateToast({
        title: data.data.message,
        type: 'success'
      })
    },
    onError
  })

  const user: IProfileData | null = data?.data.user

  const isVisitingOwnProfile = user?.id === loggedUser?.id

  const userAvatar = "https://avatars.githubusercontent.com/u/91238215?v=4"

  return (
    <Container>
      <Details>
        <Avatar style={{ backgroundImage: `url(${userAvatar})` }} />
        <Title>
          <h2>{user?.name}</h2>
          <Followers>
            <div>
              <i className="bi bi-people" />
              <span>{user?.followers} {Number(user?.followers) > 1 ? 'seguidores' : 'seguidor'}</span>
            </div>
            <i className="bi bi-dot" />
            <div>
              <i className="bi bi-person" />
              <span>{user?.following} seguindo</span>
            </div>
          </Followers>
        </Title>
        <Actions>
          {isVisitingOwnProfile ? (
            <ActionLink to="edit">
              <i className="bi bi-pencil-fill" />
              <p>Editar perfil</p>
            </ActionLink>
          ) : (
            <ActionButton
              disabled={mutation.isLoading}
              onClick={() => mutation.mutate()}
            >
              {mutation.isLoading ? (
                <i className="bi bi-three-dots" />
              ) : (
                <>
                  <i className={`bi bi-${user?.visitorIsFollowing ? 'dash-lg' : 'plus'}`} />
                  <p>{user?.visitorIsFollowing ? "Deixar de seguir" : "Seguir"}</p>
                </>
              )}
            </ActionButton>
          )}
        </Actions>
      </Details>

      <Navbar>
        <NavList>
          <NavItem>
            <NavLink to="prompts">
              Prompts
            </NavLink>
          </NavItem>

          {isVisitingOwnProfile && (
            <>
              <NavItem>
                <NavLink to="favorites">
                  Favoritos
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="privates">
                  Privados
                </NavLink>
              </NavItem>
            </>
          )}
          <NavItem>
            <NavLink to="about">
              Sobre
            </NavLink>
          </NavItem>
        </NavList >
      </Navbar >

      <ContentRoute>
        <Outlet />
      </ContentRoute>
    </Container >
  )
}

export default Profile