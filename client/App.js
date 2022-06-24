import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Onboarding from "./components/Onboarding";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";

export default function App() {
  return (
    <TailwindProvider utilities={utilities}>
      <View style={styles.container}>
        <Onboarding />
      </View>
    </TailwindProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
