import { FlatList, ActivityIndicator, View } from "react-native";
import { useEffect, useState } from "react";
import { getLatestGames } from "../lib/freetoplaygames";
import { AnimatedGameCard } from "./GameCard";
import { Stack } from "expo-router";
import { Screen } from "./Screen"; // Use Named Import
import { styles } from "./Main.styles";
import { useTheme } from "../lib/theme";
export function Main() {
  const [games, setGames] = useState([]);
  const { colors } = useTheme();

  useEffect(() => {
    getLatestGames().then(setGames);
  }, []);

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "Latest Games", // Added a title
          headerTintColor: colors.headerText,
        }}
      />
      {games.length === 0 ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.accent} />
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
