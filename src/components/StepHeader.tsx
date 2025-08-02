import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

type StepHeaderProps = {
  step: number;
  total: number;
};

export default function StepHeader({ step, total }: StepHeaderProps) {
  const router = useRouter();

  return (
    <View className="flex-row justify-between items-center mb-6">
      <Text className="text-sm text-gray-500">
        Step {step} of {total}
      </Text>

      <Pressable
        onPress={() => router.replace("/")}
        className="p-2 rounded-full"
      >
        <Feather name="x" size={20} color="#6b7280" />
      </Pressable>
    </View>
  );
}
