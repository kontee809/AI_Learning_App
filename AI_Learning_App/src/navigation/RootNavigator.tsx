// src/navigation/RootNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import StudentStack from './StudentStack';
import TeacherStack from './TeacherStack';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  // tạm thời hardcode
  const isLoggedIn = false; // false → luôn vào Auth (Start / Login / Register)
  const role: 'student' | 'teacher' = 'student';

  return (
    <NavigationContainer>
      {/* @ts-ignore */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : role === 'student' ? (
          <Stack.Screen name="Student" component={StudentStack} />
        ) : (
          <Stack.Screen name="Teacher" component={TeacherStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
