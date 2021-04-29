import { RouterStore } from "mobx-react-router";

export interface IRootStore {
  userStore: IUserStore,
  routing: RouterStore
}
export interface IUserStore {
  name: string;
  create: CreateUser;
  onCreateInput: Function;
  onSubmit: Function;
  canSubmit: boolean;
  terms: boolean
  user: ActiveUser
}

export interface CreateUser {
  [key: string]: UserInput,
}

export interface UserInput {
  error: boolean | string,
  input: string,
}

export interface ActiveUser {
  name: string,
  access: boolean
}