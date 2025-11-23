// src/screens/Teacher/DashboardScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DashboardScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Teacher Dashboard</Text>
  </View>
);

export default DashboardScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 20 },
});
