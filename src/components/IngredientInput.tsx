import React, { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface IngredientInputProps {
  onSearch: (ingredients: string[]) => void;
}

export const IngredientInput = ({ onSearch }: IngredientInputProps) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");

  const addIngredient = () => {
    if (currentInput.trim() && !ingredients.includes(currentInput.trim())) {
      setIngredients([...ingredients, currentInput.trim()]);
      setCurrentInput("");
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addIngredient();
    }
  };

  const handleSearch = () => {
    if (ingredients.length > 0) {
      onSearch(ingredients);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="flex gap-2">
        <Input
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter an ingredient and press Enter"
          className="flex-1"
        />
        <Button onClick={addIngredient} variant="secondary">
          Add
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {ingredients.map((ingredient, index) => (
          <span
            key={index}
            className="bg-recipe-secondary text-white px-3 py-1 rounded-full flex items-center gap-2 animate-fadeIn"
          >
            {ingredient}
            <button
              onClick={() => removeIngredient(index)}
              className="hover:text-recipe-neutral transition-colors"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>

      {ingredients.length > 0 && (
        <Button onClick={handleSearch} className="w-full bg-recipe-primary hover:bg-recipe-primary/90">
          Find Recipes
        </Button>
      )}
    </div>
  );
};