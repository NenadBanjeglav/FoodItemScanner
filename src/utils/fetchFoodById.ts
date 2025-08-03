import { SupabaseClient } from "@supabase/supabase-js";
import { FoodItem } from "../types/foodItem";

export const fetchFoodById = async (
  supabase: SupabaseClient,
  id: string
): Promise<FoodItem> => {
  const { data, error } = await supabase
    .from("foods")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data as FoodItem;
};
