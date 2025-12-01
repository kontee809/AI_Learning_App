// src/screens/Teacher/ExamAnswerScreen.tsx
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  AnswerOption,
  findExamById,
  upsertExam,
} from "../../store/examStore";

const QUESTION_COUNT = 10; // demo 10 câu

const ExamAnswerScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const examId: string | null = route.params?.examId ?? null;

  const [code, setCode] = useState("");
  const [answers, setAnswers] = useState<AnswerOption[]>(
    Array(QUESTION_COUNT).fill("A")
  );

  // Nếu sửa mã đề → load dữ liệu cũ
  useEffect(() => {
    if (examId) {
      const exam = findExamById(examId);
      if (exam) {
        setCode(exam.code);
        setAnswers(exam.answers);
      }
    }
  }, [examId]);

  const toggleAnswer = (index: number, opt: AnswerOption) => {
    const newArr = [...answers];
    newArr[index] = opt;
    setAnswers(newArr);
  };

  const handleSave = () => {
    const id = examId ?? Date.now().toString();
    upsertExam({
      id,
      code: code || "101",
      answers,
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      {/* Header */}
      <View className="bg-indigo-600 pt-10 pb-3 px-4">
        {/* <View className="flex-row items-center justify-between mb-3">
          <Text className="text-xs text-white">16:22</Text>
          <Text className="text-xs text-white">•••</Text>
        </View> */}

        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            className="w-8 h-8 items-center justify-center"
            onPress={() => navigation.goBack()}
          >
            <Text className="text-2xl text-white">‹</Text>
          </TouchableOpacity>

          <Text className="text-base font-semibold text-white">Đáp án</Text>

          <TouchableOpacity
            className="w-8 h-8 items-center justify-center"
            onPress={handleSave}
          >
            <Text className="text-base text-white font-semibold">Lưu</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className="flex-1 bg-slate-100"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Mã đề + camera */}
        <View className="px-4 pt-4 pb-3 bg-slate-100">
          <Text className="text-xs text-slate-500 mb-1">MÃ ĐỀ</Text>
          <View className="flex-row items-center bg-white rounded-2xl px-4 py-2">
            <TextInput
              className="flex-1 text-base text-slate-900"
              placeholder="Mã đề"
              keyboardType="number-pad"
              value={code}
              onChangeText={setCode}
            />
            <TouchableOpacity
              className="ml-3"
              onPress={() => navigation.navigate("ExamCamera")}
            >
              <Text className="text-2xl">📷</Text>
            </TouchableOpacity>
          </View>

          <Text className="text-xs text-slate-500 mt-2">
            Mã đề gồm 3 chữ số. Bạn có thể scan phiếu trả lời với kết quả đúng
            để tự động hoàn thành đáp án.
          </Text>
        </View>

        {/* Bảng đáp án */}
        <View className="mt-2 px-4">
          <Text className="text-xs text-slate-500 mb-2">ĐÁP ÁN</Text>

          {Array.from({ length: QUESTION_COUNT }).map((_, idx) => {
            const questionNo = idx + 1;
            const current = answers[idx];

            const renderOption = (opt: AnswerOption) => {
              const selected = current === opt;
              return (
                <Pressable
                  key={opt}
                  className={`w-10 h-10 rounded-full border border-slate-300 items-center justify-center mx-1 ${
                    selected ? "bg-slate-300" : "bg-white"
                  }`}
                  onPress={() => toggleAnswer(idx, opt)}
                >
                  <Text
                    className={`text-sm ${
                      selected ? "text-slate-900" : "text-blue-500"
                    }`}
                  >
                    {opt}
                  </Text>
                </Pressable>
              );
            };

            return (
              <View
                key={questionNo}
                className="flex-row items-center justify-between mb-2"
              >
                <View className="w-8 items-center">
                  <Text className="text-base text-slate-900">
                    {questionNo}
                  </Text>
                </View>
                <View className="flex-row flex-1 justify-start">
                  {renderOption("A")}
                  {renderOption("B")}
                  {renderOption("C")}
                  {renderOption("D")}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExamAnswerScreen;
