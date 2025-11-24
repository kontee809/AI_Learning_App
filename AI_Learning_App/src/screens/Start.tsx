// src/screens/Start.tsx
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

const StartScreen = ({ navigation }: any) => {
  const handleLogin = () => navigation.navigate('Login');
  const handleRegister = () => navigation.navigate('Register');

  return (
    <SafeAreaView className="flex-1 bg-teal-500">
      <StatusBar barStyle="light-content" />

      <View className="flex-1 px-6 pt-4">
        {/* Header */}
        <View className="items-center mt-10 mb-10">
          <Text className="text-4xl font-bold text-white mb-2">Chấm thi</Text>
          <Text className="text-base text-teal-100">Chấm thi bằng điện thoại</Text>
        </View>

        {/* Buttons */}
        <View className="items-center">
          <TouchableOpacity
            className="bg-white rounded-xl py-3 px-4 w-full mb-3 shadow-md items-center justify-center"
            onPress={handleLogin}
          >
            <Text className="text-lg font-semibold text-gray-800">Đăng nhập</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="border-2 border-white rounded-xl py-3 px-4 w-full mb-3 items-center justify-center"
            onPress={handleRegister}
          >
            <Text className="text-lg font-semibold text-white">Đăng ký</Text>
          </TouchableOpacity>

          <Text className="mt-2 text-xs text-white text-center">
            Bằng việc tiếp tục, tôi đã đọc và đồng ý với{' '}
            <Text className="underline text-blue-600">Chính sách quyền riêng tư</Text>
          </Text>
        </View>

        {/* Illustration / Bottom text */}
        <View className="flex-1 justify-end items-center pb-6">
          <Text className="text-sm text-white">Tốc độ chính xác chỉ trong 5 giây</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StartScreen;
