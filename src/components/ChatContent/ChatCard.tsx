import { ChatsItem } from "../../types/Chats";

import { Answer, Question } from "./styles"

interface ChatCardProps {
  chatItem: ChatsItem
}

export const ChatCard: React.FC<ChatCardProps> = ({ chatItem: { question, answer } }) => {
  answer = answer.replace(/^.?\n\n/, 'Chat GPT:\n\n');

  return (
    <li>
      <Question>
        <i className="bi bi-send-fill" />
        <h3>{question}</h3>
      </Question>
      <Answer>
        {answer}
      </Answer>
    </li>
  )
}  