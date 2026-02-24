import { Stack, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Screen } from "../../components/Screen";
import { useTheme } from "../../lib/theme";

export default function Login() {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Screen>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in to see the latest games.</Text>

        <View style={styles.form}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor={colors.textSubtle}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor={colors.textSubtle}
            secureTextEntry
            style={styles.input}
          />
        </View>

        <Pressable
          onPress={() => router.replace("/")}
          android_ripple={{ color: colors.cardPressed }}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Sign in</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 24,
    },
    title: {
      color: colors.text,
      fontSize: 28,
      fontWeight: "700",
    },
    subtitle: {
      color: colors.textMuted,
      marginTop: 6,
      marginBottom: 24,
    },
    form: {
      gap: 12,
      marginBottom: 20,
    },
    input: {
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 12,
      color: colors.text,
    },
    button: {
      backgroundColor: colors.accent,
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: "center",
    },
    buttonPressed: {
      opacity: 0.9,
      transform: [{ scale: 0.98 }],
    },
    buttonText: {
      color: colors.accentText,
      fontSize: 16,
      fontWeight: "700",
    },
  });
