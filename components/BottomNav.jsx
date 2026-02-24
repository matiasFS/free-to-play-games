import { usePathname, useRouter } from "expo-router";
import { DeviceEventEmitter, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HomeIcon, InfoIcon } from "./Icons";
import { useTheme } from "../lib/theme";

export const BOTTOM_NAV_HEIGHT = 56;

export function BottomNav() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.header,
          borderTopColor: colors.border,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <View style={styles.row}>
        <Pressable
          onPress={() => {
            if (pathname === "/") {
              DeviceEventEmitter.emit("scrollToTop");
              return;
            }
            router.push("/");
          }}
          android_ripple={{
            color: colors.navPressed,
            borderless: false,
            foreground: true,
          }}
          hitSlop={16}
          style={({ pressed }) => [
            styles.iconButton,
            { backgroundColor: colors.header },
            pressed && [
              styles.iconButtonPressed,
              { backgroundColor: colors.navPressed },
            ],
          ]}
        >
          {({ pressed }) => (
            <HomeIcon
              color={pressed ? colors.textMuted : colors.headerText}
              size={24}
            />
          )}
        </Pressable>
        <Pressable
          onPress={() => {
            if (pathname === "/about") return;
            router.push("/about");
          }}
          android_ripple={{
            color: colors.navPressed,
            borderless: false,
            foreground: true,
          }}
          hitSlop={16}
          style={({ pressed }) => [
            styles.iconButton,
            { backgroundColor: colors.header },
            pressed && [
              styles.iconButtonPressed,
              { backgroundColor: colors.navPressed },
            ],
          ]}
        >
          {({ pressed }) => (
            <InfoIcon
              color={pressed ? colors.textMuted : colors.headerText}
              size={24}
            />
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
  },
  row: {
    height: BOTTOM_NAV_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  iconButton: {
    padding: 10,
    borderRadius: 20,
    minWidth: 44,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  iconButtonPressed: {
    transform: [{ scale: 0.96 }],
  },
});
