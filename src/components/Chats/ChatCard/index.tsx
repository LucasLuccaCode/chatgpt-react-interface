import { MouseEvent } from "react"
import { useChatActions } from "../../../contexts/chatActionsContext"

import { ChatContainer, InputCheckbox, Label, Title } from "./styles"

interface ChatProps {
  id: number,
  title: string,
  setCurrentChatId(): void,
  isActive: boolean
}

export const ChatCard: React.FC<ChatProps> = ({ id, title, setCurrentChatId, isActive }) => {
  const { removeChats, selectingChats, handleCheckboxChange } = useChatActions()

  const handleChatClick = () => {
    !selectingChats && setCurrentChatId()
  }

  return (
    <ChatContainer
      className={isActive && !selectingChats ? 'active' : ''}
      onClick={handleChatClick}
    >
      <Label>

        {selectingChats ? (
          <InputCheckbox
            type="checkbox"
            name={String(id)}
            checked={removeChats.includes(id)}
            onChange={() => handleCheckboxChange(id)}
          />
        ) : (
          <i className="bi bi-chat-left" />
        )}

        <Title className="nowrap">{title}</Title>
      </Label>
    </ChatContainer>
  )
}