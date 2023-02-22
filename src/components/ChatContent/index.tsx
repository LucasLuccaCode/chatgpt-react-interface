import React, { useEffect, useRef } from "react";
import { useChats } from "../../contexts/chatsContext";
import { ChatContainer } from "./styles";
import { ChatCard } from "./ChatCard";
import { LastChatCard } from "./LastChatCard";

export const ChatContent: React.FC = () => {
  const chatContainerRef = useRef<HTMLUListElement>(null);
  const { currentChat } = useChats();

  useEffect(() => {
    chatContainerRef.current?.scrollTo(0, chatContainerRef.current.scrollHeight);
  }, [currentChat]);

  const formatAnswer = (answer: string) => {
    return answer.replace(/^.?\n\n/, "Chat GPT:\n\n");
  }

  const { data: chatData } = currentChat || { data: [] };
  const [lastChat, ...previousChats] = chatData.slice().reverse();

  return (
    <ChatContainer ref={chatContainerRef}>
      {!!previousChats.length && (
        previousChats.reverse().map(({ id, question, answer }) => (
          <ChatCard key={id} question={question} answer={formatAnswer(answer)} />
        ))
      )}

      {lastChat && (
        <LastChatCard
          key={lastChat.id}
          question={lastChat.question}
          answer={formatAnswer(lastChat.answer)}
          chatContainerRef={chatContainerRef}
          stored={!!lastChat.stored}
        />
      )}
    </ChatContainer>
  );
};