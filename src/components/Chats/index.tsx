import { ChatsContainer, Placeholder } from "./styles"

import { Chat } from "./Chat"

export const Chats: React.FC = () => {
  const chats = ['teste']

  return (
    <ChatsContainer>
      {
        chats.length ? (
          <>
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
          </>
        ) : (
          <Placeholder>Nenhum chat</Placeholder>
        )
      }
    </ChatsContainer>
  )
}