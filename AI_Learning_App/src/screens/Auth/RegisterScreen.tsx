import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

//phone
//const API_URL = "http://192.168.1.210:5000"; 

//virtual
const API_URL = "http://10.0.2.2:5000";

// ⚠️ Android Emulator dùng 10.0.2.2 thay cho localhost
// Nếu bạn dùng device thật → đổi thành IPv4 của laptop: 192.168.x.x

const RegisterScreen = ({ navigation }: any) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: fullName,
          email,
          password,
          role: "TEACHER",
        }),
      });

      console.log("Register status:", res.status);

      let data: any = null;
      try {
        const text = await res.text();
        console.log("Raw response:", text);
        data = text ? JSON.parse(text) : null;
      } catch (e) {
        console.log("JSON parse error:", e);
      }

      if (!res.ok) {
        Alert.alert("Đăng ký thất bại", data?.message || `Lỗi ${res.status}`);
        return;
      }

      Alert.alert("Thành công", "Tạo tài khoản thành công");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Lỗi kết nối", "Không thể kết nối tới server");
      console.log("Register error (catch):", error);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ký</Text>

      <TextInput
        placeholder="Họ và tên"
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Mật khẩu"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Tạo tài khoản</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkText}>Đã có tài khoản? Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#00C9A7",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 12,
  },
  buttonText: { textAlign: "center", color: "#fff", fontWeight: "600" },
  linkText: { textAlign: "center", color: "#007AFF" },
});
