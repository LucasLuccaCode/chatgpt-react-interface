export interface ChatsItem {
  id: number;
  question: string;
  answer: string;
  stored?: boolean, 
  isLoading?: boolean 
}

export interface ChatsInfo {
  id: number;
  title: string;
  data: ChatsItem[];
}

export type CurrentChatsType = ChatsInfo | null
export type setCurrentChatIdType = React.Dispatch<React.SetStateAction<number>>

export interface QuestionAnswerType { 
  question: string, 
  answer: string 
}

export interface ChatsContextTypes {
  chats: ChatsInfo[],
  setChats: React.Dispatch<React.SetStateAction<ChatsInfo[]>>,
  currentChat: CurrentChatsType,
  currentChatId: number,
  setCurrentChatId: setCurrentChatIdType,
  updateChats: (chat: QuestionAnswerType) => void,
  setLoaderChat(question: string): void,
  removeChats(chatIds: number[]): void
}