import "../../global.css";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";

import Constants from "expo-constants";

console.log(
  "🔍 Supabase URL:",
  Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_URL
);
console.log(
  "🔍 Clerk Key:",
  Constants.expoConfig?.extra?.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
);

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

  return (
    <ClerkProvider tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
        <Slot />
      </QueryClientProvider>
    </ClerkProvider>
  );
}
