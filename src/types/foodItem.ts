export type FoodItem = {
  id: string;
  name: string;
  brand: string | null;
  image_url: string | null;
  protein: number | null;
  fat: number | null;
  carbs: number | null;
  fiber: number | null;
  barcode: string | null;
  calories: number | null;
};
