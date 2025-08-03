import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { fetchFoods } from "../../utils/fetchFoods";
import FoodListItem from "../../components/FoodListItem";
import { Feather } from "@expo/vector-icons";
import { useSupabase } from "../../lib/supabase";

export default function HomeScreen() {
  const supabase = useSupabase();
  const { userId } = useAuth();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timeout); // cleanup on new keystroke
  }, [search]);

  const [filters, setFilters] = useState({
    highProtein: false,
    highCarbs: false,
    highFat: false,
    highFiber: false,
  });

  const {
    data: foods,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["foods", userId, debouncedSearch, filters],
    queryFn: () =>
      fetchFoods(supabase, userId!, {
        search: debouncedSearch,
        ...filters,
      }),
    enabled: !!userId,
  });

  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center px-6 py-20 gap-4">
      <Text className="text-gray-500 text-center text-base">
        You haven’t added any foods yet.
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* 🔍 Search Input */}
      <View className="px-4 pt-4">
        <TextInput
          className="border border-gray-300 rounded-xl px-4 py-3 text-base bg-white"
          placeholder="Search foods..."
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <View className="flex-row flex-wrap gap-2 px-4 pt-4 justify-between">
        {[
          { key: "highProtein", label: "Protein" },
          { key: "highCarbs", label: "Carbs" },
          { key: "highFat", label: "Fat" },
          { key: "highFiber", label: "Fiber" },
        ].map(({ key, label }) => (
          <Pressable
            key={key}
            onPress={() =>
              setFilters((prev) => ({
                ...prev,
                [key as keyof typeof prev]: !prev[key as keyof typeof prev],
              }))
            }
            className={`px-3 py-1 rounded-full border ${
              filters[key as keyof typeof filters]
                ? "bg-primary border-primary"
                : "bg-white border-gray-300"
            }`}
          >
            <Text
              className={`text-sm ${
                filters[key as keyof typeof filters]
                  ? "text-white"
                  : "text-gray-700"
              }`}
            >
              {label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* 🔄 List Content */}
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center px-4">
          <Text className="text-red-500 text-center">
            Failed to load foods: {error.message}
          </Text>
        </View>
      ) : (
        <FlatList
          data={foods}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FoodListItem item={item} />}
          ListHeaderComponent={
            <Text className="text-2xl font-bold px-4 mt-4 mb-2">My Foods</Text>
          }
          contentContainerStyle={{
            paddingBottom: 100,
            flexGrow: foods?.length === 0 ? 1 : undefined,
          }}
          ListEmptyComponent={renderEmptyState}
        />
      )}

      {/* ➕ Add Food Button */}
      <Pressable
        onPress={() => router.push("/barcodeV2")}
        className="absolute bottom-20 right-6 bg-primary w-16 h-16 rounded-full items-center justify-center shadow-lg"
      >
        <Feather name="plus" size={28} color="white" />
      </Pressable>
    </SafeAreaView>
  );
}
