import React, { useState, useCallback } from "react";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Platform,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <KeyboardAvoidingView
      className="flex-1 "
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 100}
    >
      <Pressable onPress={Keyboard.dismiss} className="flex-1 bg-white">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="pt-36 px-6">
            <View className="items-center mb-4">
              <FontAwesome name="barcode" size={48} color="#2563eb" />
            </View>
            <Text className="text-2xl font-bold text-primary text-center mb-6">
              Sign In
            </Text>

            <TextInput
              className="w-full h-12 border border-gray-300 rounded-xl px-4 mb-4 bg-white text-base"
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Enter email"
              placeholderTextColor="#94a3b8"
              value={emailAddress}
              onChangeText={setEmailAddress}
            />
            <TextInput
              className="w-full h-12 border border-gray-300 rounded-xl px-4 mb-6 bg-white text-base"
              secureTextEntry
              placeholder="Enter password"
              placeholderTextColor="#94a3b8"
              value={password}
              onChangeText={setPassword}
            />

            <Pressable
              onPress={onSignInPress}
              className="bg-primary px-6 py-3 rounded-xl w-full"
            >
              <Text className="text-white text-center font-semibold text-base">
                Sign In
              </Text>
            </Pressable>

            <View className="flex-row justify-center mt-6">
              <Text className="text-gray-500">Don't have an account?</Text>
              <Link href="/signUp" asChild>
                <Pressable>
                  <Text className="text-primary font-semibold ml-1">
                    Sign Up
                  </Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </ScrollView>
      </Pressable>
    </KeyboardAvoidingView>
  );
}
