import React from "react"
import { NavLink, Outlet, useParams } from "react-router-dom"

import {
  Actions,
  Avatar,
  Container,
  ContentRoute,
  Details,
  EditButton,
  NavItem,
  NavList,
  Navbar,
  Title
} from "./styles"

import axios from "../../services/axios"
import { IUserById } from "../../types/users"

import { useAuth } from "../../contexts/authContext"
import { useQuery } from "@tanstack/react-query"
import { useToast } from "../../contexts/toastContext"


const Profile: React.FC = () => {
  const { user: loggedUser } = useAuth()
  const { userId } = useParams()
  const { updateToast } = useToast()

  const { data } = useQuery({
    queryKey: ['profile', userId],
    queryFn() {
      return axios.get(`/users/${userId}`)
    },
    staleTime: 5 * 60 * 1000, // 5 min em milissegundos
    refetchOnWindowFocus: false,
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

  const user: IUserById | null = data?.data.user

  const isVisitingOwnProfile = user?.id === loggedUser?.id

  const userAvatar = "https://avatars.githubusercontent.com/u/91238215?v=4"

  return (
    <Container>
      <Details>
        <Avatar style={{ backgroundImage: `url(${userAvatar})` }} />
        <Title>
          <h2>{user?.name}</h2>
          <p>0 Amigos</p>
        </Title>
        <Actions>
          {isVisitingOwnProfile && (
            <EditButton to="edit">
              <i className="bi bi-pencil-fill" />
              <p>Editar perfil</p>
            </EditButton>
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