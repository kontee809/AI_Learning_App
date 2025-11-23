// src/screens/Student/ScoreHistoryScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ScoreHistoryScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Score History</Text>
  </View>
);

export default ScoreHistoryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 20 },
});
