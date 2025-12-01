// src/navigation/TeacherStack.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashboardScreen from '../screens/Teacher/DashboardScreen';
import ManageClassScreen from '../screens/Teacher/ManageClassScreen';
import UploadExamScreen from '../screens/Teacher/UploadExamScreen';
import ManualGradingScreen from '../screens/Teacher/ManualGradingScreen';
import AIGradingScreen from '../screens/Teacher/AIGradingScreen';
import GradeListScreen from '../screens/Teacher/GradeListScreen';
import ExamDetailScreen from '../screens/Teacher/ExamDetailScreen';
import ExamCodeListScreen from '../screens/Teacher/ExamCodeListScreen';
import ExamAnswerScreen from '../screens/Teacher/ExamAnswerScreen';
import ExamCameraScreen from '../screens/Teacher/ExamCameraScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Tabs chính cho teacher
const TeacherTabs = () => {
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

// Stack bọc ngoài — để push được GradeList lên trên Tabs
const TeacherStack = () => {
  return (
    // @ts-ignore
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TeacherTabs" component={TeacherTabs} />
      <Stack.Screen name="GradeList" component={GradeListScreen} />
      <Stack.Screen name="ExamDetail" component={ExamDetailScreen} />
      <Stack.Screen name="ExamCodeList" component={ExamCodeListScreen} />
      <Stack.Screen name="ExamAnswer" component={ExamAnswerScreen} />
      <Stack.Screen name="ExamCamera" component={ExamCameraScreen} />

    </Stack.Navigator>
  );
};

export default TeacherStack;
