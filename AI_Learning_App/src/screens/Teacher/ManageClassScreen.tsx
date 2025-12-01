// src/screens/Teacher/ManageClassScreen.tsx
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Modal,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://10.0.2.2:5000"; // Android emulator
// const API_URL = "http://192.168.x.x:5000"; // 👉 đổi IP này nếu chạy trên điện thoại thật

type ClassItem = {
  id: number;
  name: string;
  join_code: string;
  created_at: string | null;
  num_students: number;
};

const ManageClassScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const [className, setClassName] = useState("");

  const generateCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setJoinCode(code);
  };

  const openModal = () => {
    generateCode();
    setClassName("");
    setIsModalVisible(true);
  };

  const closeModal = () => setIsModalVisible(false);

  const formatDate = (iso: string | null) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleString("vi-VN");
  };

  // ---- GỌI API LẤY DANH SÁCH LỚP CỦA GIÁO VIÊN ----
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          Alert.alert("Lỗi", "Bạn cần đăng nhập lại");
          return;
        }

        const res = await fetch(`${API_URL}/classes/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          // Backend trả message cụ thể
          if (data.message) {
            Alert.alert("Lỗi", data.message);
          } else {
            Alert.alert("Lỗi", "Chưa có lớp học");
          }
          return;
        }


        setClasses(data); // data là mảng ClassItem
      } catch (error) {
        console.log("Fetch classes error:", error);
        //Alert.alert("Lỗi", "Không thể kết nối tới server");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  // ---- GỌI API TẠO LỚP ----
  const handleSaveClass = async () => {
    if (!className.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập tên lớp");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Lỗi", "Bạn cần đăng nhập lại");
        return;
      }

      const res = await fetch(`${API_URL}/classes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: className.trim(),
          join_code: joinCode,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Lỗi", data.message || "Không tạo được lớp");
        return;
      }

      // data.class là lớp mới tạo
      setClasses((prev) => [data.class, ...prev]);
      closeModal();
    } catch (error) {
      console.log("Create class error:", error);
      //Alert.alert("Lỗi", "Không thể kết nối tới server");
    }
  };

  const renderItem = ({ item }: { item: ClassItem }) => (
    <Pressable
      className="bg-white rounded-2xl px-4 py-3 mb-3 flex-row items-center justify-between"
      onPress={() =>
        navigation.navigate("GradeList", {
          classId: item.id,
          className: item.name,
        })
      }
    >
      <View>
        <Text className="text-base font-semibold text-slate-900">
          {item.name}
        </Text>
        <Text className="text-xs text-slate-500 mt-1">
          {formatDate(item.created_at)}
        </Text>
        <Text className="text-xs text-slate-500 mt-1">
          Sĩ số: {item.num_students}
        </Text>
      </View>

      <Text className="text-base font-semibold text-slate-900">
        {item.join_code}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      {/* Header */}
      <View className="bg-indigo-600 pt-10 pb-3 px-4">
        <View className="flex-row items-center justify-between">
          <View className="w-8 h-8" />
          <Text className="text-base font-semibold text-white">
            Danh sách lớp
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
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={classes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
          />
        )}
      </View>

      {/* Modal tạo lớp */}
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
              Tạo lớp học
            </Text>

            <Text className="text-sm font-semibold text-slate-800 mb-2">
              Mã tham gia
            </Text>
            <View className="flex-row items-center bg-slate-100 rounded-2xl px-4 py-3 mb-4 justify-between">
              <Text className="text-lg font-semibold text-slate-900">
                {joinCode}
              </Text>
              <Pressable onPress={generateCode}>
                <Text className="text-xs text-indigo-600 font-semibold">
                  Random lại
                </Text>
              </Pressable>
            </View>

            <Text className="text-sm font-semibold text-slate-800 mb-2">
              Tên lớp học
            </Text>
            <View className="bg-slate-100 rounded-2xl px-4 py-2 mb-6">
              <TextInput
                className="text-base text-slate-900"
                placeholder="Nhập tên lớp"
                placeholderTextColor="#9CA3AF"
                value={className}
                onChangeText={setClassName}
              />
            </View>

            <View className="flex-row">
              <TouchableOpacity
                className="flex-1 mr-2 bg-slate-200 rounded-2xl py-3 items-center"
                onPress={closeModal}
              >
                <Text className="text-slate-700 font-semibold">Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 ml-2 bg-indigo-600 rounded-2xl py-3 items-center"
                onPress={handleSaveClass}
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

export default ManageClassScreen;
