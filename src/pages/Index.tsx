import { useState } from "react";
import { IngredientInput } from "@/components/IngredientInput";
import { RecipeCard } from "@/components/RecipeCard";
import { searchRecipes, setApiKey } from "@/services/recipeService";
import { Recipe } from "@/types/recipe";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKeyState] = useState("");
  const { toast } = useToast();

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      setApiKey(apiKey.trim());
      toast({
        title: "Success",
        description: "API key has been saved",
      });
    }
  };

  const handleSearch = async (ingredients: string[]) => {
    setLoading(true);
    try {
      const results = await searchRecipes(ingredients);
      setRecipes(results);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch recipes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4 bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-sm">
          <h1 className="text-4xl font-bold text-recipe-neutral">Recipe Finder</h1>
          <p className="text-muted-foreground">
            Enter your ingredients and discover delicious recipes you can make
          </p>
        </div>

        <div className="max-w-md mx-auto space-y-2 bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm">
          <div className="flex gap-2">
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKeyState(e.target.value)}
              placeholder="Enter your Spoonacular API key"
              className="flex-1"
            />
            <Button onClick={handleApiKeySubmit}>Save Key</Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Get your API key from{" "}
            <a
              href="https://spoonacular.com/food-api"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              Spoonacular
            </a>
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