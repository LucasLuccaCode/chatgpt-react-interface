export interface IPrompt {
  content: string;
  user_id: number;
  privacy: "PUBLIC" | "PRIVATE";
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

export interface IPromptWithReactions extends IPromptWithAuthor {
  likesCount: number;
  userLiked: boolean;
}