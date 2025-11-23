// src/navigation/TeacherStack.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/Teacher/DashboardScreen';
import ManageClassScreen from '../screens/Teacher/ManageClassScreen';
import UploadExamScreen from '../screens/Teacher/UploadExamScreen';
import ManualGradingScreen from '../screens/Teacher/ManualGradingScreen';
import AIGradingScreen from '../screens/Teacher/AIGradingScreen';

const Tab = createBottomTabNavigator();

const TeacherStack = () => {
  return (
    // @ts-ignore
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Manage" component={ManageClassScreen} />
      <Tab.Screen name="Upload" component={UploadExamScreen} />
      <Tab.Screen name="Manual" component={ManualGradingScreen} />
      <Tab.Screen name="AI" component={AIGradingScreen} />
    </Tab.Navigator>
  );
};

export default TeacherStack;
