import React from "react"
import { Link, NavLink, Outlet, useParams } from "react-router-dom"

import {
  Actions,
  Container,
  ContentRoute,
  Details,
  Followers,
  NavItem,
  NavList,
  Navbar,
  Info,
  Wrapper
} from "./styles"

import axios from "../../services/axios"
import { IProfileData } from "../../types/users"

import { useAuth } from "../../contexts/authContext"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useToast } from "../../contexts/toastContext"
import { Avatar } from "../../components/Avatar"
import { FollowerButton } from "../../components/FollowerButton"
import { LinkButton } from "../../components/LinkButton"

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
        <Avatar avatar_url={userAvatar} sizeRem="5rem" />

        <Info>
          <h2>{user?.name}</h2>
          <Followers>
            <Wrapper>
              <i className="bi bi-card-list" />
              <Link to="prompts">
                <strong>{user?.promptCount}</strong> {(user?.promptCount || 0) > 1 ? 'Publicações' : 'Publicação'}
              </Link>
            </Wrapper>
            <i className="bi bi-dot" />
            <Wrapper>
              <i className="bi bi-people-fill" />
              <Link to="followers"><strong>{user?.followers}</strong> {Number(user?.followers) > 1 ? 'seguidores' : 'seguidor'}</Link>
            </Wrapper>
            <i className="bi bi-dot" />
            <Wrapper>
              <i className="bi bi-person-fill" />
              <Link to="following"><strong>{user?.following}</strong> seguindo</Link>
            </Wrapper>
          </Followers>
        </Info>
        <Actions>
          {isVisitingOwnProfile ? (
            <LinkButton to="edit">
              <i className="bi bi-pencil-fill" />
              <p>Editar perfil</p>
            </LinkButton>
          ) : (
            <FollowerButton
              // disabled={mutation.isLoading}
              size="normal"
              handleOnClick={() => mutation.mutate()}
            >
              <i className={`bi bi-${user?.visitorIsFollowing ? 'dash-lg' : 'plus'}`} />
              <p>{user?.visitorIsFollowing ? "Deixar de seguir" : "Seguir"}</p>
            </FollowerButton>
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