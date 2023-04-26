export interface ILike {
  user_id: number;
  prompt_id: number;
}

export interface ILikeModel extends ILike {
  created_at: Date;
}