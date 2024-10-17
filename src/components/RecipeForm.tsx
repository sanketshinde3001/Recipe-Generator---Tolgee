'use client';
import React, { useState, FormEvent,useEffect } from 'react';
import { useTranslate } from '@tolgee/react';

// Define the props interface
interface RecipeFormProps {
  addRecipe: (input: string) => Promise<void>;
  isrunnig: boolean;  // renamed to isRunning for clarity
}

const RecipeForm: React.FC<RecipeFormProps> = ({ addRecipe, isrunnig }) => {
  const { t } = useTranslate();
  const [input, setInput] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    console.log('isRunning changed:', isrunnig);
  }, [isrunnig]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      setIsFocused(false);  // Remove focus when form is submitted
      await addRecipe(input); // Ensure the addRecipe call awaits
      setInput(''); // Clear input after adding the recipe
    } catch (error) {
      console.error('Error generating recipe:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-12 flex justify-center">
      <div
        className={`relative transition-all duration-300 ease-in-out ${
          isFocused
            ? 'w-[90%] sm:w-[60%] md:w-[60%] lg:w-[50%] xl:w-[40%]'
            : 'w-[90%] sm:w-2/5 md:w-1/3 lg:w-1/4 xl:w-1/5'
        }`}
      >
        <div className="flex gap-3 items-center bg-[#171d2f] py-2 border-[1px] border-[#2828b5] rounded-full shadow-md overflow-hidden transition-all duration-300 ease-in-out px-4 mx-auto">
          <input
            type="text"
            placeholder={t('input-text')}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`flex-grow py-3 px-4 border border-transparent bg-[#0f131f] text-white text-left text-md outline-none rounded-full transition-all duration-300 ease-in-out`}
            disabled={isrunnig}  // Disable input while loading
          />

          {/* Conditionally render spinner or submit button */}
          {isrunnig ? (
            <div className="flex items-center justify-center rounded-xl px-2 py-2">
  <div className="animate-spin rounded-full h-8 w-8 border-4 border-t-4 border-b-4 border-red-500 border-t-transparent border-b-transparent"></div>
</div>

          ) : (
            <button
              type="submit"
              className={`flex items-center justify-center hover:bg-[#0f131f] rounded-xl px-2 py-2 max-sm:hidden`}
            >
              <img src="/img/submit.svg" alt="Submit" className="min-w-[24px] min-h-[24px]" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default RecipeForm;
