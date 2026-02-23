import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import { getLatestGames } from "../lib/freetoplaygames";
import { AnimatedGameCard } from "./GameCard";

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
