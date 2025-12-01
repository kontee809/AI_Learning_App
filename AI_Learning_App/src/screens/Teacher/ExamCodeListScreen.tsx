// src/screens/Teacher/ExamCodeListScreen.tsx
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getExams, ExamAnswer } from "../../store/examStore";

const ExamCodeListScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [codes, setCodes] = useState<ExamAnswer[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      setCodes([...getExams()]);
    }, [])
  );

  const renderItem = ({ item }: { item: ExamAnswer }) => (
    <Pressable
      className="bg-white rounded-2xl px-4 py-3 mb-3 flex-row items-center justify-between"
      onPress={() =>
        navigation.navigate("ExamAnswer", {
          examId: item.id,
        })
      }
    >
      <View className="flex-row items-center">
        <Text className="text-xl mr-3">🔑</Text>
        <Text className="text-base text-slate-900">{item.code}</Text>
      </View>
      <Text className="text-xl text-emerald-500">{">"}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      {/* Header */}
      <View className="bg-indigo-600 pt-10 pb-3 px-4">
        {/* <View className="flex-row items-center justify-between mb-3">
          <Text className="text-xs text-white">16:20</Text>
          <Text className="text-xs text-white">•••</Text>
        </View> */}

        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            className="w-8 h-8 items-center justify-center"
            onPress={() => navigation.goBack()}
          >
            <Text className="text-2xl text-white">‹</Text>
          </TouchableOpacity>

          <Text className="text-base font-semibold text-white">Mã đề</Text>

          <TouchableOpacity
            className="w-8 h-8 items-center justify-center"
            onPress={() =>
              navigation.navigate("ExamAnswer", {
                examId: null,
              })
            }
          >
            <Text className="text-2xl text-white">＋</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* List */}
      <View className="flex-1 px-4 pt-4 bg-slate-100">
        <FlatList
          data={codes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </View>

      {/* 3 nút dưới */}
      <View className="flex-row justify-between px-8 py-3">
        <Text className="text-blue-500">Chia sẻ</Text>
        <Text className="text-blue-500">Quét mã QR</Text>
        <Text className="text-blue-500">Ảnh QR</Text>
      </View>
    </SafeAreaView>
  );
};

export default ExamCodeListScreen;
