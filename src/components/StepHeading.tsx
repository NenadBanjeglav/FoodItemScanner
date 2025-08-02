import React from "react";
import { Text } from "react-native";

export default function StepHeading({ children }: { children: string }) {
  return (
    <Text className="text-xl font-semibold text-center mb-2">{children}</Text>
  );
}
