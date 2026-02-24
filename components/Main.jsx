import {
  FlatList,
  ActivityIndicator,
  View,
  Text,
  Pressable,
  Modal,
  ScrollView,
} from "react-native";
import { DeviceEventEmitter } from "react-native";
import { useEffect, useMemo, useRef, useState } from "react";
import { getLatestGames } from "../lib/freetoplaygames";
import { AnimatedGameCard } from "./GameCard";
import { Stack } from "expo-router";
import { Screen } from "./Screen"; // Use Named Import
import { createStyles } from "./Main.styles";
import { useTheme } from "../lib/theme";
export function Main() {
  const [games, setGames] = useState([]);
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const listRef = useRef(null);

  useEffect(() => {
    getLatestGames().then(setGames);
  }, []);

  useEffect(() => {
    const sub = DeviceEventEmitter.addListener("scrollToTop", () => {
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    });

    return () => {
      sub.remove();
    };
  }, []);

  const genres = useMemo(() => {
    const unique = new Set();
    games.forEach((game) => {
      if (game.genre) unique.add(game.genre);
    });
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [games]);

  const filteredGames = useMemo(() => {
    if (selectedGenres.length === 0) return games;
    const selected = new Set(selectedGenres);
    return games.filter((game) => selected.has(game.genre));
  }, [games, selectedGenres]);

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) => {
      if (genre === "__ALL__") return [];
      if (prev.includes(genre)) return prev.filter((item) => item !== genre);
      return [...prev, genre];
    });
  };

  const filterLabel =
    selectedGenres.length === 0
      ? "All genres"
      : selectedGenres.length === 1
        ? selectedGenres[0]
        : `${selectedGenres.length} genres`;

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
          key={colors.background}
          ref={listRef}
          data={filteredGames}
          keyExtractor={(game) => game.id.toString()}
          style={styles.list}
          removeClippedSubviews={false}
          // This padding ensures the first card isn't hidden under the transparent header
          contentContainerStyle={styles.listContent}
          ListHeaderComponentStyle={styles.listHeader}
          ListHeaderComponent={
            <View style={styles.filterBar}>
              <Pressable
                onPress={() => setFilterOpen(true)}
                android_ripple={{ color: colors.cardPressed }}
                style={({ pressed }) => [
                  styles.filterButton,
                  pressed && { backgroundColor: colors.cardPressed },
                ]}
              >
                <Text style={styles.filterButtonText}>Genre</Text>
                <Text style={styles.filterButtonText}>{filterLabel}</Text>
              </Pressable>
              <Text style={styles.filterHint}>Tap to filter by genre</Text>
            </View>
          }
          renderItem={({ item, index }) => (
            <AnimatedGameCard game={item} index={index} />
          )}
          ListFooterComponent={<View style={styles.listFooter} />}
        />
      )}

      <Modal visible={filterOpen} transparent animationType="fade">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setFilterOpen(false)}
        >
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <Text style={styles.modalTitle}>Filter genres</Text>
            <ScrollView>
              <Pressable
                onPress={() => toggleGenre("__ALL__")}
                style={[
                  styles.option,
                  selectedGenres.length === 0 && styles.optionSelected,
                ]}
              >
                <Text style={styles.optionText}>All genres</Text>
                <Text style={styles.optionTextMuted}>Clear selection</Text>
              </Pressable>
              {genres.map((genre) => {
                const isSelected = selectedGenres.includes(genre);
                return (
                  <Pressable
                    key={genre}
                    onPress={() => toggleGenre(genre)}
                    style={[styles.option, isSelected && styles.optionSelected]}
                  >
                    <Text style={styles.optionText}>{genre}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>
            <View style={styles.modalFooter}>
              <Pressable
                onPress={() => setFilterOpen(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Done</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </Screen>
  );
}
