export interface IPrompt {
  content: string;
  user_id: number;
}

export interface IPromptModel extends IPrompt {
  id: number;
  created_at: Date;
}

export interface IPromptWithAuthor extends IPromptModel {
  author: {
    name: string;
  };
}