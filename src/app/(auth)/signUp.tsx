import React, { useState } from "react";
import {
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Keyboard,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
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
              {pendingVerification ? "Verify Your Email" : "Sign Up"}
            </Text>

            {pendingVerification ? (
              <>
                <TextInput
                  className="w-full h-12 border border-gray-300 rounded-xl px-4 mb-6 bg-white text-base"
                  value={code}
                  placeholder="Verification code"
                  placeholderTextColor="#94a3b8"
                  onChangeText={setCode}
                  keyboardType="number-pad"
                />
                <Pressable
                  onPress={onVerifyPress}
                  className="bg-primary px-6 py-3 rounded-xl w-full"
                >
                  <Text className="text-white text-center font-semibold text-base">
                    Verify
                  </Text>
                </Pressable>
              </>
            ) : (
              <>
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
                  onPress={onSignUpPress}
                  className="bg-primary px-6 py-3 rounded-xl w-full"
                >
                  <Text className="text-white text-center font-semibold text-base">
                    Continue
                  </Text>
                </Pressable>

                <View className="flex-row justify-center mt-6">
                  <Text className="text-gray-500">
                    Already have an account?
                  </Text>
                  <Link href="/signIn" asChild>
                    <Pressable>
                      <Text className="text-primary font-semibold ml-1">
                        Sign In
                      </Text>
                    </Pressable>
                  </Link>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </Pressable>
    </KeyboardAvoidingView>
  );
}
