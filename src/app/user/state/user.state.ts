import { User } from "../user";

export interface UserState {
    currentUser: User;
    maskUserName: boolean;
    error: string;
}