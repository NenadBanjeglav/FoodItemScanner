// fat.tsx
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import ScreenWrapper from "../../components/ScreenWrapper";
import StepHeading from "../../components/StepHeading";
import StepInputField from "../../components/StepInputField";
import StepButton from "../../components/StepButton";
import StepHeader from "../../components/StepHeader";
import { useRouter } from "expo-router";
import { View } from "react-native";

// Outer wrapper: forces remount on param change
export default function FatScreen() {
  const params = useLocalSearchParams();

  return <FatInnerScreen key={JSON.stringify(params)} params={params} />;
}

// Inner component with actual form logic
function FatInnerScreen({
  params,
}: {
  params: {
    name?: string;
    brand?: string;
    imageUri?: string;
    barcode?: string;
    calories?: string;
    protein?: string;
  };
}) {
  const { name, brand, imageUri, barcode, calories, protein } = params;
  const [fat, setFat] = useState("");
  const router = useRouter();

  const isValid = fat.trim() !== "" && !isNaN(Number(fat));

  const handleNext = () => {
    if (!isValid) {
      alert("Please enter a valid fat value.");
      return;
    }

    router.push({
      pathname: "/carbs",
      params: {
        name,
        brand,
        imageUri,
        barcode,
        calories,
        protein,
        fat,
      },
    });
  };

  return (
    <ScreenWrapper>
      <View className="flex-1">
        <StepHeader step={7} total={9} />

        <View className="flex-1 gap-4">
          <StepHeading>How much fat per 100g?</StepHeading>

          <StepInputField
            placeholder="Fat (g)"
            value={fat}
            onChangeText={setFat}
            keyboardType="numeric"
            autoFocus
          />

          <StepButton onPress={handleNext} disabled={!isValid}>
            Next
          </StepButton>
        </View>
      </View>
    </ScreenWrapper>
  );
}
