import {useEffect, useRef, useState} from 'react';
import { fetchData } from "@/utils/api";
import useAuthStore from "@/stores/useAuthStore";
import {AuthUser} from "@/types";
import {config} from "@/config";

export const useAuth = () => {
  const {
    loginStart,
    loginSuccess,
    loginFailure,
    user
  } = useAuthStore();

  const login = async (username: string, password: string, remember_me: boolean) => {
    loginStart();

    try {
      const userData = await fetchData<AuthUser>('login', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
          remember_me
        }),
        credentials: 'include'
      });

      delete userData.token;
      localStorage.setItem('userData', JSON.stringify(userData));
      loginSuccess(userData);
    } catch (err: any) {
      loginFailure(err.message);
    }
  };

  const logout = async () => {
    try {
      await fetchData('logout', {
        method: 'POST',
      });

      localStorage.removeItem('userData');
      loginSuccess(null);
    } catch (err: any) {
      console.error(err.message)
    }
  };

  return {
    user,
    login,
    logout
  };
};


export const useAuthUser = () => {
  const { user, loginSuccess } = useAuthStore();
  const { logout } = useAuth();

  const validateToken = async () => {
    return fetchData<{message: string, token_is_valid: boolean}>('token/validate', {
      method: 'POST',
    });
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem('userData');
    console.log(loggedInUser);
    if (loggedInUser) {
      const authUser = JSON.parse(loggedInUser);
      validateToken()
        .then(data => {
          if (data.token_is_valid) {
            loginSuccess(authUser);
            console.log('logged in user fetched');
          } else {

          }
        })
        .catch(err => logout().then());
    }
  }, []);

  return {
    user,
    logout
  }
}
