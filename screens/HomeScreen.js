import {
  View,
  SafeAreaView,
  Platform,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import tw from "tailwind-rn";

const dummyData = [
  {
    displayName: "Chanakyha",

    occupation: "Full Stack Developer",
    photoURL: "https://avatars.githubusercontent.com/u/66877639?v=4",
    age: 18,
  },
  {
    displayName: "Chanakyha",

    occupation: "Full Stack Developer",
    photoURL: "https://avatars.githubusercontent.com/u/66877639?v=4",
    age: 18,
  },
  {
    displayName: "Chanakyha",

    occupation: "Full Stack Developer",
    photoURL: "https://avatars.githubusercontent.com/u/66877639?v=4",
    age: 18,
  },
];

const HomeScreen = () => {
  const { logout, user } = useAuth();
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 50 : 0,
        flex: 1,
      }}
    >
      <View
        style={{
          alignItems: "center",
          marginHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onLongPress={logout}>
          <Image
            style={{ height: 50, width: 50, borderRadius: 50 }}
            source={{ uri: user?.photoURL }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={{ height: 50, width: 50 }}
            source={{
              uri: "https://www.tinderpressroom.com/image/flame-gradient-RGB_tn1100-category.png",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons size={30} name="chatbubbles-sharp" color="#FF5864" />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, margin: -6 }}>
        <Swiper
          stackSize={5}
          cardIndex={0}
          verticalSwipe={false}
          animateCardOpacity
          cards={dummyData}
          containerStyle={{ backgroundColor: "transparent" }}
          renderCard={(card, id) => (
            <View
              key={id}
              style={{
                position: "relative",
                height: "75%",
                borderRadius: 20,
              }}
            >
              <Image
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: 15,
                  position: "absolute",
                  top: 0,
                }}
                source={{ uri: card?.photoURL }}
              />
              <View
                style={{
                  position: "absolute",
                  width: "100%",
                  backgroundColor: "white",
                  flexDirection: "row",
                  bottom: 0,
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 20,
                  borderRadius: 15,
                  paddingVertical: 15,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,
                  elevation: 2,
                }}
              >
                <View>
                  <Text style={tw("text-xl font-bold")}>
                    {card.displayName}
                  </Text>
                  <Text>{card.occupation}</Text>
                </View>
                <Text style={tw("text-2xl")}>{card.age}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
