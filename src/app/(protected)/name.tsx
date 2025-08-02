// name.tsx
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import ScreenWrapper from "../../components/ScreenWrapper";
import StepHeading from "../../components/StepHeading";
import StepInputField from "../../components/StepInputField";
import StepButton from "../../components/StepButton";
import StepHeader from "../../components/StepHeader";
import { useRouter } from "expo-router";
import { View } from "react-native";

// Outer shell component that forces re-render on param change
export default function NameScreen() {
  const params = useLocalSearchParams();

  return <NameInnerScreen key={JSON.stringify(params)} params={params} />;
}

// Inner component containing actual form logic
function NameInnerScreen({
  params,
}: {
  params: { imageUri?: string; barcode?: string };
}) {
  const { imageUri, barcode } = params;
  const [name, setName] = useState("");
  const router = useRouter();

  const handleNext = () => {
    if (!name.trim()) {
      alert("Please enter a food name.");
      return;
    }

    router.push({
      pathname: "/brand",
      params: { name, imageUri, barcode },
    });
  };

  return (
    <ScreenWrapper>
      <View className="flex-1">
        <StepHeader step={3} total={9} />
        <View className="flex-1  gap-4">
          <StepHeading>What is this food called?</StepHeading>
          <StepInputField
            placeholder="Enter food name"
            value={name}
            onChangeText={setName}
            autoFocus
          />
          <StepButton onPress={handleNext} disabled={!name.trim()}>
            Next
          </StepButton>
        </View>
      </View>
    </ScreenWrapper>
  );
}
