// src/screens/Teacher/ManualGradingScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ManualGradingScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Manual Grading</Text>
  </View>
);

export default ManualGradingScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 20 },
});
