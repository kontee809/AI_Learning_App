// src/screens/Teacher/AIGradingScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AIGradingScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>AI Grading</Text>
  </View>
);

export default AIGradingScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 20 },
});
