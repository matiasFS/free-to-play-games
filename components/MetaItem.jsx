import { View, Text } from "react-native";
import { useMemo } from "react";
import { createStyles } from "../app/[id].styles";
import { useTheme } from "../lib/theme";

export function MetaItem({ label, value }) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.metaItem}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}
