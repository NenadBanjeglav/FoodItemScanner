// brand.tsx
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import ScreenWrapper from "../../components/ScreenWrapper";
import StepHeading from "../../components/StepHeading";
import StepInputField from "../../components/StepInputField";
import StepButton from "../../components/StepButton";
import StepHeader from "../../components/StepHeader";
import { useRouter } from "expo-router";
import { View } from "react-native";

// Outer wrapper that ensures remount when params change
export default function BrandScreen() {
  const params = useLocalSearchParams();

  return <BrandInnerScreen key={JSON.stringify(params)} params={params} />;
}

// Inner component with the screen logic
function BrandInnerScreen({
  params,
}: {
  params: { name?: string; imageUri?: string; barcode?: string };
}) {
  const { name, imageUri, barcode } = params;
  const [brand, setBrand] = useState("");
  const router = useRouter();

  const handleNext = () => {
    router.push({
      pathname: "/calories",
      params: {
        name,
        imageUri,
        barcode,
        brand,
      },
    });
  };

  return (
    <ScreenWrapper>
      <View className="flex-1">
        <StepHeader step={4} total={9} />

        <View className="flex-1 gap-4">
          <StepHeading>What's the brand name? (optional)</StepHeading>

          <StepInputField
            placeholder="e.g. Nestlé, Lidl, Local Farm"
            value={brand}
            onChangeText={setBrand}
            autoFocus
          />

          <StepButton onPress={handleNext}>Next</StepButton>
        </View>
      </View>
    </ScreenWrapper>
  );
}
