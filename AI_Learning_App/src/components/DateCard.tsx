// components/DateCard.tsx
import React from "react";
import { View, Text } from "react-native";

interface DateCardProps {
  dateText: string;
  greeting: string;
  classLabel: string;
  studentCode: string;
  birthday: string;
  ageText: string;
  avatarLetter?: string;
  attendanceLabel?: string;
  attendanceText?: string;
  classSize?: string;
}

const DateCard: React.FC<DateCardProps> = ({
  dateText,
  greeting,
  classLabel,
  studentCode,
  birthday,
  ageText,
  avatarLetter = "A",
  attendanceLabel = "Điểm danh",
  attendanceText = "Đã điểm danh",
  classSize = "40/40",
}) => {
  return (
    <>
      {/* Blue header */}
      <View className="bg-blue-600 rounded-3xl px-4 pt-6 pb-6 mb-6">
        <Text className="text-center text-white text-xl font-semibold mt-2">
          2024-2025
        </Text>
      

      {/* White Card */}
      <View className="mt-4 bg-white rounded-3xl p-4 shadow-md pt-6">

        {/* Dòng ngày */}
        <View className="self-center bg-slate-100 rounded-full px-4 py-1 mb-3">
          <Text className="text-xs text-slate-700">{dateText}</Text>
        </View>

        <View className="flex-row items-center">
          
          {/* Avatar */}
          <View className="w-14 h-14 rounded-full bg-orange-200 items-center justify-center mr-4">
            <Text className="text-xl font-bold text-orange-700">
              {avatarLetter}
            </Text>
          </View>

          {/* Thông tin */}
          <View className="flex-1">
            
            <View className="flex-row items-center justify-between">
              <Text className="text-base font-semibold text-slate-900">
                {greeting}
              </Text>

              <View className="bg-blue-500 rounded-full px-3 py-1">
                <Text className="text-xs font-semibold text-white">
                  {classLabel}
                </Text>
              </View>
            </View>

            <Text className="text-xs text-slate-500 mt-1">
              Học sinh - {studentCode}
            </Text>

            <View className="flex-row mt-0.5">
              <Text className="text-xs text-slate-500 mr-2">{birthday}</Text>
              <Text className="text-xs text-blue-500 underline">{ageText}</Text>
            </View>

            {/* Điểm danh + sĩ số */}
            <View className="flex-row items-center justify-between mt-3">
              
              <View className="flex-row items-center">
                <View className="w-6 h-6 rounded-full border border-slate-300 items-center justify-center mr-2">
                  <Text className="text-xs">✓</Text>
                </View>

                <View>
                  <Text className="text-xs text-slate-400">{attendanceLabel}</Text>
                  <Text className="text-xs font-semibold text-slate-800">
                    {attendanceText}
                  </Text>
                </View>
              </View>

              <View className="items-end">
                <Text className="text-xs text-slate-400 mb-0.5">Sĩ số</Text>
                <Text className="text-xs font-semibold text-slate-800">
                  {classSize}
                </Text>
              </View>

            </View>

          </View>
        </View>

      </View>
      </View>
    </>
  );
};

export default DateCard;
