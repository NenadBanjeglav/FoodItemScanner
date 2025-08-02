import React from "react";
import { Pressable, Text } from "react-native";

export default function StepButton({
  disabled,
  onPress,
  children,
}: {
  disabled?: boolean;
  onPress: () => void;
  children: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`py-4 rounded-xl ${disabled ? "bg-gray-300" : "bg-primary"}`}
    >
      <Text className="text-white font-semibold text-center text-base">
        {children}
      </Text>
    </Pressable>
  );
}
