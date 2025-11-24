// components/ScheduleCard.tsx
import React from "react";
import { View, Text, Pressable } from "react-native";

export type Subject = {
  id: number;
  name: string;
  time: string;
  status: "done" | "not_yet";
};

interface Props {
  title: string;
  dateText: string;
  subjects: Subject[];
}

const ScheduleCard: React.FC<Props> = ({ title, dateText, subjects }) => {
  return (
    <View className="bg-white rounded-3xl p-4 shadow-sm">

      {/* Header */}
      <View className="mb-3">
        <Text className="text-base font-semibold text-slate-900">{title}</Text>
        <Text className="text-xs text-slate-500 mt-0.5">{dateText}</Text>
      </View>

      {/* Danh sách môn */}
      {subjects.map((subj) => (
        <View
          key={subj.id}
          className={`flex-row items-center justify-between ${
            subj.id !== 1 ? "mt-4" : ""
          }`}
        >
          <View className="flex-row items-center flex-1">
            {/* STT */}
            <View className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center mr-3">
              <Text className="text-base font-semibold text-blue-600">
                {subj.id}
              </Text>
            </View>

            {/* Tên & giờ */}
            <View>
              <Text className="text-sm font-semibold text-slate-900">
                {subj.name}
              </Text>
              <Text className="text-xs text-slate-500 mt-0.5">⏱ {subj.time}</Text>
            </View>
          </View>

          {/* Trạng thái */}
          <View className="flex-row items-center">
            <View
              className={
                subj.status === "done"
                  ? "bg-green-400/90 px-3 py-1 rounded-md mr-2"
                  : "bg-slate-300 px-3 py-1 rounded-md mr-2"
              }
            >
              <Text
                className={
                  subj.status === "done"
                    ? "text-xs font-semibold text-white"
                    : "text-xs font-semibold text-slate-700"
                }
              >
                {subj.status === "done" ? "Đã học" : "Chưa học"}
              </Text>
            </View>

            <Pressable className="w-7 h-7 rounded-full border border-blue-400 items-center justify-center">
              <Text className="text-xs text-blue-500">i</Text>
            </Pressable>
          </View>
        </View>
      ))}

      <Pressable className="mt-5 items-center">
        <Text className="text-xs font-semibold text-blue-500">
          Xem toàn bộ thời khóa biểu
        </Text>
      </Pressable>
    </View>
  );
};

export default ScheduleCard;
