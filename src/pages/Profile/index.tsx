import React from "react"
import { NavLink, Outlet } from "react-router-dom"

import {
  Actions,
  Avatar,
  Container,
  ContentRoute,
  Cover,
  Details,
  EditButton,
  NavItem,
  NavList,
  Navbar,
  Title
} from "./styles"


import { useAuth } from "../../contexts/authContext"

export const Profile: React.FC = () => {
  const { user } = useAuth()

  const handleMenuClick = () => {
    console.log("Menu clicked")
  }

  const userAvatar = "https://avatars.githubusercontent.com/u/91238215?v=4"

  return (
    <Container>
      <Cover />
      <Details>
        <Avatar style={{ backgroundImage: `url(${userAvatar})` }} />
        <Title>
          <h2>{user?.name}</h2>
          <p>0 Amigos</p>
        </Title>
        <Actions>
          <EditButton to="edit">
            <i className="bi bi-pencil-fill" />
            <p>Editar perfil</p>
          </EditButton>
        </Actions>
      </Details>
      <Navbar>
        <NavList>
          <NavItem onClick={handleMenuClick}>
            <NavLink to="prompts">
              Prompts
            </NavLink>
          </NavItem>
          <NavItem onClick={handleMenuClick}>
            <NavLink to="favorites">
              Favoritos
            </NavLink>
          </NavItem>
          <NavItem onClick={handleMenuClick}>
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