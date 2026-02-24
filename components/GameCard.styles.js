import { StyleSheet } from "react-native";

export const createStyles = (colors) =>
  StyleSheet.create({
    card: {
      borderRadius: 14,
      padding: 20,
      marginBottom: 20,
      alignItems: "center",
    },

    cardDefault: {
      backgroundColor: colors.card,
    },

    cardPressed: {
      backgroundColor: colors.cardPressed,
    },

    image: {
      width: "100%",
      height: 200,
      borderRadius: 12,
    },

    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
      marginTop: 12,
      textAlign: "center",
    },

    description: {
      fontSize: 14,
      color: colors.textMuted,
      marginTop: 6,
      textAlign: "center",
    },

    meta: {
      fontSize: 13,
      fontStyle: "italic",
      color: colors.textSubtle,
      marginTop: 4,
    },
  });