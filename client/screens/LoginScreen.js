import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const onSubmit = () => {};
  return (
    <View>
      <Text>LoginScreen</Text>
      <TouchableOpacity onPress={onSubmit}>
        <Text>Clear Onboarding</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
