// src/navigation/StudentStack.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Student/HomeScreen';
import CourseScreen from '../screens/Student/CourseScreen';
import ExamScreen from '../screens/Student/ExamScreen';
import ScoreHistoryScreen from '../screens/Student/ScoreHistoryScreen';

const Tab = createBottomTabNavigator();

const StudentStack = () => {
  return (
    // @ts-ignore
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Course" component={CourseScreen} />
      <Tab.Screen name="Exam" component={ExamScreen} />
      <Tab.Screen name="Score" component={ScoreHistoryScreen} />
    </Tab.Navigator>
  );
};

export default StudentStack;
