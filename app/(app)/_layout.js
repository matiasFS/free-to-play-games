import { Stack, Link } from "expo-router";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { MoonIcon, SunIcon } from "../../components/Icons";
import { BottomNav } from "../../components/BottomNav";
import { useTheme } from "../../lib/theme";

export default function AppLayout() {
  const { colors, isDark, toggleMode } = useTheme();

  return (
    <>
      <StatusBar
        style={isDark ? "light" : "dark"}
        backgroundColor={colors.header}
      />
      <View style={styles.content}>
        <Stack
          screenOptions={{
            headerLeft: () => (
              <Link asChild href="/">
                <Pressable
                  style={{
                    padding: 10,
                    borderRadius: 20,
                  }}
                >
                  {({ pressed }) => (
                    <Text
                      style={{
                        color: pressed ? colors.textMuted : colors.headerText,
                        fontSize: 18,
                      }}
                    >
                      Free Games
                    </Text>
                  )}
                </Pressable>
              </Link>
            ),
            headerRight: () => (
              <View style={styles.headerRight}>
                <Pressable onPress={toggleMode} style={styles.headerButton}>
                  {({ pressed }) =>
                    isDark ? (
                      <SunIcon
                        color={pressed ? colors.textMuted : colors.headerText}
                        size={22}
                      />
                    ) : (
                      <MoonIcon
                        color={pressed ? colors.textMuted : colors.headerText}
                        size={22}
                      />
                    )
                  }
                </Pressable>
              </View>
            ),
            headerStyle: { backgroundColor: colors.header },
            headerTintColor: colors.headerText,
            headerTitle: "",
          }}
        />
      </View>
      <BottomNav />
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerButton: {
    padding: 10,
    borderRadius: 20,
  },
});
