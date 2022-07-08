import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

// Screens
import HomeScreen from "./screens/HomeScreen";
import VoteScreen from "./screens/VoteScreen";
import StatScreen from "./screens/StatScreen";
import LoginScreen from "../screens/LoginScreen";

//Screen names
const homeName = "Home";
const voteName = "Vote";
const statName = "Stat";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainContainer({ user }) {
  return (
    <>
      {user ? (
        <Tab.Navigator
          screenOptions={{
            tabBarInactiveTintColor: "grey",
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#027314",
            labelStyle: { paddingBottom: 10, fontSize: 10 },
            style: { padding: 10, height: 70 },
          }}
        >
          <Tab.Screen
            name={homeName}
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home-outline" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name={voteName}
            component={VoteScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="vote-outline"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
          <Tab.Screen
            name={statName}
            component={StatScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons
                  name="stats-chart-outline"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      )}
    </>
  );
}

export default MainContainer;
