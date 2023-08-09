import { createReducer, on } from '@ngrx/store';
import * as idTokenActions from '../actions/token.actions';
import { AuthState } from '../states/auth.state';

export const initialState: AuthState = {
    idToken: '',
    // ... other state properties
};
export const authReducer = createReducer(
  initialState,
  on(idTokenActions.setIdToken, (state, action) => {
    console.log(action.type);
    return {
      ...state,
      idToken: action.idToken,
    };
  })
);
