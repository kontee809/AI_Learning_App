import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Modal,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://10.0.2.2:5000";

type AssignmentItem = {
  id: number;
  title: string;
  created_at: string;
  max_score: number;
  question_count: number;
};

const GradeListScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const { classId, className } = route.params;

  const [assignments, setAssignments] = useState<AssignmentItem[]>([]);
  const [loading, setLoading] = useState(false);

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

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString("vi-VN");
  };

  // ---------------- FETCH ASSIGNMENTS ----------------
  const fetchAssignments = useCallback(async () => {
    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${API_URL}/assignments/class/${classId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      console.log("Fetch assignment response:", data);

      if (!res.ok) {
        Alert.alert("Lỗi", data.message || "Không tải được danh sách bài tập");
        return;
      }

      setAssignments(data);
    } catch (err) {
      console.log("Fetch assignments error:", err);
      // KHÔNG ALERT → tránh gây hiểu lầm
    } finally {
      setLoading(false);
    }
  }, [classId]);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  // ---------------- CREATE ASSIGNMENT ----------------
  const handleSaveExercise = async () => {
    if (!exerciseTitle.trim() || !exerciseScore || !questionCount) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const score = parseInt(exerciseScore, 10);
    const count = parseInt(questionCount, 10);

    if (isNaN(score) || isNaN(count)) {
      Alert.alert("Lỗi", "Số điểm và số câu phải là số hợp lệ");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${API_URL}/assignments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          class_id: classId,
          title: exerciseTitle.trim(),
          max_score: score,
          question_count: count,
        }),
      });

      const data = await res.json();
      console.log("Create assignment response:", data);

      if (!res.ok) {
        Alert.alert("Lỗi", data.message || "Không tạo được bài tập");
        return;
      }

      if (data.assignment) {
        // THÊM VÀO DANH SÁCH
        setAssignments((prev) => [data.assignment, ...prev]);
      }

      closeModal();

      // Reload lại danh sách
      await fetchAssignments();
    } catch (err) {
      console.log("Create assignment error:", err);
      // KHÔNG ALERT lỗi ở đây nữa
    }
  };

  // ---------------- RENDER ITEM ----------------
  const renderItem = ({ item }: { item: AssignmentItem }) => (
    <Pressable
      className="bg-white rounded-2xl px-4 py-3 mb-3 flex-row items-center justify-between"
      onPress={() =>
        navigation.navigate("ExamDetail", {
          examId: item.id,
          examTitle: item.title,
        })
      }
    >
      <View>
        <Text className="text-base font-semibold text-slate-900">
          {item.title}
        </Text>
        <Text className="text-xs text-slate-500 mt-1">
          {formatDate(item.created_at)}
        </Text>
      </View>

      <Text className="text-base font-semibold text-slate-900">
        {item.question_count}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      {/* HEADER */}
      <View className="bg-indigo-600 pt-10 pb-3 px-4 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-2xl text-white">‹</Text>
        </TouchableOpacity>

        <Text className="text-base font-semibold text-white">{className}</Text>

        <TouchableOpacity onPress={openModal}>
          <Text className="text-2xl text-white">＋</Text>
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <View className="flex-1 px-4 pt-4">
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={assignments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        )}
      </View>

      {/* MODAL */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-white rounded-t-3xl px-4 pt-4 pb-6">
            <Text className="text-base font-semibold text-center mb-4">
              Thêm bài kiểm tra
            </Text>

            {/* TÊN BÀI */}
            <Text className="font-semibold mb-1">Tên bài</Text>
            <View className="bg-slate-100 rounded-2xl px-4 py-2 mb-3">
              <TextInput
                value={exerciseTitle}
                onChangeText={setExerciseTitle}
                placeholder="VD: KT 15 phút"
              />
            </View>

            {/* SỐ ĐIỂM */}
            <Text className="font-semibold mb-1">Số điểm tối đa</Text>
            <View className="bg-slate-100 rounded-2xl px-4 py-2 mb-3">
              <TextInput
                value={exerciseScore}
                keyboardType="numeric"
                onChangeText={setExerciseScore}
                placeholder="VD: 10"
              />
            </View>

            {/* SỐ CÂU */}
            <Text className="font-semibold mb-1">Số câu hỏi</Text>
            <View className="bg-slate-100 rounded-2xl px-4 py-2 mb-6">
              <TextInput
                value={questionCount}
                keyboardType="numeric"
                onChangeText={setQuestionCount}
                placeholder="VD: 20"
              />
            </View>

            {/* BUTTON */}
            <View className="flex-row">
              <TouchableOpacity
                className="flex-1 mr-2 bg-slate-200 rounded-2xl py-3 items-center"
                onPress={closeModal}
              >
                <Text>Hủy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 ml-2 bg-indigo-600 rounded-2xl py-3 items-center"
                onPress={handleSaveExercise}
              >
                <Text className="text-white">Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default GradeListScreen;
