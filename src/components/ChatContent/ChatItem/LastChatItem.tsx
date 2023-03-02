import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useSettings } from "../../../contexts/settingsContext";
import { useApi } from "../../../contexts/apiContext";

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

import { CopyButton } from "../../CopyButton";

import { ChatItemProps } from "./index";

interface LastChatItemProps extends ChatItemProps {
  chatContainerRef: RefObject<HTMLUListElement>,
  stored: boolean
}

export const LastChatItem: React.FC<LastChatItemProps> = ({
  question,
  answer,
  chatContainerRef,
  stored
}) => {
  const [currentAnswer, setCurrentAnswer] = useState("");
  const { settings } = useSettings();
  const { setApiMessage } = useApi()

  const settingsRef = useRef(settings);
  const isMountedRef = useRef(true);

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  useEffect(() => {
    setCurrentAnswer("");

    if (!stored) {
      writeResponse();
    } else {
      setCurrentAnswer(answer)
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [answer]);

  const writeResponse = useCallback(async () => {
    const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

    for (let index = 0; index < answer.length; index++) {
      if (!isMountedRef.current) break;

      const letter = answer[index];
      setCurrentAnswer((prevState) => prevState + letter);
      setApiMessage({
        message: `Gerando resposta [ ${index + 1} / ${answer.length}  ] ${Math.floor((index + 1) / answer.length * 100)}%`,
        type: 'info'
      })

      chatContainerRef.current!.scrollTop = chatContainerRef.current!.scrollHeight;

      // console.log(settingsRef.current.speed);
      await sleep(settingsRef.current.speed);
    }

    chatContainerRef.current!.scrollTop = chatContainerRef.current!.scrollHeight;

    setApiMessage({
      message: `Concluído [ ${answer.length} / ${answer.length}  ] 100%`,
      type: 'success'
    })
  }, [answer, chatContainerRef]);

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
          {currentAnswer}
        </Output>
      </Answer>
    </ChatContentItem>
  );
};
