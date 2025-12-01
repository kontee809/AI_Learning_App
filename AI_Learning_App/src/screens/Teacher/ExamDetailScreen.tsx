// src/screens/Teacher/ExamDetailScreen.tsx
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const ExamDetailScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { examTitle = "Bài kiểm tra" } = route.params || {};

  const MenuItem = ({
    icon,
    label,
    onPress,
  }: {
    icon: string;
    label: string;
    onPress?: () => void;
  }) => (
    <Pressable
      className="bg-white rounded-2xl px-4 py-3 mb-3 flex-row items-center justify-between"
      onPress={onPress}
    >
      <View className="flex-row items-center">
        <Text className="text-xl mr-3">{icon}</Text>
        <Text className="text-base text-slate-900">{label}</Text>
      </View>
      <Text className="text-xl text-emerald-500">{">"}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      {/* Header xanh */}
      <View className="bg-indigo-600 pt-2 pb-3 px-4">
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-xs text-white">23:25</Text>
          <Text className="text-xs text-white">•••</Text>
        </View>

        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            className="w-8 h-8 items-center justify-center"
            onPress={() => navigation.goBack()}
          >
            <Text className="text-2xl text-white">‹</Text>
          </TouchableOpacity>

          <Text className="text-base font-semibold text-white">
            {examTitle}
          </Text>

          <View className="w-8 h-8" />
        </View>
      </View>

      <ScrollView
        className="flex-1 px-4 pt-4 bg-slate-100"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Các menu chức năng */}
        <MenuItem icon="🔑" label="Đáp án" onPress={() => navigation.navigate("ExamCodeList")} />
        <MenuItem icon="▶️" label="Chấm bài" onPress={() => {}} />
        <MenuItem icon="🖼️" label="Bài đã chấm" onPress={() => {}} />
        <MenuItem icon="📤" label="Xuất điểm" onPress={() => {}} />
        <MenuItem icon="📊" label="Thống kê" onPress={() => {}} />

        {/* Thông tin cấu hình bài kiểm tra */}
        <View className="mt-4 bg-white rounded-2xl px-4 py-3">
          <View className="flex-row items-center mb-2">
            <Text className="text-lg mr-2">✅</Text>
            <Text className="text-sm text-slate-900">10 câu</Text>
          </View>
          <View className="flex-row items-center mb-2">
            <Text className="text-lg mr-2">✅</Text>
            <Text className="text-sm text-slate-900">
              Phiếu A4 - Trắc nghiệm và Tự luận
            </Text>
          </View>
          <View className="flex-row items-center mb-2">
            <Text className="text-lg mr-2">✅</Text>
            <Text className="text-sm text-slate-900">Quét số báo danh</Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-lg mr-2">✅</Text>
            <Text className="text-sm text-slate-900">1 môn học</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExamDetailScreen;
