import { Recipe } from "@/types/recipe";

const API_URL = "https://api.spoonacular.com/recipes/findByIngredients";

const getApiKey = () => {
  return localStorage.getItem("spoonacular_api_key");
};

export const setApiKey = (key: string) => {
  localStorage.setItem("spoonacular_api_key", key);
};

export const searchRecipes = async (ingredients: string[]): Promise<Recipe[]> => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    throw new Error("API key not found. Please set your Spoonacular API key first.");
  }

  const params = new URLSearchParams({
    apiKey,
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