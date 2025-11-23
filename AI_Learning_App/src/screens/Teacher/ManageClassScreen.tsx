// src/screens/Teacher/ManageClassScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ManageClassScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Manage Class</Text>
  </View>
);

export default ManageClassScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 20 },
});
