'use client';

import { FormEvent, useEffect, useState } from 'react';
import { T, useTranslate } from '@tolgee/react';
import RecipeForm from "@/components/RecipeForm";
import RecipeCard from "@/components/RecipeCard";
import Modal from "@/components/Modal";

// Define types for Recipe and the API response
interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  tips: string[];
  createdAt: Date;
}

interface RecipeAPIResponse {
  recipename: string;
  ingredients: string[];
  instructions: string[];
  tips: string[];
}

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null); // To track the currently selected recipe
  const [isModalOpen, setIsModalOpen] = useState(false); // To control the modal

  const generateRecipeDetails = async (recipeName: string): Promise<RecipeAPIResponse | null> => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipeName }),
      });

      const data = await response.json();

      if (response.ok) {
        const { recipename, ingredients, instructions, tips } = data;
        return { recipename, ingredients, instructions, tips };
      } else {
        console.error("Error generating recipe:", data.error);
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const { t } = useTranslate();

  const addRecipe = async (recipeName: string) => {
    const generatedDetails = await generateRecipeDetails(recipeName);
    if (generatedDetails) {
      setRecipes((prev) => [
        ...prev,
        {
          id: Date.now(), // Unique ID for each recipe
          name: generatedDetails.recipename,
          ingredients: generatedDetails.ingredients,
          instructions: generatedDetails.instructions,
          tips: generatedDetails.tips,
          createdAt: new Date(),
        },
      ]);
    } else {
      console.error("Failed to generate recipe details.");
    }
  };

  const deleteRecipe = (id: number) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  const openPopup = (recipe: Recipe) => {
    setSelectedRecipe(recipe); // Set the selected recipe
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null); // Clear selected recipe after closing
  };

  return (
      <div className="container mx-auto  px-4">
        <RecipeForm addRecipe={addRecipe} />
        <div className="flex flex-wrap justify-center mt-8">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => openPopup(recipe)}
              onDelete={() => deleteRecipe(recipe.id)}
            />
          ))}
        </div>


      {isModalOpen && selectedRecipe && (
        <Modal recipe={selectedRecipe} onClose={closeModal} />
      )}
    </div>
  );
}
