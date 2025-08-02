import { router } from "expo-router";
import * as FileSystem from "expo-file-system";
import { supabase } from "../lib/supabase";

export function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64); // decode base64 to binary string
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

const uploadToSupabase = async (uri: string, fileName: string) => {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const fileBuffer = base64ToUint8Array(base64);

    const { data, error } = await supabase.storage
      .from("food-images")
      .upload(fileName, fileBuffer, {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (error) {
      console.error("❌ Upload failed:", error.message);
      return;
    }

    console.log("✅ Uploaded image:", data);
    router.back();
  } catch (err) {
    console.error("❌ Upload error:", err);
  }
};
