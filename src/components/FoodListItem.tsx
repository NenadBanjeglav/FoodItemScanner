import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { FoodItem } from "../types/foodItem";
import { useRouter } from "expo-router"; // ✅ import router

export default function FoodListItem({ item }: { item: FoodItem }) {
  const router = useRouter(); // ✅ initialize router

  return (
    <Pressable
      className="border-b border-gray-200 py-4 flex-row gap-4 items-center px-4"
      onPress={() => router.push(`/foods/${item.id}`)} // ✅ navigate on press
    >
      {item.image_url && (
        <Image
          source={{ uri: item.image_url }}
          className="w-16 h-16 rounded-md"
        />
      )}
      <View className="flex-1">
        <Text className="font-semibold text-base">{item.name}</Text>
        {item.brand && <Text className="text-gray-500">{item.brand}</Text>}
        <Text className="text-xs text-gray-500">
          Protein: {item.protein ?? 0}g, Fat: {item.fat ?? 0}g, Carbs:{" "}
          {item.carbs ?? 0}g
        </Text>
      </View>
    </Pressable>
  );
}
