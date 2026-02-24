import { StyleSheet } from "react-native";

export const createStyles = (colors) =>
  StyleSheet.create({
    loader: { flex: 1, justifyContent: "center", alignItems: "center" },
    listContent: { paddingHorizontal: 16, paddingTop: 60, paddingBottom: 20 },
    filterBar: {
      paddingHorizontal: 16,
      paddingTop: 8,
      paddingBottom: 8,
    },
    filterButton: {
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 12,
      paddingVertical: 10,
      paddingHorizontal: 14,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    filterButtonText: {
      color: colors.text,
      fontSize: 14,
      fontWeight: "600",
    },
    filterHint: {
      color: colors.textSubtle,
      fontSize: 12,
      marginTop: 6,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      padding: 20,
    },
    modalCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
      maxHeight: "80%",
    },
    modalTitle: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "700",
      marginBottom: 12,
    },
    option: {
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 10,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
    },
    optionSelected: {
      backgroundColor: colors.cardPressed,
      borderColor: colors.textSubtle,
    },
    optionText: {
      color: colors.text,
      fontSize: 14,
      fontWeight: "600",
    },
    optionTextMuted: {
      color: colors.textSubtle,
      fontSize: 12,
      marginTop: 2,
    },
    modalFooter: {
      marginTop: 8,
      alignItems: "flex-end",
    },
    closeButton: {
      paddingVertical: 8,
      paddingHorizontal: 12,
    },
    closeButtonText: {
      color: colors.accent,
      fontWeight: "700",
    },
  });