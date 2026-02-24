import { Link } from "expo-router";
import { useRef, useEffect, useMemo } from "react";
import { View, Text, Image, Animated, Pressable } from "react-native";

import { createStyles } from "./GameCard.styles";
import { useTheme } from "../lib/theme";

export function GameCard({ game }) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <Link href={`/${game.id}`} asChild>
      <Pressable>
        {({ pressed }) => (
          <View
            style={[
              styles.card,
              pressed ? styles.cardPressed : styles.cardDefault,
            ]}
          >
            <Image source={{ uri: game.image }} style={styles.image} />

            <Text style={styles.title}>{game.title}</Text>
            <Text style={styles.description} numberOfLines={2}>
              {game.description}
            </Text>

            <Text style={styles.meta}>Genre: {game.genre}</Text>
            <Text style={styles.meta}>Platform: {game.platform}</Text>
          </View>
        )}
      </Pressable>
    </Link>
  );
}

export function AnimatedGameCard({ game, index }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 400,
      delay: index * 120,
      useNativeDriver: true,
    }).start();
  }, [index]);

  return (
    <Animated.View style={{ opacity }}>
      <GameCard game={game} />
    </Animated.View>
  );
}
