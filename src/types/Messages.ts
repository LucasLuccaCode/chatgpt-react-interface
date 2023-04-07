export interface IMessages {
  question: string;
  answer: string;
}

export interface IMessagesModel extends IMessages {
  id: number;
  chat_id: number;
  created_at: Date;
}