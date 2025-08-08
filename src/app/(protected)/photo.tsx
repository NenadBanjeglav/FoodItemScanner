import React, { useEffect, useRef, useState, useCallback } from "react";
import { View, ActivityIndicator, Pressable, Text } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Feather } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as FileSystem from "expo-file-system";
import StepHeader from "../../components/StepHeader";

const moveToAppStorage = async (uri: string) => {
  const fileName = uri.split("/").pop();
  const newPath = `${FileSystem.documentDirectory}${fileName}`;

  try {
    await FileSystem.moveAsync({ from: uri, to: newPath });
    return newPath;
  } catch (e) {
    console.error("❌ Failed to move image:", e);
    return uri;
  }
};

export default function PhotoScreen() {
  const { barcode } = useLocalSearchParams<{ barcode?: string }>();
  const [permission, requestPermission] = useCameraPermissions();
  const [isPressed, setIsPressed] = useState(false);
  const [flashVisible, setFlashVisible] = useState(false);
  const [active, setActive] = useState(false);

  const router = useRouter();
  const camera = useRef<CameraView>(null);

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission]);

  useFocusEffect(
    useCallback(() => {
      setActive(true);
      return () => setActive(false);
    }, [])
  );

  const handleCapturePress = async () => {
    setIsPressed(true);
    setFlashVisible(true);

    setTimeout(() => {
      setIsPressed(false);
      setFlashVisible(false);
    }, 150);

    await takePicture();
  };

  const takePicture = async () => {
    const res = await camera.current?.takePictureAsync();
    if (!res) return;

    const movedUri = await moveToAppStorage(res.uri);

    router.replace({
      pathname: "/name",
      params: {
        imageUri: movedUri,
        barcode,
      },
    });
  };
  if (!permission?.granted) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
        <Text className="mt-4">Requesting camera permission...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black  pt-4">
      <StepHeader step={2} total={9} />

      {active && (
        <CameraView
          ref={camera}
          style={{ flex: 1 }}
          facing="back"
          onMountError={(e) => console.log("Camera mount error", e)}
          onCameraReady={() => console.log("Camera ready")}
        />
      )}

      <View className="absolute bottom-16 w-full px-6 items-center space-y-4">
        <Pressable
          onPress={handleCapturePress}
          className={`w-20 h-20 rounded-full bg-white items-center justify-center mb-4 ${
            isPressed ? "scale-95" : "scale-100"
          }`}
        >
          <Feather name="camera" size={28} color="black" />
        </Pressable>

        <Text className="text-white text-sm text-center opacity-80">
          Take a clear photo of the food or its packaging.
        </Text>
      </View>

      {flashVisible && (
        <View className="absolute inset-0 bg-white opacity-80 z-50" />
      )}
    </SafeAreaView>
  );
}
