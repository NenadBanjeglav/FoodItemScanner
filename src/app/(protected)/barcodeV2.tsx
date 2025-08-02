import { View, Text, ActivityIndicator, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import {
  CameraView,
  useCameraPermissions,
  BarcodeScanningResult,
} from "expo-camera";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import StepHeader from "../../components/StepHeader";

export default function BarcodeV2Screen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission]);

  const handleBarcodeScanned = (result: BarcodeScanningResult) => {
    if (scanned) return;

    const barcode = result.data;
    if (!barcode) return;

    setScanned(true);

    router.replace({
      pathname: "/photo",
      params: { barcode },
    });
  };

  const handleSkip = () => {
    router.replace({
      pathname: "/photo",
      params: {}, // no barcode passed
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
      <StepHeader step={1} total={9} />
      <CameraView
        style={{ flex: 1 }}
        onBarcodeScanned={handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e", "code128"],
        }}
      />

      {/* Scan box */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: "40%",
          left: "10%",
          width: "80%",
          height: 100,
          borderWidth: 2,
          borderColor: "white",
          borderRadius: 8,
        }}
      />

      {/* Hints and Skip */}
      <View className="absolute bottom-20 w-full px-6 items-center">
        <Text className="text-white text-base text-center mb-4">
          Scan the barcode on the food package if available.
        </Text>

        <Pressable
          onPress={handleSkip}
          className="bg-white/80 px-4 py-2 rounded-xl"
        >
          <Text className="text-black font-medium">Skip — No Barcode</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
