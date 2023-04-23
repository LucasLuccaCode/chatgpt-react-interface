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


import { useAuth } from "../../contexts/authContext"
import axios from "../../services/axios"
import { useQuery } from "@tanstack/react-query"
import { useToast } from "../../contexts/toastContext"
import { IProfileData } from "../../types/users"


const Profile: React.FC = () => {
  const { user: loggedUser } = useAuth()
  const { userId } = useParams()
  const { updateToast } = useToast()

  const { data } = useQuery({
    queryKey: ['profile', userId],
    queryFn() {
      return axios.get(`/users/${userId}/profile`)
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

  const user: IProfileData | null = data?.data.user
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
          <NavItem>
            <NavLink to="favorites">
              Favoritos
            </NavLink>
          </NavItem>
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