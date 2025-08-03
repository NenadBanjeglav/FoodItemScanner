import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, Text, View } from "react-native";
import ScreenWrapper from "../../components/ScreenWrapper";
import StepButton from "../../components/StepButton";
import { uploadImageAsync } from "../../utils/uploadImage";
import { useSupabase } from "../../lib/supabase";
import { useAuth } from "@clerk/clerk-expo";
import DismissButton from "../../components/DismissButton";
import { useQueryClient } from "@tanstack/react-query";

export default function PreviewScreen() {
  const queryClient = useQueryClient();
  const supabase = useSupabase();

  const {
    name,
    brand,
    imageUri,
    barcode,
    calories,
    protein,
    fat,
    carbs,
    fiber,
  } = useLocalSearchParams<{
    name: string;
    brand?: string;
    imageUri?: string;
    barcode?: string;
    calories?: string;
    protein?: string;
    fat?: string;
    carbs?: string;
    fiber?: string;
  }>();

  const router = useRouter();
  const { userId } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);

    try {
      let imageUrl: string | null = null;

      // 1. Upload image
      if (imageUri) {
        imageUrl = await uploadImageAsync(supabase, imageUri); // <-- pass supabase
        if (!imageUrl) {
          alert("Image upload failed.");
          setLoading(false);
          return;
        }
      }

      // 2. Insert food record
      const { error } = await supabase.from("foods").insert({
        user_id: userId,
        name,
        brand,
        barcode,
        image_url: imageUrl,
        calories: parseFloat(calories!),
        protein: parseFloat(protein!),
        fat: parseFloat(fat!),
        carbs: parseFloat(carbs!),
        fiber: parseFloat(fiber!),
      });

      if (error) {
        console.error("Supabase insert error:", error);
        alert("Could not save food entry.");
        setLoading(false);
        return;
      }

      // 3. Refresh cache and navigate
      queryClient.invalidateQueries({ queryKey: ["foods"] });
      alert("Food saved!");
      router.replace("/");
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <View className="flex-1 ">
        <Text className="text-xl font-semibold text-center mb-4">Preview</Text>

        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={{
              width: "100%",
              height: 160,
              borderRadius: 12,
              marginBottom: 16,
            }}
            resizeMode="cover"
          />
        )}

        <View style={{ gap: 4 }}>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>{name}</Text>
          {brand ? (
            <Text style={{ color: "#6b7280" }}>Brand: {brand}</Text>
          ) : null}
          {barcode ? (
            <Text style={{ color: "#6b7280" }}>Barcode: {barcode}</Text>
          ) : null}
          <Text style={{ color: "#374151" }}>
            {calories} kcal / {protein}g protein / {fat}g fat / {carbs}g carbs /{" "}
            {fiber}g fiber
          </Text>
        </View>

        <View style={{ marginTop: 32 }}>
          <StepButton onPress={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save to My Foods"}
          </StepButton>

          <DismissButton disabled={loading} />
        </View>
      </View>
    </ScreenWrapper>
  );
}
