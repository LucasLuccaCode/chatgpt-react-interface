import React, { useEffect, useRef } from "react";
import { useChats } from "../../contexts/chatsContext";

import { ChatContainer } from "./styles";

import { ChatItem } from "./ChatItem";
import { LastChatItem } from "./ChatItem/LastChatItem";
import { PreTyping } from "./ChatItem/PreTyping";

export const ChatContent: React.FC = () => {
  const chatContainerRef = useRef<HTMLUListElement>(null);
  const { currentChat } = useChats();

  useEffect(() => {
    if (chatContainerRef.current) {
      setTimeout(() => {
        chatContainerRef.current!.scrollTop = chatContainerRef.current!.scrollHeight
      }, 0)
    }
  }, [currentChat]);

  const formatAnswer = (answer: string) => {
    return answer.trim();
  }

  const { data: chatData } = currentChat || { data: [] };
  const [lastChat, ...previousChats] = chatData.slice().reverse();

  return (
    <ChatContainer ref={chatContainerRef}>
      {!!previousChats.length && (
        previousChats.reverse().map(({ id, question, answer }) => (
          <ChatItem key={id} question={question} answer={formatAnswer(answer)} />
        ))
      )}

      {lastChat && !lastChat.isLoading ? (
        <LastChatItem
          key={lastChat.id}
          question={lastChat.question}
          answer={formatAnswer(lastChat.answer)}
          chatContainerRef={chatContainerRef}
          stored={!!lastChat.stored}
        />
      ) : (
        <PreTyping 
          key={lastChat.id}
          question={lastChat.question}
          chatContainerRef={chatContainerRef}
        />
      )}
    </ChatContainer>
  );
};