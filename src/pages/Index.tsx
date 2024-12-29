import { useState } from "react";
import { IngredientInput } from "@/components/IngredientInput";
import { RecipeCard } from "@/components/RecipeCard";
import { searchRecipes } from "@/services/recipeService";
import { Recipe } from "@/types/recipe";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (ingredients: string[]) => {
    setLoading(true);
    try {
      const results = await searchRecipes(ingredients);
      setRecipes(results);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch recipes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-recipe-neutral">Recipe Finder</h1>
          <p className="text-muted-foreground">
            Enter your ingredients and discover delicious recipes you can make
          </p>
        </div>

        <IngredientInput onSearch={handleSearch} />

        {loading ? (
          <div className="text-center text-muted-foreground">Loading recipes...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;