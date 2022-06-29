import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Onboarding from "./components/Onboarding";
import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import { useEffect, useState } from "react";
import LoginScreen from "./screens/LoginScreen";

const Loading = () => {
  return (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem("@viewedOnboarding");

      if (value !== null) {
        setViewedOnboarding(true);
      }
    } catch (error) {
      console.log("Error @checkOnboarding: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkOnboarding();
  }, []);
  return (
    <TailwindProvider utilities={utilities}>
      <View style={styles.container}>
        {loading ? (
          <Loading />
        ) : viewedOnboarding ? (
          <LoginScreen />
        ) : (
          <Onboarding />
        )}
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
