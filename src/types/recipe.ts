export interface Recipe {
  id: number;
  title: string;
  image: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
  missedIngredients: Ingredient[];
  usedIngredients: Ingredient[];
  unusedIngredients: Ingredient[];
}

export interface Ingredient {
  id: number;
  amount: number;
  unit: string;
  name: string;
  original: string;
  originalName: string;
  image: string;
}