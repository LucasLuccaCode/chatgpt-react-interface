import { MouseEvent } from "react"
import { NavLink } from "react-router-dom"
import { useChatActions } from "../../../contexts/chatActionsContext"
import { ChatContainer, InputCheckbox, Label, Title } from "./styles"

interface ChatProps {
  id: number
  title: string
}

export const ChatCard: React.FC<ChatProps> = ({ id, title }) => {
  const { chatIdsRemove, selectingChats, handleCheckboxChange } = useChatActions()

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (selectingChats) {
      e.preventDefault()
      handleCheckboxChange(id)
    }
  }

  const isChecked = chatIdsRemove.includes(id)
  
  return (
    <ChatContainer>
      <NavLink to={`${id}`} onClick={handleLinkClick}>
        <Label>
          {selectingChats ? (
            <InputCheckbox
              type="checkbox"
              checked={isChecked}
              onChange={() => { }}
            />
          ) : (
            <i className="bi bi-chat-left" />
          )}

          <Title className="nowrap">{title}</Title>
        </Label>
      </NavLink>
    </ChatContainer>
  )
}
