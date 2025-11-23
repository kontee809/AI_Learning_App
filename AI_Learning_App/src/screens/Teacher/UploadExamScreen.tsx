// src/screens/Teacher/UploadExamScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UploadExamScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Upload Exam</Text>
  </View>
);

export default UploadExamScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 20 },
});
