import { View } from "react-native";

export default function Screen({ children }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000000",
        padding: 10,
      }}
    >
      {children}
    </View>
  );
}
