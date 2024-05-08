import {AuthState} from "@/types";

export const authInitialState: AuthState = {
  loading: false,
  user: null,
  error: null,
};

export function authReducer(state: any, action: { type: any; payload: any; }) {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };

    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, user: action.payload, error: null };

    case 'LOGIN_FAILURE':
      return { ...state, loading: false, user: null, error: action.payload };

    default:
      return state;
  }
}
