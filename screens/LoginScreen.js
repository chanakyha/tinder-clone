import {
  View,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-rn";

const LoginScreen = () => {
  const { signinWithGoogle, loading } = useAuth();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={tw("flex-1")}>
      <ImageBackground
        resizeMode="cover"
        style={tw("flex-1")}
        source={{ uri: "https://tinder.com/static/tinder.png" }}
      >
        <TouchableOpacity
          onPress={signinWithGoogle}
          style={{
            marginHorizontal: "25%",
            position: "absolute",
            bottom: "25%",
            borderRadius: 15,
            padding: "4%",
            backgroundColor: "white",
          }}
        >
          <Text style={tw("text-center font-semibold")}>
            {loading ? "Loading..." : "Sign In & get swipping"}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
