import { Text, View, StyleSheet } from "react-native";
import { useMemo } from "react";
import { Screen } from "../../components/Screen";
import { useTheme } from "../../lib/theme";

export default function About() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>About this app</Text>
        <Text style={styles.subtitle}>
          Discover free-to-play games with quick details, filters, and a clean
          experience tailored for browsing.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>What you can do?</Text>
          <Text style={styles.cardItem}>• Browse the latest free-to-play games.</Text>
          <Text style={styles.cardItem}>• Filter by genre to find what you like.</Text>
          <Text style={styles.cardItem}>• Open any game for full details.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Why it exists?</Text>
          <Text style={styles.cardItem}>
            The goal is to make discovering new games fast, simple, and
            beautiful on mobile.
          </Text>
        </View>

        <Text style={styles.footer}>
          Built with React Native and Expo Router.
        </Text>
      </View>
    </Screen>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 16,
    },
    title: {
      color: colors.text,
      fontSize: 22,
      fontWeight: "700",
      marginBottom: 6,
    },
    subtitle: {
      color: colors.textMuted,
      fontSize: 14,
      lineHeight: 20,
      marginBottom: 18,
    },
    card: {
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 16,
      padding: 16,
      marginBottom: 14,
    },
    cardTitle: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "700",
      marginBottom: 8,
    },
    cardItem: {
      color: colors.textMuted,
      fontSize: 14,
      lineHeight: 20,
      marginBottom: 6,
    },
    footer: {
      color: colors.textSubtle,
      fontSize: 12,
      marginTop: 6,
    },
  });
