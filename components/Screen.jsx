import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function Screen({ children }) {
  const inset = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#000000",
        padding: 15,
        paddingTop: inset.top + 20,
      }}
    >
      {children}
    </SafeAreaView>
  );
}
