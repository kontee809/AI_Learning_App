// src/screens/Teacher/ExamCameraScreen.tsx
import React, { useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";

const ExamCameraScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const { hasPermission, requestPermission } = useCameraPermission();
  // 👇 Lấy trực tiếp camera sau
  const device = useCameraDevice("back");

  useEffect(() => {
    const ask = async () => {
      if (!hasPermission) {
        await requestPermission();
      }
    };
    ask();
  }, [hasPermission, requestPermission]);

  // Chưa có quyền hoặc chưa load xong device
  if (!hasPermission || !device) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>
          Đang chuẩn bị camera, vui lòng chờ...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        {/* <View style={styles.headerTopRow}>
          <Text style={styles.headerSmallText}>16:20</Text>
          <Text style={styles.headerSmallText}>•</Text>
        </View> */}

        <View style={styles.headerBottomRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Đáp án</Text>

          <View style={styles.backBtn} />
        </View>
      </View>

      {/* Camera */}
      <View style={styles.cameraWrapper}>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
        />

        {/* 4 ô vuông xanh */}
        <View style={[styles.cornerBox, styles.topLeft]} />
        <View style={[styles.cornerBox, styles.topRight]} />
        <View style={[styles.cornerBox, styles.bottomLeft]} />
        <View style={[styles.cornerBox, styles.bottomRight]} />

        {/* <View style={styles.centerTextWrapper}>
          <Text style={styles.centerText}>Đưa phiếu vào trong khung</Text>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default ExamCameraScreen;

const BOX_SIZE = 70;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "black",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  loadingText: {
    color: "white",
  },
  header: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  headerSmallText: {
    fontSize: 10,
    color: "white",
  },
  headerBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  backText: {
    fontSize: 24,
    color: "white",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  cameraWrapper: {
    flex: 1,
    backgroundColor: "black",
  },
  cornerBox: {
    position: "absolute",
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderWidth: 4,
    borderColor: "#22c55e",
  },
  topLeft: {
    top: 24,
    left: 24,
  },
  topRight: {
    top: 24,
    right: 24,
  },
  bottomLeft: {
    bottom: 24,
    left: 24,
  },
  bottomRight: {
    bottom: 24,
    right: 24,
  },
  centerTextWrapper: {
    position: "absolute",
    bottom: 32,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  centerText: {
    color: "white",
  },
});
