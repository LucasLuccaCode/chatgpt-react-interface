import {
  ChatContentItem,
  Answer,
  Question,
  Output,
  Header,
  Title,
  Icon,
  Prompt
} from "./styles"

import { CopyButton } from "../../CopyButton"

export interface ChatItemProps {
  question: string,
  answer: string
}

export const ChatItem: React.FC<ChatItemProps> = ({ question, answer }) => {
  return (
    <ChatContentItem>
      <Question>
        <Icon className="bi bi-person-circle" />
        <Prompt>{question}</Prompt>
      </Question>
      <Answer>
        <Header>
          <Title>
            <Icon className="bi bi-robot" />
            <h4>ChatGpt:</h4>
          </Title>

          <CopyButton answer={answer} />
        </Header>

        <Output>
          {answer}
        </Output>
      </Answer>
    </ChatContentItem>
  )
}  