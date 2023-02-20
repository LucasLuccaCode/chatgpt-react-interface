import { ChatContainer } from "./styles"

interface ChatProps {
  title: string,
  setCurrentChatId(): void
}

export const Chat: React.FC<ChatProps> = ({ title, setCurrentChatId }) => {
  return (
    <ChatContainer onClick={setCurrentChatId}>
      <i className="bi bi-chat-square-text-fill" />
      <h3 className="nowrap">{title}</h3>
    </ChatContainer>
  )
}