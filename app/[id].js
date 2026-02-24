import { Link, Stack, useLocalSearchParams } from "expo-router";
import { Text, View, Animated, ActivityIndicator, Pressable, StyleSheet } from "react-native";
import { useState, useEffect, useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Screen } from "../components/Screen";
import { getGameDetails } from "../lib/freetoplaygames";

const IMAGE_HEIGHT = 300; // Increased height to prevent tight cropping

export default function Detail() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (id) {
      getGameDetails(id).then((data) => {
        setGame(data);
        setLoading(false);
      });
    }
  }, [id]);

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, IMAGE_HEIGHT],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  if (loading) return <Screen><ActivityIndicator size="large" color="#fff" style={{flex:1}}/></Screen>;

  return (
    <Screen>
      <Stack.Screen options={{ headerTransparent: true, headerTitle: "", headerTintColor: "white" }} />
      
      <View style={{ flex: 1 }}>
        <Animated.Image
          source={{ uri: game.image }}
          resizeMode="contain" 
          style={[
            styles.image,
            {
              height: IMAGE_HEIGHT + insets.top,
              opacity: imageOpacity,
            },
          ]}
        />

        <Animated.ScrollView
          // Floating effect: paddingHorizontal creates the side margins
          contentContainerStyle={{ 
            paddingTop: IMAGE_HEIGHT + insets.top - 50, 
            paddingHorizontal: 16, 
            paddingBottom: 40 
          }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
        >
          <View style={styles.card}>
            <Text style={styles.title}>{game.title}</Text>
            
            {/* ROW 1: Genre & Platform */}
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

            {/* ROW 2: Publisher & Developer */}
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

            {/* ROW 3: Release Date */}
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Text style={styles.label}>Release Date</Text>
                <Text style={styles.value}>{game.releaseDate}</Text>
              </View>
            </View>

            <Text style={[styles.label, { marginTop: 10 }]}>Description</Text>
            <Text style={styles.description}>{game.description}</Text>

            <Link href="/" asChild>
              <Pressable style={styles.backButton}>
                <Text style={styles.backText}>Back Home</Text>
              </Pressable>
            </Link>
          </View>
        </Animated.ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
  },
  card: {
    backgroundColor: "#111111",
    padding: 24,
    borderRadius: 24,
    // Add border to make the floating card stand out more on black background
    borderWidth: 1,
    borderColor: "#222",
  },
  title: { 
    fontSize: 28, 
    fontWeight: "bold", 
    color: "#fff", 
    marginBottom: 24 
  },
  metaRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginBottom: 20,
    gap: 12
  },
  metaItem: { 
    flex: 1,
    backgroundColor: "#1A1A1A",
    padding: 12,
    borderRadius: 12
  },
  label: { 
    color: "#777", 
    fontSize: 10, 
    textTransform: "uppercase", 
    letterSpacing: 1,
    marginBottom: 4 
  },
  value: { 
    color: "#fff", 
    fontSize: 14, 
    fontWeight: "600" 
  },
  description: { 
    color: "#CCC", 
    lineHeight: 24, 
    fontSize: 15 
  },
  backButton: { 
    backgroundColor: "#391a68", 
    padding: 16, 
    borderRadius: 12, 
    marginTop: 35 
  },
  backText: { 
    color: "#fff", 
    textAlign: "center", 
    fontWeight: "bold", 
    fontSize: 16 
  }
});