import { Stack } from "expo-router";
import { ThemeProvider } from "../lib/theme";

export default function Layout() {
  return (
    <ThemeProvider>
      <Stack initialRouteName="(auth)" screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}