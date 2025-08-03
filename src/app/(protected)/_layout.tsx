import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { ActivityIndicator } from "react-native";
import LogoutButton from "../../components/LogoutButton";

export default function ProtectedLayout() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return <ActivityIndicator />;
  if (!isSignedIn) return <Redirect href={"/signIn"} />;

  return (
    <Stack
      screenOptions={{
        headerShown: false, // 👈 default: hide header
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true, // 👈 override: show only for index
          headerTitle: "Food Scanner",
          headerTitleAlign: "left",
          headerRight: () => <LogoutButton />,
        }}
      />
    </Stack>
  );
}
