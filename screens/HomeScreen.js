import { View, Text, Button } from "react-native";
import React from "react";
import tw from "tailwind-rn";
import useAuth from "../hooks/useAuth";

const HomeScreen = () => {
  const { logout } = useAuth();

  return (
    <View style={tw("flex")}>
      <Text style={tw("text-red-500")}>HomeScreen</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default HomeScreen;
