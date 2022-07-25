import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import getMactchedUserInfo from "../lib/getMatchedUserInfo";
import useAuth from "../hooks/useAuth";
import { useRoute } from "@react-navigation/native";
import tw from "tailwind-rn";

const MessageScreen = () => {
  const { user } = useAuth();
  const { params } = useRoute();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {};

  const { matchDetails } = params;
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 50 : 0,
        paddingBottom: Platform.OS === "android" ? 20 : 0,
        flex: 1,
      }}
    >
      <Header
        callEnabled
        title={getMactchedUserInfo(matchDetails?.users, user.uid).displayName}
      />

      <KeyboardAvoidingView
        keyboardVerticalOffset={10}
        style={tw("flex-1")}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            style={tw("pl-4")}
            keyExtractor={(item) => item.id}
            renderItem={(item) => {
              messages.userId === user.uid ? (
                <SenderMessage key={messages.id} message={message} />
              ) : (
                <ReceiverMessage key={messages.id} message={message} />
              );
            }}
          />
        </TouchableWithoutFeedback>
        <View
          style={[
            { borderColor: "rgb(229,231,235)" },
            tw("flex-row justify-between border-t items-center px-5 py-2"),
          ]}
        >
          <TextInput
            style={tw("h-10 text-lg")}
            placeholder="Send Message"
            onSubmitEditing={sendMessage}
            value={input}
            onChangeText={setInput}
          />
          <Button title="Send" onPress={sendMessage} color="#FF5864" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessageScreen;

const SenderMessage = ({ message }) => (
  <View
    style={[
      tw("bg-purple-600 rounded-lg rounded-tr-none px-5 py-3 mx-3 my-2"),
      {
        alignSelf: "flex-start",
        marginLeft: "auto",
      },
    ]}
  >
    <Text>{message.message}</Text>
  </View>
);

const ReceiverMessage = ({ message }) => (
  <View
    style={[
      tw("bg-purple-600 rounded-lg rounded-tr-none px-5 py-3 mx-3 my-2"),
      {
        alignSelf: "flex-end",
        marginRight: "auto",
      },
    ]}
  >
    {message.message}
  </View>
);
