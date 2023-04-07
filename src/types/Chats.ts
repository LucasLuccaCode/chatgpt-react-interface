import { IMessages, IMessagesModel } from "./Messages";

export interface ChatsItem {
  id: number;
  question: string;
  answer: string;
  stored?: boolean,
  isLoading?: boolean
}

export type setCurrentChatIdType = React.Dispatch<React.SetStateAction<number>>

export interface IChats {
  id: number;
  title: string;
}

export interface IChatsModel extends IChats {
  created_at: Date;
  user_id: number;
}

export interface IChatsWithMessages extends IChatsModel {
  messages: IMessagesModel[]
}

export interface ChatsContextTypes {
  chats: IChatsModel[],
  setChats: React.Dispatch<React.SetStateAction<IChatsModel[]>>,
  currentChat: IChatsWithMessages | null,
  setCurrentChat: React.Dispatch<React.SetStateAction<IChatsWithMessages | null>>,
  updateChats: (chat: IMessages) => void,
  setLoaderChat(question: string): void,
  removeChats(chatIds: number[]): void,
  updateTitle(newTitle: string): void
}