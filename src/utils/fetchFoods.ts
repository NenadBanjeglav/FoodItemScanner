import { SupabaseClient } from "@supabase/supabase-js";
import { FoodItem } from "../types/foodItem";

export const fetchFoods = async (
  supabase: SupabaseClient,
  userId: string,
  options: {
    search?: string;
    highProtein?: boolean;
    highCarbs?: boolean;
    highFat?: boolean;
    highFiber?: boolean;
  }
): Promise<FoodItem[]> => {
  let query = supabase
    .from("foods")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (options.search) query = query.ilike("name", `%${options.search}%`);
  if (options.highProtein) query = query.gte("protein", 12);
  if (options.highCarbs) query = query.gte("carbs", 15);
  if (options.highFat) query = query.gte("fat", 10);
  if (options.highFiber) query = query.gte("fiber", 3);

  const { data, error } = await query;

  if (error) {
    console.error("🔥 Supabase error:", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
    throw error;
  }

  return data as FoodItem[];
};
