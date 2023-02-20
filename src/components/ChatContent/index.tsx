import React, { useEffect, useRef } from "react";
import { useChats } from "../../contexts/chatsContext";

import { Main, ChatContainer, Placeholder } from "./styles";

import { ChatCard } from "./ChatCard";
import { LastChatCard } from "./LastChatCard";

export const ChatContent: React.FC = () => {
  const chatContainerRef = useRef<HTMLUListElement>(null);
  const { currentChat } = useChats();

  useEffect(() => {
    chatContainerRef.current!.scrollTop = chatContainerRef.current!.scrollHeight;
  }, [currentChat])

  const initial = currentChat?.data.slice() || []
  const lastContentWasStored = initial[initial.length - 1]?.storage
  const chatContent = lastContentWasStored ? initial : initial.slice(0, -1)
  const [lastChat] = !lastContentWasStored ? initial.slice(-1) : [];

  return (
    <Main>
      <ChatContainer ref={chatContainerRef}>
        {!!currentChat?.data.length ? (
          chatContent.map(({ id, question, answer }) => (
            <ChatCard
              key={id}
              question={question}
              answer={answer}
            />
          ))
        ) : (
          <Placeholder>
            O conteúdo do chat selecionado aparecerá aqui...
          </Placeholder>
        )}

        {lastChat && (
          <LastChatCard
            question={lastChat.question}
            answer={lastChat.answer}
            chatContainerRef={chatContainerRef}
          />
        )}
      </ChatContainer>
    </Main>
  );
};
