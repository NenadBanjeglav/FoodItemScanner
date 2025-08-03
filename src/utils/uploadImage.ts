import * as FileSystem from "expo-file-system";
import { SupabaseClient } from "@supabase/supabase-js";
import { base64ToUint8Array } from "./utils";

const BUCKET = "food-images";

export const uploadImageAsync = async (
  supabase: SupabaseClient,
  uri: string
): Promise<string | null> => {
  try {
    const fileExt = uri.split(".").pop() || "jpg";
    const fileName = `image_${Date.now()}.${fileExt}`;
    const filePath = fileName;

    // 1. Read image file as base64
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // 2. Convert base64 to binary
    const fileBytes = base64ToUint8Array(base64);

    // 3. Upload with Clerk-authenticated Supabase client
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(filePath, fileBytes, {
        contentType: "image/jpeg",
        upsert: false,
      });

    if (error) {
      console.error("Image upload failed:", error);
      return null;
    }

    // 4. Return public URL
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
    return data?.publicUrl ?? null;
  } catch (err) {
    console.error("uploadImageAsync error:", err);
    return null;
  }
};
