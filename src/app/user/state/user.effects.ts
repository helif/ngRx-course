import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import * as userActions from "./user.actions";
import { AuthService } from "../auth.service";
import { mergeMap, map, catchError } from "rxjs/operators";
import { User } from "../user";
import { of } from "rxjs";

@Injectable()
export class UserEffects {
    constructor(private actions$:Actions, private userService:AuthService) {}

    @Effect()
    LoginUser = this.actions$.pipe(
        ofType(userActions.UserActionTypes.LoginUser),
        mergeMap((action:userActions.LoginUser) => this.userService.login(action.payload.userName, action.payload.password)
            .pipe(map((loggedInUser:User) => new userActions.LoginUserSuccess(loggedInUser)),
                catchError(err => of(new userActions.LoginUserFailure(err)))))
    );
}