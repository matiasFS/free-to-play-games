import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../../lib/theme";

export default function AuthLayout() {
  const { colors, isDark } = useTheme();

  return (
    <>
      <StatusBar
        style={isDark ? "light" : "dark"}
        backgroundColor={colors.background}
      />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
