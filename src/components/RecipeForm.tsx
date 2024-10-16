'use client'
import React, { useState, FormEvent } from 'react';

import { useTranslate } from '@tolgee/react';

// Define the props interface
interface RecipeFormProps {
  addRecipe: (input: string) => Promise<void>; 
}

const RecipeForm: React.FC<RecipeFormProps> = ({ addRecipe }) => {
  
  const { t } = useTranslate();
  const [input, setInput] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      await addRecipe(input); // Ensure the addRecipe call awaits
      setInput(''); // Clear input after adding the recipe
    } catch (error) {
      console.error('Error generating recipe:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-12 flex justify-center">
    <div className={`relative transition-all duration-300 ease-in-out ${isFocused ? 'w-[50%]' : 'w-1/5'}`}>
      <div className="flex gap-3 items-center bg-[#171d2f] py-2 border-[1px] border-[#2828b5] rounded-full shadow-md overflow-hidden transition-all duration-300 ease-in-out px-4 mx-auto">
        <input
          type="text"
          placeholder={t('input-text')}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`flex-grow py-3 px-4 border border-transparent bg-[#0f131f] text-white text-left  text-md outline-none rounded-full transition-all duration-300 ease-in-out `}
        />
      <button
        type="submit"
        className="flex items-center justify-center hover:bg-[#0f131f] rounded-xl px-2 py-2"
      >
        <img src="/img/submit.svg" alt="Submit" className="min-w-[24px] min-h-[24px]" />
      </button>
      </div>
    </div>
  </form>
  
  );
};

export default RecipeForm;
