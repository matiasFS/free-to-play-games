import { Stack } from "expo-router";
import { Link } from "expo-router";
import { Pressable, Text } from "react-native";
import { InfoIcon } from "../components/Icons";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerLeft: () => (
          <Link asChild href="/">
            <Pressable
              style={{
                padding: 10,
                borderRadius: 20,
              }}
            >
              {({ pressed }) => (
                <Text
                  style={{
                    color: pressed ? "#4b4949" : "white",
                    fontSize: 18,
                  }}
                >
                  Free Games
                </Text>
              )}
            </Pressable>
          </Link>
        ),

        headerRight: () => (
          <Link asChild href="/about">
            <Pressable
              style={{
                padding: 10,
                borderRadius: 20,
              }}
            >
              {({ pressed }) => (
                <InfoIcon
                  color={pressed ? "#4b4949" : "white"}
                  size={25}
                />
              )}
            </Pressable>
          </Link>
        ),

        headerStyle: { backgroundColor: "#000000" },
        headerTitle: "",
      }}
    />
  );
}