import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "jwt_key";
const API_URL = "";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);

      if (token) {
        setAuthState({
          token: token,
          authenticated: true,
        });

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    };

    loadToken();
  }, []);

  const register = async (email, password) => {
    try {
      //   console.log(email, password);
      return await axios.post("http://localhost:8761/auth/register", {
        email,
        password,
      });
    } catch (err) {
      //   console.log(error);

      return { msg: err, error: true };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8761/auth/token", {
        email,
        password,
      });

      setAuthState({
        token: response.data,
        authenticated: true,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data}`;
      //   console.log(response.data);
      await SecureStore.setItemAsync(TOKEN_KEY, response.data);
      return response;
    } catch (err) {
      //   console.log(err);
      return { msg: err, error: true };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({ token: null, authenticated: null });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onSignOut: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
