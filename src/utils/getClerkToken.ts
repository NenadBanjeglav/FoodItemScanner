import * as SecureStore from "expo-secure-store";

export const getClerkToken = async () => {
  const token = await SecureStore.getItemAsync("__session");
  if (!token) throw new Error("Clerk session token not found");
  return token;
};
