// calories.tsx
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import ScreenWrapper from "../../components/ScreenWrapper";
import StepHeading from "../../components/StepHeading";
import StepInputField from "../../components/StepInputField";
import StepButton from "../../components/StepButton";
import StepHeader from "../../components/StepHeader";
import { useRouter } from "expo-router";
import { View } from "react-native";

// Outer wrapper: triggers remount on param change
export default function CaloriesScreen() {
  const params = useLocalSearchParams();

  return <CaloriesInnerScreen key={JSON.stringify(params)} params={params} />;
}

// Inner screen: handles form logic and UI
function CaloriesInnerScreen({
  params,
}: {
  params: {
    name?: string;
    brand?: string;
    imageUri?: string;
    barcode?: string;
  };
}) {
  const { name, brand, imageUri, barcode } = params;
  const [calories, setCalories] = useState("");
  const router = useRouter();

  const isValid = calories.trim() !== "" && !isNaN(Number(calories));

  const handleNext = () => {
    if (!isValid) {
      alert("Please enter a valid number of calories.");
      return;
    }

    router.push({
      pathname: "/protein",
      params: {
        name,
        brand,
        imageUri,
        barcode,
        calories,
      },
    });
  };

  return (
    <ScreenWrapper>
      <View className="flex-1">
        <StepHeader step={5} total={9} />

        <View className="flex-1 gap-4">
          <StepHeading>How many calories per 100g?</StepHeading>

          <StepInputField
            placeholder="Calories"
            value={calories}
            onChangeText={setCalories}
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
