import { MouseEvent } from "react"
import { useChatActions } from "../../../contexts/chatActionsContext"

import { ChatContainer, InputCheckbox } from "./styles"

interface ChatProps {
  id: number,
  title: string,
  setCurrentChatId(): void,
}

export const Chat: React.FC<ChatProps> = ({ id, title, setCurrentChatId }) => {
  const { removeChats ,selectingChats, handleCheckboxChange } = useChatActions()

  const handleChatClick = ({ target: el }: MouseEvent<HTMLElement>) => {
    const { tagName } = el as HTMLElement

    if (tagName === "LI") setCurrentChatId()
  }

  const pointerEvents = selectingChats ? 'none' : 'auto'

  return (
    <ChatContainer onClick={handleChatClick} style={{ pointerEvents }}>
      {selectingChats ? (
        <InputCheckbox
          type="checkbox"
          name={String(id)}
          checked={removeChats.includes(id)}
          onChange={() => handleCheckboxChange(id)}
        />
      ) : (
        <i className="bi bi-chat-square-text-fill" />
      )}

      <h3 className="nowrap">{title}</h3>
    </ChatContainer>
  )
}