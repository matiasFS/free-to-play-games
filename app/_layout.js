import { Stack } from "expo-router";
import { ThemeProvider, useTheme } from "../lib/theme";

function RootStack() {
  const { colors } = useTheme();

  return (
    <Stack
      initialRouteName="(auth)"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    />
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <RootStack />
    </ThemeProvider>
  );
}