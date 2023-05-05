import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useAuth } from "../components/context/AuthContext";
import { useState } from "react";

// onRegister: register,
//   onLogin: login,
//   onSignOut: logout,
//   authState,

const Login = () => {
  const { onLogin, onRegister } = useAuth();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginHandler = async () => {
    const result = await onLogin(email, password);

    if (result && result.error) {
      alert(result.msg);
    }
  };

  const registerHandler = async () => {
    const result = await onRegister(email, password);

    if (result && result.error) {
      alert(result.msg);
    } else {
      loginHandler();
    }
  };

  return (
    <View style={styles.loginContainer}>
      <TextInput
        style={styles.textInputBox}
        onChangeText={(text) => setEmail(text)}
        placeholder="email"
        value={email}
      />
      <TextInput
        style={styles.textInputBox}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
        placeholder="password"
        value={password}
      />
      <Button onPress={loginHandler} title="Login" />
      <Button onPress={registerHandler} title="Register" />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  textInputBox: {
    width: 200,
    height: 40,
    backgroundColor: "white",
    marginVertical: 5,
    paddingHorizontal: 10,
  },

  loginContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
