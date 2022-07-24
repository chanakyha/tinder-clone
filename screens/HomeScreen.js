import {
  View,
  SafeAreaView,
  Platform,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useRef } from "react";
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
  const swipeRef = useRef();

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
          ref={swipeRef}
          stackSize={5}
          cardIndex={0}
          verticalSwipe={false}
          onSwipedLeft={() => console.log("Swipe Pass")}
          onSwipedRight={() => console.log("Swipe Match")}
          backgroundColor="#4FD0E9"
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  textAlign: "left",
                  color: "#4DED30",
                },
              },
            },
          }}
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
                  backgroundColor: "white,",
                  flexDirection: "row",
                  backgroundColor: "white",
                  bottom: 0,
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 20,
                  borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15,
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

        <View
          style={[
            { bottom: Platform.OS === "android" ? 35 : 10 },
            tw("absolute flex-row items-center justify-evenly right-0 left-0"),
          ]}
        >
          <TouchableOpacity
            onPress={() => swipeRef.current.swipeLeft()}
            style={tw(
              "items-center justify-center rounded-full w-16 h-16 bg-red-200"
            )}
          >
            <Entypo name="cross" size={30} color="red" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => swipeRef.current.swipeRight()}
            style={tw(
              "items-center justify-center rounded-full w-16 h-16 bg-green-200"
            )}
          >
            <AntDesign name="heart" size={30} color="green" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
