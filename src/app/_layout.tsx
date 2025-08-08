import "../../global.css";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";

import Constants from "expo-constants";

const publishableKey =
  Constants.expoConfig?.extra?.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 min
      refetchOnWindowFocus: true,
    },
  },
});

export default function RootLayout() {
  useReactQueryDevTools(queryClient);

  if (!publishableKey) {
    console.error("Clerk publishable key is missing");
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
        <Slot />
      </QueryClientProvider>
    </ClerkProvider>
  );
}
