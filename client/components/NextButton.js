import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const NextButton = () => {
  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;

  return (
    <View style={styles.container}>
      {/* Buttons */}
      <Text>Next Button</Text>
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
