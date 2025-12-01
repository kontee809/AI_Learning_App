// src/screens/Teacher/AIGradingScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const AIGradingScreen = () => {
  const navigation = useNavigation<any>();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");

      // AIGradingScreen nằm trong Tab (TeacherStack) -> parent là Tab, parent nữa là Root
      const rootNav = navigation.getParent()?.getParent();

      rootNav?.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      });
    } catch (e) {
      console.log("Logout error:", e);
      Alert.alert("Lỗi", "Không thể đăng xuất");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>AI Grading</Text>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AIGradingScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 20, marginBottom: 24 },
  logoutBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#ef4444",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "600",
  },
});
