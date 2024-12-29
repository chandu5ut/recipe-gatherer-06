import { Recipe } from "@/types/recipe";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow animate-fadeIn">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold line-clamp-2">
          {recipe.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{recipe.usedIngredientCount} ingredients matched</span>
          <span>{recipe.missedIngredientCount} needed</span>
        </div>
      </CardContent>
    </Card>
  );
};