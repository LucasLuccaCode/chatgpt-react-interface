import { RefObject, useEffect, useState } from "react";
import { ChatCardProps } from "./ChatCard";

import { Answer, Question } from "./styles"

interface LastChatCardProps extends ChatCardProps {
  chatContainerRef: RefObject<HTMLUListElement>
}

export const LastChatCard: React.FC<LastChatCardProps> = ({ question, answer, chatContainerRef }) => {
  const [currentAnswer, setCurrentAnswer] = useState('')
  answer = answer.replace(/^.?\n\n/, 'Chat GPT:\n\n');

  useEffect(() => {
    setCurrentAnswer('')
    writeResponse()
  }, [answer])

  const writeResponse = async () => {
    const sleep = (ms: number) => new Promise(res => setTimeout(res, ms))

    for (let index = 0; index < answer.length; index++) {
      const letter = answer[index]

      setCurrentAnswer(prevState => prevState + letter)

      chatContainerRef.current!.scrollTop = chatContainerRef.current!.scrollHeight

      await sleep(40)
    }
  }

  return (
    <li>
      <Question>
        <i className="bi bi-send-fill" />
        <h3>{question}</h3>
      </Question>
      <Answer>
        {currentAnswer}
      </Answer>
    </li>
  )
}  