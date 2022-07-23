import { View, Text } from "react-native";
import React from "react";
import tw from "tailwind-rn";

const HomeScreen = () => {
  return (
    <View style={tw("flex")}>
      <Text style={tw("text-red-500")}>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
