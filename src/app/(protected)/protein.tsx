// protein.tsx
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import ScreenWrapper from "../../components/ScreenWrapper";
import StepHeading from "../../components/StepHeading";
import StepInputField from "../../components/StepInputField";
import StepButton from "../../components/StepButton";
import StepHeader from "../../components/StepHeader";
import { useRouter } from "expo-router";
import { View } from "react-native";

// Outer wrapper to trigger remount on param change
export default function ProteinScreen() {
  const params = useLocalSearchParams();

  return <ProteinInnerScreen key={JSON.stringify(params)} params={params} />;
}

// Inner component with actual screen logic
function ProteinInnerScreen({
  params,
}: {
  params: {
    name?: string;
    brand?: string;
    imageUri?: string;
    barcode?: string;
    calories?: string;
  };
}) {
  const { name, brand, imageUri, barcode, calories } = params;
  const [protein, setProtein] = useState("");
  const router = useRouter();

  const isValid = protein.trim() !== "" && !isNaN(Number(protein));

  const handleNext = () => {
    if (!isValid) {
      alert("Please enter a valid protein value.");
      return;
    }

    router.push({
      pathname: "/fat",
      params: {
        name,
        brand,
        imageUri,
        barcode,
        calories,
        protein,
      },
    });
  };

  return (
    <ScreenWrapper>
      <View className="flex-1">
        <StepHeader step={6} total={9} />

        <View className="flex-1 gap-4">
          <StepHeading>How much protein per 100g?</StepHeading>

          <StepInputField
            placeholder="Protein (g)"
            value={protein}
            onChangeText={setProtein}
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
