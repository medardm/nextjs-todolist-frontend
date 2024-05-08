import {useReducer, useState} from 'react';
import {authInitialState, authReducer} from "@/reducers/authReducer";
import {fetchData} from "@/utils/api";
import {AuthUser} from "@/types";

export const useAuth = () => {
  const [authUserState, dispatchAuth] = useReducer(authReducer, authInitialState);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    dispatchAuth({
      type: 'LOGIN_START',
      payload: undefined
    });

    try {
      const userData = await fetchData<AuthUser>('api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the content type to 'application/json'
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      });

      delete userData.token
      localStorage.setItem('userData', JSON.stringify(userData))

      dispatchAuth({ type: 'LOGIN_SUCCESS', payload: userData });
    } catch (err: any) {
      dispatchAuth({ type: 'LOGIN_FAILURE', payload: err.message });
    }
  };

  const logout = async() => {
    try {
      await fetchData('api/logout', {
        method: 'POST',
      });

      dispatchAuth({ type: 'LOGIN_SUCCESS', payload: null });
    } catch (err: any) {
      console.error(err.message)
    }
  };

  return {
    authUserState,
    username,
    password,
    setUsername,
    setPassword,
    login,
    logout
  };
};
