export interface ChatsItem {
  id: number;
  question: string;
  answer: string;
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
  currentChat: CurrentChatsType,
  currentChatId: number,
  setCurrentChatId: setCurrentChatIdType,
  updateChats: (chat: QuestionAnswerType) => void
}