import { FlatList, ActivityIndicator, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { getLatestGames } from "../lib/freetoplaygames";
import { AnimatedGameCard } from "./GameCard";
import { Stack } from "expo-router";
import { Screen } from "./Screen"; // Use Named Import

export function Main() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getLatestGames().then(setGames);
  }, []);

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "Latest Games", // Added a title
          headerTintColor: "white",
        }}
      />
      {games.length === 0 ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : (
        <FlatList
          data={games}
          keyExtractor={(game) => game.id.toString()}
          // This padding ensures the first card isn't hidden under the transparent header
          contentContainerStyle={styles.listContent}
          renderItem={({ item, index }) => (
            <AnimatedGameCard game={item} index={index} />
          )}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  listContent: { paddingHorizontal: 16, paddingTop: 60, paddingBottom: 20 },
});
