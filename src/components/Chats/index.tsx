import { ChatsContainer, Placeholder } from "./styles"

import { useChats } from "../../contexts/chatsContext"

import { Chat } from "./Chat"

export const Chats: React.FC = () => {
  const { chats, setCurrentChatId } = useChats()
  
  const renderChats = () => {
    if (!chats.length) {
      return (
        <Placeholder>Nenhum chat</Placeholder>
      )
    }

    return (
      chats.map(chat => (
        <Chat 
          key={chat.id} 
          title={chat.title} 
          setCurrentChatId={() => setCurrentChatId(chat.id)} 
        />
      ))
    )
  }

  return (
    <ChatsContainer>
      {renderChats()}
    </ChatsContainer>
  )
}