import { Link, Stack, useLocalSearchParams } from "expo-router";
import {
  Text,
  View,
  Animated,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import Screen from "../components/Screen";
import { getGameDetails } from "../lib/freetoplaygames";

const IMAGE_HEIGHT = 280;

export default function Detail() {
  const { id } = useLocalSearchParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
    const scrollY = useRef(new Animated.Value(0)).current;
    
  useEffect(() => {
    if (id) {
      getGameDetails(id).then((game) => {
        setGame(game);
        setLoading(false);
      });
    }
  }, [id]);


  const imageOpacity = scrollY.interpolate({
    inputRange: [0, IMAGE_HEIGHT * 0.8],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const imageTranslate = scrollY.interpolate({
    inputRange: [0, IMAGE_HEIGHT],
    outputRange: [0, -60],
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [IMAGE_HEIGHT * 0.6, IMAGE_HEIGHT],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: () => (
            <Animated.Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "600",
                opacity: headerOpacity,
              }}
            >
              {game?.title}
            </Animated.Text>
          ),
          headerTintColor: "white",
          
          
        }}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#ffffff"
          style={{ marginTop: 40 }}
        />
      ) : (
        <View style={{ flex: 1 }}>
          
          <Animated.Image
            source={{ uri: game.image }}
            resizeMode="contain" 
            style={[
            styles.image,
            {
            opacity: imageOpacity,
            transform: [{ translateY: imageTranslate }],
            },
            ]}
          />
          <Animated.ScrollView
            contentContainerStyle={{ paddingTop: IMAGE_HEIGHT  }}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
          >
            <View style={styles.card}>
              <Text style={styles.title}>{game.title}</Text>

              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Text style={styles.label}>Genre</Text>
                  <Text style={styles.value}>{game.genre}</Text>
                </View>

                <View style={styles.metaItem}>
                  <Text style={styles.label}>Platform</Text>
                  <Text style={styles.value}>{game.platform}</Text>
                </View>
              </View>

              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Text style={styles.label}>Publisher</Text>
                  <Text style={styles.value}>{game.publisher}</Text>
                </View>

                <View style={styles.metaItem}>
                  <Text style={styles.label}>Developer</Text>
                  <Text style={styles.value}>{game.developer}</Text>
                </View>
              </View>

              <Text style={styles.label}>Release Date</Text>
              <Text style={styles.value}>{game.releaseDate}</Text>

              <Text style={[styles.label, { marginTop: 24 }]}>
                Description
              </Text>
              <Text style={styles.description}>{game.description}</Text>

              <Link href="/" asChild>
                <Pressable style={styles.backButton}>
                  <Text style={styles.backText}>Back Home</Text>
                </Pressable>
              </Link>
            </View>
          </Animated.ScrollView>
        </View>
      )}
    </Screen>
  );
}

const styles = {
  image: {
    position: "absolute",
    width: "100%",
    height: IMAGE_HEIGHT,
  },

  card: {
    backgroundColor: "#111111",
    padding: 22,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 24,
  },

  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  metaItem: {
    flex: 1,
  },

  label: {
    fontSize: 11,
    color: "#777777",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 6,
  },

  value: {
    fontSize: 15,
    color: "#FFFFFF",
  },

  description: {
    fontSize: 15,
    color: "#DDDDDD",
    lineHeight: 24,
  },

  backButton: {
    marginTop: 35,
    backgroundColor: "#391a68",
    paddingVertical: 14,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  backText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
};