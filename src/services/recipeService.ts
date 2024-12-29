import { Recipe } from "@/types/recipe";

const API_KEY = "1234567890"; // Replace with actual API key
const API_URL = "https://api.spoonacular.com/recipes/findByIngredients";

export const searchRecipes = async (ingredients: string[]): Promise<Recipe[]> => {
  const params = new URLSearchParams({
    apiKey: API_KEY,
    ingredients: ingredients.join(","),
    number: "12",
    ranking: "2",
    ignorePantry: "true",
  });

  const response = await fetch(`${API_URL}?${params}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }

  return response.json();
};