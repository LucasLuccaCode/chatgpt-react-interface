import React from "react"

import { SidebarContainer, Title } from "./styles"

import { Search } from "../../components/Search"
import { Chats } from "../../components/Chats"
import { SidebarActions } from "../../components/SidebarActions"

export const Sidebar: React.FC = () => {

  return (
    <SidebarContainer>
      <Search />

      <Title>Chats</Title>

      <Chats />

      <SidebarActions />
    </SidebarContainer>
  )
}