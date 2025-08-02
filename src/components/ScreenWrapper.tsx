import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenWrapperProps = {
  children: React.ReactNode;
  scrollable?: boolean;
};

export default function ScreenWrapper({
  children,
  scrollable = false,
}: ScreenWrapperProps) {
  const Wrapper = scrollable ? ScrollView : View;

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 100}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="flex-1">
          <Wrapper
            className="flex-1 px-6 justify-center"
            contentContainerStyle={
              scrollable ? { flexGrow: 1, justifyContent: "center" } : undefined
            }
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </Wrapper>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
