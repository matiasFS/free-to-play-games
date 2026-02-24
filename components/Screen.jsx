import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Screen({ children }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          // We apply top padding only if we aren't using a transparent header.
          // For now, let's set a base padding that works for your Main screen.
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
});
