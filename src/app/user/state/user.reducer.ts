import { UserState } from "./user.state";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserActions, UserActionTypes } from "./user.actions";

const initialState:UserState = {
  maskUserName: false,
  currentUser: null,
  error: ''
}

const getUserFeatureState = createFeatureSelector<UserState>('users')

export const getMaskUserName = createSelector(
  getUserFeatureState,
  state => state.maskUserName
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  state => state.currentUser
);

export const getCurrentUserName = createSelector(
  getUserFeatureState,
  getCurrentUser,
  (state, currentUser) => (currentUser == null) ? '' : currentUser.userName
);

export function reducer(state=initialState, action:UserActions):UserState {
  switch (action.type) {

    case UserActionTypes.MaskUserName:
      return {
        ...state,
        maskUserName: action.payload
      };

      case UserActionTypes.LoginUserSuccess:
        return {
          ...state,
          error: '',
          currentUser: action.payload
        }

      case UserActionTypes.LoginUserFailure:
        return {
          ...state,
          error: action.payload,
          currentUser: null
        }
      
      case UserActionTypes.LogoutUser:
        return {
          ...state,
          error: '',
          currentUser: null,
        }
        
    default:
      return state;
  }
}
