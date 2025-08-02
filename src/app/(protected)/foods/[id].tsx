import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import StepButton from "../../../components/StepButton";
import { fetchFoodById } from "../../../utils/fetchFoodById";
import { deleteFoodById } from "../../../utils/deleteFoodById";

export default function FoodItemDetailsScreen() {
  const queryClient = useQueryClient();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const {
    data: food,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["food", id],
    queryFn: () => fetchFoodById(id!),
    enabled: !!id,
  });

  const { mutate: deleteFood, isPending: deleting } = useMutation({
    mutationFn: (id: string) => deleteFoodById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] });
      router.replace("/");
    },
    onError: (err) => {
      Alert.alert("Error", err.message);
    },
  });

  const handleDelete = () => {
    Alert.alert("Delete Food", "Are you sure you want to delete this food?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteFood(food!.id),
      },
    ]);
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !food) {
    return (
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-red-500 text-center">
          Failed to load food item.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <Text className="text-2xl font-bold text-center mt-4 mb-6">
          {food.name}
        </Text>

        {/* 🖼️ Image + Delete Icon */}
        {food.image_url && (
          <View className="relative mb-4">
            <Image
              source={{ uri: food.image_url }}
              className="w-full h-52 rounded-xl"
              resizeMode="cover"
            />
            <Pressable
              onPress={handleDelete}
              className="absolute top-3 right-3 bg-white/90 p-2 rounded-full"
            >
              <Feather name="trash-2" size={20} color="red" />
            </Pressable>
          </View>
        )}

        {/* 📋 Food Info */}
        <View className="gap-2">
          {food.brand && (
            <Text className="text-base text-gray-600">Brand: {food.brand}</Text>
          )}
          {food.barcode && (
            <Text className="text-base text-gray-600">
              Barcode: {food.barcode}
            </Text>
          )}
          <Text className="text-base">
            {food.calories} kcal / {food.protein}g protein / {food.fat}g fat /{" "}
            {food.carbs}g carbs / {food.fiber}g fiber
          </Text>
        </View>

        {/* 🔙 Back Button */}
        <View className="mt-auto">
          <StepButton onPress={() => router.replace("/")}>Back Home</StepButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
