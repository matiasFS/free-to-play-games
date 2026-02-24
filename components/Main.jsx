import { FlatList, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { getLatestGames } from "../lib/freetoplaygames";
import { AnimatedGameCard } from "./GameCard";
import { Stack } from "expo-router";
import Screen from "./Screen";

export function Main() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getLatestGames().then((games) => {
      setGames(games);
    });
  }, []);

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerTintColor: "white",
        }}
      />
      {games.length === 0 ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <FlatList
          data={games}
          keyExtractor={(game) => game.id.toString()}
          renderItem={({ item, index }) => (
            <AnimatedGameCard game={item} index={index} />
          )}
        />
      )}
    </Screen>
  );
}
