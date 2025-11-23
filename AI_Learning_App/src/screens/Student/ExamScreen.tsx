// src/screens/Student/ExamScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExamScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Exam Screen</Text>
  </View>
);

export default ExamScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 20 },
});
