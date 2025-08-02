// fiber.tsx
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import ScreenWrapper from "../../components/ScreenWrapper";
import StepHeading from "../../components/StepHeading";
import StepInputField from "../../components/StepInputField";
import StepButton from "../../components/StepButton";
import StepHeader from "../../components/StepHeader";
import { useRouter } from "expo-router";
import { View } from "react-native";

// Outer wrapper to force remount when params change
export default function FiberScreen() {
  const params = useLocalSearchParams();

  return <FiberInnerScreen key={JSON.stringify(params)} params={params} />;
}

// Inner component with the logic
function FiberInnerScreen({
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
    carbs?: string;
  };
}) {
  const { name, brand, imageUri, barcode, calories, protein, fat, carbs } =
    params;

  const [fiber, setFiber] = useState("");
  const router = useRouter();

  const isValid = fiber.trim() !== "" && !isNaN(Number(fiber));

  const handleNext = () => {
    if (!isValid) {
      alert("Please enter a valid fiber value.");
      return;
    }

    router.push({
      pathname: "/preview",
      params: {
        name,
        brand,
        imageUri,
        barcode,
        calories,
        protein,
        fat,
        carbs,
        fiber,
      },
    });
  };

  return (
    <ScreenWrapper>
      <View className="flex-1">
        <StepHeader step={9} total={9} />

        <View className="flex-1 gap-4">
          <StepHeading>How much fiber per 100g?</StepHeading>

          <StepInputField
            placeholder="Fiber (g)"
            value={fiber}
            onChangeText={setFiber}
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
