import React, { useEffect, useRef } from "react";
import {
  LoaderFunctionArgs,
  useLoaderData,
  useParams
} from "react-router-dom";
import axios from "../../services/axios";

import { ChatContainer } from "./styles";

import { useChats } from "../../contexts/chatsContext";
import { ChatMessage } from "./ChatMessage";

import { IChatsWithMessages } from "../../types/Chats";

interface ILoaderData {
  chat: IChatsWithMessages | null
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  try {
    const { userId, chatId } = params

    const { data } = await axios.get(`/users/${userId}/chats/${chatId}`)

    return { chat: data }
  } catch (error) {
    console.log(error)
    return { chat: null }
  }
}

const ChatContent: React.FC = () => {
  const chatContainerRef = useRef<HTMLUListElement>(null);
  const { currentChat, setCurrentChat } = useChats();
  const { chatId } = useParams()
  const { chat } = useLoaderData() as ILoaderData;

  useEffect(() => {
    if (chatContainerRef.current) {
      setTimeout(() => {
        chatContainerRef.current!.scrollTop = chatContainerRef.current!.scrollHeight
      }, 0)
    }

    setCurrentChat(chat)
  }, [chatId]);

  const formatAnswer = (answer: string) => {
    return answer.trim();
  }

  const messages = currentChat?.messages
  // const [lastChat, ...previousChats] = messages?.slice().reverse() || []

  return (
    <ChatContainer ref={chatContainerRef}>
      {messages?.map(({ id, question, answer }) => (
        <ChatMessage key={id} question={question} answer={formatAnswer(answer)} />
      ))
      }
    </ChatContainer>
  );
};

export default ChatContent