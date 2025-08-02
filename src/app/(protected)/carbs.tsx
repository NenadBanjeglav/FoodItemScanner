// carbs.tsx
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import ScreenWrapper from "../../components/ScreenWrapper";
import StepHeading from "../../components/StepHeading";
import StepInputField from "../../components/StepInputField";
import StepButton from "../../components/StepButton";
import StepHeader from "../../components/StepHeader";
import { useRouter } from "expo-router";
import { View } from "react-native";

// Outer wrapper to force remount on param change
export default function CarbsScreen() {
  const params = useLocalSearchParams();

  return <CarbsInnerScreen key={JSON.stringify(params)} params={params} />;
}

// Inner screen with form logic
function CarbsInnerScreen({
  params,
}: {
  params: {
    name?: string;
    brand?: string;
    imageUri?: string;
    barcode?: string;
    calories?: string;
    protein?: string;
    fat?: string;
  };
}) {
  const { name, brand, imageUri, barcode, calories, protein, fat } = params;
  const [carbs, setCarbs] = useState("");
  const router = useRouter();

  const isValid = carbs.trim() !== "" && !isNaN(Number(carbs));

  const handleNext = () => {
    if (!isValid) {
      alert("Please enter a valid carbohydrate value.");
      return;
    }

    router.push({
      pathname: "/fiber",
      params: {
        name,
        brand,
        imageUri,
        barcode,
        calories,
        protein,
        fat,
        carbs,
      },
    });
  };

  return (
    <ScreenWrapper>
      <View className="flex-1">
        <StepHeader step={8} total={9} />

        <View className="flex-1 gap-4">
          <StepHeading>How many carbs per 100g?</StepHeading>

          <StepInputField
            placeholder="Carbohydrates (g)"
            value={carbs}
            onChangeText={setCarbs}
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
