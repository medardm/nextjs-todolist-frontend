import {useEffect, useState} from 'react';
import { fetchData } from "@/utils/api";
import useAuthStore from "@/stores/useAuthStore";
import {AuthUser} from "@/types";

export const useAuth = () => {
  const {
    loginStart,
    loginSuccess,
    loginFailure,
    user
  } = useAuthStore();

  const [username, setUsername] = useState("medardmtest");
  const [password, setPassword] = useState("@password@");

  const login = async () => {
    loginStart();

    try {
      const userData = await fetchData<AuthUser>('login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
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
    username,
    password,
    setUsername,
    setPassword,
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
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem('userData');

    if (loggedInUser) {
      const authUser = JSON.parse(loggedInUser);
      validateToken()
        .then(data => {
          if (data.token_is_valid) {
            loginSuccess(authUser);
            console.log('logged in user fetched');
          } else {
            logout().then();
          }
        })
        .catch(err => console.error(err));
    }
  }, []);

  return {
    user,
    logout
  }
}
