import React, { useEffect, useRef, useState } from "react";
import { Platform, TextInput, TextInputProps } from "react-native";

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: TextInputProps["keyboardType"];
  autoFocus?: boolean;
};

export default function StepInputField({
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  autoFocus = false,
}: Props) {
  const inputRef = useRef<TextInput>(null);
  const [ready, setReady] = useState(false);

  // Delay focus until screen is stable
  useEffect(() => {
    if (autoFocus) {
      const timeout = setTimeout(() => setReady(true), 150);
      return () => clearTimeout(timeout);
    }
  }, [autoFocus]);

  // Actually focus the input after delay
  useEffect(() => {
    if (ready && inputRef.current) {
      inputRef.current.focus();
    }
  }, [ready]);

  return (
    <TextInput
      ref={inputRef}
      className="h-14 border border-gray-300 rounded-xl px-4 text-lg bg-white"
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={
        Platform.OS === "ios"
          ? keyboardType
          : keyboardType === "numeric"
            ? "decimal-pad"
            : keyboardType
      }
    />
  );
}
