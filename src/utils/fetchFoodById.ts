// utils/fetchFoodById.ts
import { supabase } from "../lib/supabase";
import { FoodItem } from "../types/foodItem";

export const fetchFoodById = async (id: string): Promise<FoodItem> => {
  const { data, error } = await supabase
    .from("foods")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};
