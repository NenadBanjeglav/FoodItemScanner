import { Pressable, Text } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function LogoutButton() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.replace("/signIn"); // 👈 Replace stack with sign-in screen
  };

  return (
    <Pressable
      onPress={() => handleLogout()}
      hitSlop={40}
      className=" px-2 rounded-full bg-red-300"
    >
      <Text className="font-light">Logout</Text>
    </Pressable>
  );
}
