import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useSettings } from "../../contexts/settingsContext";

import { ChatContentItem, Answer, Question } from "./styles";

import { ChatCardProps } from "./ChatCard";

interface LastChatCardProps extends ChatCardProps {
  chatContainerRef: RefObject<HTMLUListElement>;
}

export const LastChatCard: React.FC<LastChatCardProps> = ({
  question,
  answer,
  chatContainerRef,
}) => {
  const [currentAnswer, setCurrentAnswer] = useState("");
  const { settings } = useSettings();

  const settingsRef = useRef(settings);
  const isMountedRef = useRef(true);

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  const writeResponse = useCallback(async () => {
    const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

    for (let index = 0; index < answer.length; index++) {
      if (!isMountedRef.current) break;

      const letter = answer[index];
      setCurrentAnswer((prevState) => prevState + letter);

      chatContainerRef.current!.scrollTop = chatContainerRef.current!.scrollHeight;

      console.log(settingsRef.current.speed);
      await sleep(settingsRef.current.speed);
    }
  }, [answer, chatContainerRef, setCurrentAnswer]);

  useEffect(() => {
    setCurrentAnswer("");
    writeResponse();
    return () => {
      isMountedRef.current = false;
    };
  }, [answer, writeResponse]);

  return (
    <ChatContentItem>
      <Question>
        <i className="bi bi-send-fill" />
        <h3>{question}</h3>
      </Question>
      <Answer>{currentAnswer}</Answer>
    </ChatContentItem>
  );
};
