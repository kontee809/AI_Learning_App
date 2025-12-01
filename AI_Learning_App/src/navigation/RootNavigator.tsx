// src/navigation/RootNavigator.tsx
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";

import AuthStack from "./AuthStack";
import TeacherStack from "./TeacherStack";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const [initialRoute, setInitialRoute] = useState<"Auth" | "Teacher">("Auth");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          setInitialRoute("Teacher");
        } else {
          setInitialRoute("Auth");
        }
      } catch (e) {
        console.log("Error reading token:", e);
        setInitialRoute("Auth");
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {/* @ts-ignore */}
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={initialRoute}
      >
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Teacher" component={TeacherStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
