import {
  ChatContentItem,
  Answer,
  Question,
  Header,
  Title,
  Icon,
  Prompt
} from "./styles"

import { RefObject, useEffect, useRef, useState } from "react"

export interface ChatItemProps {
  question: string,
  chatContainerRef: RefObject<HTMLUListElement>,
}

export const PreTyping: React.FC<ChatItemProps> = ({ question, chatContainerRef }) => {
  const [loader, setLoader] = useState('')

  const intervalRef = useRef<number | undefined>()

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setLoader(prevLoader => prevLoader === '...' ? '' : prevLoader + '.')
    }, 300)

    chatContainerRef.current!.scrollTop = chatContainerRef.current!.scrollHeight;

    return () => {
      clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <ChatContentItem>
      <Question>
        <Icon className="bi bi-person-circle" />
        <Prompt>{question}</Prompt>
      </Question>
      <Answer isLoading={true}>
        <Header>
          <Title>
            <Icon className="bi bi-robot" />
            <h4>Loading {loader}</h4>
          </Title>
        </Header>
      </Answer>
    </ChatContentItem>
  )
}  