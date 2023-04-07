import React from "react"
import { Outlet, useNavigation, useParams } from "react-router-dom";

import { useChats } from "../../../contexts/chatsContext";

import { MainContainer, Placeholder } from "./styles"

export const Main: React.FC = () => {
  const params = useParams()
  const navigation = useNavigation()
  const { currentChat } = useChats();

  return (
    <MainContainer
      className={navigation.state === 'loading' ? 'loading' : ''}
      hasChats={!!currentChat}
    >
      {params?.chatId ? (
        <Outlet />
      ) : (
        <Placeholder>O conteúdo do chat aparecerá aqui...</Placeholder>
      )}
    </MainContainer>
  )
}