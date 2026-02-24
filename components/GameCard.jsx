import { Link } from "expo-router";
import { useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Pressable,
} from "react-native";

export function GameCard({ game }) {
  return (
    <Link href={`/${game.id}`} asChild>
      <Pressable>
        {({ pressed }) => (
          <View
            style={[
              styles.card,
              { backgroundColor: pressed ? "#333333" : "#1E1E1E" },
            ]}
          >
            <Image source={{ uri: game.image }} style={styles.image} />

            <Text style={styles.title}>{game.title}</Text>
            <Text style={styles.description}>{game.description}</Text>
            <Text style={styles.genre}>Genre: {game.genre}</Text>
            <Text style={styles.platform}>Platform: {game.platform}</Text>
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
      duration: 500,
      delay: index * 300,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={[{ opacity }]}>
      <GameCard game={game} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },

  image: {
    width: 320,
    height: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  genre: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#FFFFFF",
  },
  platform: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#FFFFFF",
  },
});
