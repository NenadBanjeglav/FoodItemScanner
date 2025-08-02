// components/DismissButton.tsx
import React from "react";
import { Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

type DismissButtonProps = {
  disabled?: boolean;
  text?: string;
};

export default function DismissButton({
  disabled = false,
  text = "Dismiss",
}: DismissButtonProps) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.replace("/")}
      disabled={disabled}
      className={`mt-3 rounded-xl py-3 items-center ${
        disabled ? "bg-gray-300" : "bg-gray-200"
      }`}
    >
      <Text
        className={`text-base font-semibold ${
          disabled ? "text-gray-400" : "text-gray-700"
        }`}
      >
        {text}
      </Text>
    </Pressable>
  );
}
