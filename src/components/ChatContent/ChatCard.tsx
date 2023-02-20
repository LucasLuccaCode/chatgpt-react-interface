import { Answer, Question } from "./styles"

export interface ChatCardProps {
  question: string,
  answer: string
}

export const ChatCard: React.FC<ChatCardProps> = ({ question, answer }) => {
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