// screens/GradeListScreen.tsx
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Modal,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

type GradeItem = {
  id: string;
  title: string;
  datetime: string;
  score: number;
};

const DUMMY_GRADES: GradeItem[] = [
  { id: "1", title: "TEST 1", datetime: "25/11/2025, 09:52", score: 10,  },
  { id: "2", title: "TEST 2", datetime: "25/12/2025, 09:52", score: 10,  },
];

const GradeListScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { className = "" } = route.params || {};

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [exerciseTitle, setExerciseTitle] = useState("");
  const [exerciseScore, setExerciseScore] = useState("");
  const [questionCount, setQuestionCount] = useState("");

  const openModal = () => {
    setExerciseTitle("");
    setExerciseScore("");
    setQuestionCount("");
    setIsModalVisible(true);
  };

  const closeModal = () => setIsModalVisible(false);

  const handleSaveExercise = () => {
    // TODO: lưu dữ liệu bài kiểm tra
    console.log({
      exerciseTitle,
      exerciseScore,
      questionCount,
    });
    closeModal();
  };

  const renderItem = ({ item }: { item: GradeItem }) => (
    <Pressable
      className="bg-white rounded-2xl px-4 py-3 mb-3 flex-row items-center justify-between"
      onPress={() =>
        navigation.navigate("ExamDetail", {
          examId: item.id,
          examTitle: item.title,   // hoặc truyền thêm className nếu muốn
        })
      }
    >
      <View>
        <Text className="text-base font-semibold text-slate-900">
          {item.title}
        </Text>
        <Text className="text-xs text-slate-500 mt-1">{item.datetime}</Text>
      </View>

      <Text className="text-base font-semibold text-slate-900">
        {item.score}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      {/* Header */}
      <View className="bg-indigo-600 pt-2 pb-3 px-4">
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-xs text-white">21:52</Text>
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
            {className}
          </Text>

          <TouchableOpacity
            activeOpacity={0.6}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            className="w-8 h-8 items-center justify-center rounded-full"
            onPress={openModal}
          >
            <Text className="text-2xl text-white">＋</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Nội dung */}
      <View className="flex-1 px-4 pt-4 bg-slate-100">
        <FlatList
          data={DUMMY_GRADES}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </View>

      {/* Modal tạo bài kiểm tra */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-white rounded-t-3xl px-4 pt-4 pb-6">
            <View className="w-12 h-1.5 bg-slate-300 rounded-full self-center mb-4" />
            <Text className="text-base font-semibold text-center mb-4">
              Thêm bài kiểm tra
            </Text>

            {/* Tên bài */}
            <Text className="text-sm font-semibold text-slate-800 mb-2">
              Tên bài
            </Text>
            <View className="bg-slate-100 rounded-2xl px-4 py-2 mb-4">
              <TextInput
                className="text-base text-slate-900"
                placeholder="VD: Bài kiểm tra 15 phút"
                placeholderTextColor="#9CA3AF"
                value={exerciseTitle}
                onChangeText={setExerciseTitle}
              />
            </View>

            {/* Số điểm bài trắc nghiệm */}
            <Text className="text-sm font-semibold text-slate-800 mb-2">
              Số điểm bài trắc nghiệm
            </Text>
            <View className="bg-slate-100 rounded-2xl px-4 py-2 mb-4">
              <TextInput
                className="text-base text-slate-900"
                placeholder="VD: 10"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                value={exerciseScore}
                onChangeText={setExerciseScore}
              />
            </View>

            {/* Số câu hỏi */}
            <Text className="text-sm font-semibold text-slate-800 mb-2">
              Số câu hỏi
            </Text>
            <View className="bg-slate-100 rounded-2xl px-4 py-2 mb-6">
              <TextInput
                className="text-base text-slate-900"
                placeholder="VD: 20"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                value={questionCount}
                onChangeText={setQuestionCount}
              />
            </View>

            {/* nút */}
            <View className="flex-row">
              <TouchableOpacity
                className="flex-1 mr-2 bg-slate-200 rounded-2xl py-3 items-center"
                onPress={closeModal}
              >
                <Text className="text-slate-700 font-semibold">Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 ml-2 bg-indigo-600 rounded-2xl py-3 items-center"
                onPress={handleSaveExercise}
              >
                <Text className="text-white font-semibold">Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default GradeListScreen;
