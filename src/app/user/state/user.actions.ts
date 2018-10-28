import { Action } from "@ngrx/store";
import { User } from "../user";

export enum UserActionTypes {
    MaskUserName = "[User][Mask][UserName]",
    LoginUser = "[User][Login]",
    LoginUserSuccess = "[User][Login][Success]",
    LoginUserFailure = "[User][Login][Failure]",
    LogoutUser = "[User][Logout]",
}

export class MaskUserName implements Action {
    readonly type = UserActionTypes.MaskUserName;

    constructor(public payload:boolean) {
    }
}

export class LoginUser implements Action {
    readonly type = UserActionTypes.LoginUser;

    constructor(public payload:User){}
}

export class LoginUserSuccess implements Action {
    readonly type = UserActionTypes.LoginUserSuccess;

    constructor(public payload:User){}
}

export class LoginUserFailure implements Action {
    readonly type = UserActionTypes.LoginUserFailure;

    constructor(public payload:string){}
}

export class LogoutUser implements Action {
    readonly type = UserActionTypes.LogoutUser;
}

export type UserActions = MaskUserName 
    | LoginUser
    | LoginUserSuccess
    | LoginUserFailure
    | LogoutUser;