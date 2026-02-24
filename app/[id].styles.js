import { StyleSheet } from "react-native";

export const createStyles = (colors) =>
  StyleSheet.create({
    image: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      width: "100%",
    },
    card: {
      backgroundColor: colors.card,
      padding: 24,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: colors.border,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 24,
    },
    metaRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
      gap: 12,
    },
    metaItem: {
      flex: 1,
      backgroundColor: colors.metaBg,
      padding: 12,
      borderRadius: 12,
    },
    label: {
      color: colors.textSubtle,
      fontSize: 10,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 4,
    },
    value: {
      color: colors.text,
      fontSize: 14,
      fontWeight: "600",
    },
    description: {
      color: colors.textMuted,
      lineHeight: 24,
      fontSize: 15,
    },
    backButton: {
      backgroundColor: colors.accent,
      padding: 16,
      borderRadius: 12,
      marginTop: 35,
    },
    backButtonPressed: {
      opacity: 0.85,
      transform: [{ scale: 0.98 }],
    },
    backText: {
      color: colors.accentText,
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 16,
    },
  });