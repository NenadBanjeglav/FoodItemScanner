import { SupabaseClient } from "@supabase/supabase-js";

const BUCKET = "food-images";

export const deleteFoodById = async (
  supabase: SupabaseClient,
  id: string
): Promise<void> => {
  // 1. Get the food entry (to access the image URL)
  const { data: food, error: fetchError } = await supabase
    .from("foods")
    .select("image_url")
    .eq("id", id)
    .single();

  if (fetchError) throw new Error(fetchError.message);

  // 2. Delete image from storage if it exists
  if (food?.image_url) {
    try {
      const filePath = extractPathFromUrl(food.image_url);

      const { error: storageError } = await supabase.storage
        .from(BUCKET)
        .remove([filePath]);

      if (storageError) {
        console.warn("Image deletion warning:", storageError.message);
      }
    } catch (err) {
      console.warn("Image path parse failed:", err);
    }
  }

  // 3. Delete the food row from the database
  const { error } = await supabase.from("foods").delete().eq("id", id);

  if (error) throw new Error(error.message);
};

// 🔧 Helper function to extract the file path from the public URL
function extractPathFromUrl(url: string): string {
  const parts = url.split(`/storage/v1/object/public/${BUCKET}/`);
  if (parts.length !== 2) {
    throw new Error("Invalid image URL format.");
  }
  return parts[1];
}
