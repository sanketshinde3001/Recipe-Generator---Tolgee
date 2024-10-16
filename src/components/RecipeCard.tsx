import React from "react";

// Define types for the props
interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
}

interface RecipeCardProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
  onDelete: (id: number) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick, onDelete }) => {
  return (
    <div className="bg-[#252c42] border border-gray-800 shadow-lg rounded-xl p-6 m-4 w-80 transition-transform duration-300 hover:scale-105">
      <h2 className="text-2xl font-bold mb-3 text-white">{recipe.name}</h2>
      <p className="text-white mb-4">
        <strong>Ingredients:</strong> {recipe.ingredients.slice(0, 3).join(", ")}...
      </p>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => onClick(recipe)}
          className="bg-green-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-green-600 hover:shadow-lg transition-all duration-300"
        >
          View
        </button>
        <button
          onClick={() => onDelete(recipe.id)}
          className="bg-red-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-red-600 hover:shadow-lg transition-all duration-300"
        >
          Delete
        </button>
      </div>
    </div>

  );
};

export default RecipeCard;
