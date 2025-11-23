// src/screens/Student/CourseScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CourseScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Course Screen</Text>
  </View>
);

export default CourseScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 20 },
});
