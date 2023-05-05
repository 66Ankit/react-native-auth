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
      // return await axios.post('url',{email,password});
      return { data: { token: "ABC" } };
    } catch (error) {
      console.log(err);

      return { msg: err, error: true };
    }
  };

  const login = async (email, password) => {
    try {
      //   const response = await axios.post("url", { email, password });
      const response = { data: { token: "ABC" } };

      setAuthState({
        token: response.data.token,
        authenticated: true,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      await SecureStore.setItemAsync(TOKEN_KEY, response.data.token);
      return response;
    } catch (error) {
      console.log(err);
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
