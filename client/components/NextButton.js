import React, { useEffect, useRef } from "react";
import {
  Animated,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTailwind } from "tailwind-rn";

const NextButton = ({ scrollTo }) => {
  const tailwind = useTailwind();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => scrollTo()}
        style={[
          tailwind("w-64 p-3 rounded-full my-5 self-center"),
          { backgroundColor: "#027314" },
        ]}
      >
        <Text style={tailwind("text-center text-white text-xl")}>
          Enter App
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NextButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
