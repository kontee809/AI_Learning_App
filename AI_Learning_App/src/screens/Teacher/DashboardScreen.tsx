import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import DateCard from "../../components/DateCard";
import ScheduleCard, { Subject } from "../../components/ScheduleCard";


const subjects: Subject[] = [
  { id: 1, name: "Môn toán", time: "07:30 - 08:15", status: "done" },
  { id: 2, name: "Môn Văn", time: "08:25 - 09:10", status: "done" },
  { id: 3, name: "Môn Anh", time: "09:45 - 10:30", status: "not_yet" },
];

export default function Screen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="p-4">

        {/* Date Component */}
        <DateCard
            dateText="Thứ 4, ngày 14 tháng 05 năm 2025"
            greeting="Chào, N.Anh Tuấn"
            classLabel="Lớp A1"
            studentCode="HS11111"
            birthday="2000-12-12"
            ageText="10 tuổi"
            avatarLetter="A"
            attendanceLabel="Điểm danh"
            attendanceText="Đã điểm danh"
            classSize="40/40"
        />

        {/* Schedule Component */}
        <ScheduleCard
          title="Thời khóa biểu hôm nay"
          dateText="Thứ 4, ngày 14 tháng 05 năm 2025"
          subjects={subjects}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
