import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Text, View, Animated, ActivityIndicator, Pressable } from "react-native";
import { useState, useEffect, useRef, useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Screen } from "../../components/Screen";
import { getGameDetails } from "../../lib/freetoplaygames";
import { createStyles } from "./[id].styles";
import { MetaItem } from "../../components/MetaItem";
import { useTheme } from "../../lib/theme";

const IMAGE_HEIGHT = 300;

export default function Detail() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTitle, setShowTitle] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const showTitleRef = useRef(false);
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const router = useRouter();

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

  useEffect(() => {
    const threshold = IMAGE_HEIGHT * 0.6;
    const listenerId = scrollY.addListener(({ value }) => {
      const nextShowTitle = value > threshold;
      if (showTitleRef.current !== nextShowTitle) {
        showTitleRef.current = nextShowTitle;
        setShowTitle(nextShowTitle);
      }
    });

    return () => {
      scrollY.removeListener(listenerId);
    };
  }, [scrollY]);

  if (loading)
    return (
      <Screen>
        <ActivityIndicator size="large" color={colors.accent} style={{ flex: 1 }} />
      </Screen>
    );

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: showTitle && game ? game.title : "",
          headerTitleStyle: { color: colors.headerText },
          headerLeft: showTitle ? () => null : undefined,
          headerTintColor: colors.headerText,
        }}
      />

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
          contentContainerStyle={{
            paddingTop: IMAGE_HEIGHT + insets.top - 50,
            paddingHorizontal: 16,
            paddingBottom: 40,
          }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
        >
          <View style={styles.card}>
            <Text style={styles.title}>{game.title}</Text>

            <View style={styles.metaRow}>
              <MetaItem label="Genre" value={game.genre} />
              <MetaItem label="Platform" value={game.platform} />
            </View>

            <View style={styles.metaRow}>
              <MetaItem label="Publisher" value={game.publisher} />
              <MetaItem label="Developer" value={game.developer} />
            </View>

            <View style={styles.metaRow}>
              <MetaItem label="Release Date" value={game.releaseDate} />
            </View>

            <MetaItem label="Description" value={game.description} />

            <Pressable
              onPress={() => router.push("/")}
              android_ripple={{ color: colors.cardPressed }}
              style={({ pressed }) => [
                styles.backButton,
                pressed && styles.backButtonPressed,
              ]}
            >
              <Text style={styles.backText}>Back Home</Text>
            </Pressable>
          </View>
        </Animated.ScrollView>
      </View>
    </Screen>
  );
}
