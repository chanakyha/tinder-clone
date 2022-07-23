import { View, Text, Button } from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";

const LoginScreen = () => {
  const { signinWithGoogle } = useAuth();

  return (
    <View>
      <Text>Login Screen</Text>
      <Button title="Login" onPress={signinWithGoogle} />
    </View>
  );
};

export default LoginScreen;
