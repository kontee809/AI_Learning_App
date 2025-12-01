// src/navigation/AuthStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from '../screens/Start';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import ClassListScreen from '../screens/Teacher/ManageClassScreen';
import GradeListScreen from '../screens/Teacher/GradeListScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
     
    // @ts-ignore
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Start"
    >
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
