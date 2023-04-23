import { IPromptModel } from "./Prompts";

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserModel extends IUser {
  id: number;
  created_at: Date;
}

export interface IUserWithPrompts extends IUserModel {
  prompts: IPromptModel[]
}

export interface IProfileData {
  id: number;
  name: string;
  email: string;
  prompts: IPromptModel[]
}