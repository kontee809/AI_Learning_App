// src/screens/Start.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const StartScreen = ({ navigation }: any) => {
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Chấm thi</Text>
          <Text style={styles.subtitle}>Chấm thi bằng điện thoại</Text>
        </View>

        <View style={styles.buttonsWrapper}>
          <TouchableOpacity style={styles.mainButton} onPress={handleLogin}>
            <Text style={styles.mainButtonText}>Đăng nhập</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.mainButton, styles.outlineButton]}
            onPress={handleRegister}
          >
            <Text style={[styles.mainButtonText, styles.outlineButtonText]}>
              Đăng ký
            </Text>
          </TouchableOpacity>

          <Text style={styles.policyText}>
            Bằng việc tiếp tục, tôi đã đọc và đồng ý với{' '}
            <Text style={styles.policyLink}>Chính sách quyền riêng tư</Text>
          </Text>
        </View>

        <View style={styles.illustrationWrapper}>
          <Text style={styles.bottomText}>Tốc độ chính xác chỉ trong 5 giây</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#00C9A7',
  },
  container: {
    flex: 1,
    backgroundColor: '#00C9A7',
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#E9FEFF',
  },
  buttonsWrapper: {
    alignItems: 'center',
  },
  mainButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    width: '100%',
    marginBottom: 12,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222222',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    elevation: 0,
  },
  outlineButtonText: {
    color: '#FFFFFF',
  },
  policyText: {
    marginTop: 8,
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  policyLink: {
    textDecorationLine: 'underline',
    color: '#0057FF',
  },
  illustrationWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 24,
  },
  bottomText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
});
