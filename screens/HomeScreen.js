import {
  View,
  SafeAreaView,
  Platform,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import tw from "tailwind-rn";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import generateId from "../lib/generateId";

const HomeScreen = () => {
  const { logout, user } = useAuth();
  const navigation = useNavigation();
  const swipeRef = useRef();

  const [profiles, setProfiles] = useState([]);

  useLayoutEffect(() => {
    const unsub = onSnapshot(doc(db, "users", user.uid), (snapshot) => {
      if (!snapshot.exists()) {
        navigation.navigate("Modal");
      }
    });

    return unsub;
  }, []);

  useEffect(() => {
    (async () => {
      let passes = await getDocs(
        collection(db, "users", user.uid, "passes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));
      const passedUserIds = passes.length > 0 ? passes : ["test"];

      let swipes = await getDocs(
        collection(db, "users", user.uid, "swipes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const swipedUserIds = swipes.length > 0 ? swipes : ["test"];

      const unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds, ...swipedUserIds])
        ),
        (snapshot) => {
          setProfiles(
            snapshot.docs
              .filter((doc) => doc.id !== user.uid)
              .map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        }
      );
    })();
  }, [db]);

  const swipeLeft = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    console.log(`You Passed on ${userSwiped.displayName}`);

    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  };
  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;
    const userSwiped = profiles[cardIndex];

    const loggedInProfile = await (
      await getDocs(doc(db, "users", user.uid))
    ).data();

    getDocs(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
      (snapshot) => {
        if (snapshot.exists()) {
          console.log(`Hooray you matched with ${userSwiped.displayName}`);

          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );

          setDoc(
            doc(db, "matches", generateId(user.uid, userSwiped.displayName), {
              users: {
                [user.uid]: loggedInProfile,
                [userSwiped.id]: userSwiped,
              },
              usersMatched: [user.uid, userSwiped.id],
              timestamp: serverTimestamp(),
            })
          );
          navigation.navigate("Match", {
            loggedInProfile,
            userSwiped,
          });
        } else {
          console.log(`You Swiped on ${userSwiped.displayName}`);
          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );
        }
      }
    );
  };

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
        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
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
          onSwipedLeft={(cardIndex) => {
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            swipeRight(cardIndex);
          }}
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
          cards={profiles}
          containerStyle={{ backgroundColor: "transparent" }}
          renderCard={(card, id) =>
            card ? (
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
                      {card?.displayName}
                    </Text>
                    <Text>{card?.job}</Text>
                  </View>
                  <Text style={tw("text-2xl")}>{card.age}</Text>
                </View>
              </View>
            ) : (
              <View
                style={[
                  tw("relative bg-white justify-center items-center"),
                  { height: "75%", borderRadius: 15 },
                ]}
              >
                <Text style={tw("pb-5 font-bold")}>No more Profiles</Text>
                <Image
                  style={[tw("h-20 w-full"), { height: 100, width: 100 }]}
                  source={{ uri: "https://links.papareact.com/6gb" }}
                />
              </View>
            )
          }
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
