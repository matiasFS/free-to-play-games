import { Text } from "react-native";
import { Screen } from "../../components/Screen";
import { useTheme } from "../../lib/theme";

export default function About() {
  const { colors } = useTheme();

  return (
    <Screen>
      <Text style={{ color: colors.text, fontSize: 18, fontWeight: "600" }}>
        About this app
      </Text>
      <Text style={{ color: colors.textMuted, marginTop: 8 }}>
        This app is built using React Native and Expo Router.
      </Text>
    </Screen>
  );
}
