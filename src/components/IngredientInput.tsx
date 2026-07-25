import React, { useState } from 'react';
import { Plus, X, Sparkles, AlertCircle, ShieldCheck, Flame, Layers } from 'lucide-react';

interface IngredientInputProps {
  selectedIngredients: string[];
  setSelectedIngredients: React.Dispatch<React.SetStateAction<string[]>>;
  strictMode: boolean;
  setStrictMode: (val: boolean) => void;
  mealType: string;
  setMealType: (val: string) => void;
  customNote: string;
  setCustomNote: (val: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const COMMON_CATEGORIES = [
  {
    name: 'Proteins',
    items: ['Eggs', 'Chicken', 'Mutton', 'Beef', 'Minced Meat (Keema)', 'Paneer', 'Fish']
  },
  {
    name: 'Vegetables',
    items: ['Onion', 'Tomato', 'Potato (Aloo)', 'Garlic', 'Ginger', 'Green Chili', 'Spinach (Palak)', 'Cauliflower (Gobi)', 'Peas (Matar)', 'Okra (Bhindi)']
  },
  {
    name: 'Pulses & Grains',
    items: ['Rice', 'Atta (Wheat Flour)', 'Yellow Moong Daal', 'Red Masoor Daal', 'Chana Daal', 'Chickpeas (Kabuli Chana)']
  },
  {
    name: 'Dairy & Pantry',
    items: ['Cooking Oil', 'Ghee', 'Yogurt (Dahi)', 'Milk', 'Butter', 'Cream']
  },
  {
    name: 'Spices',
    items: ['Salt', 'Red Chili Powder', 'Turmeric (Haldi)', 'Cumin Seeds (Zeera)', 'Coriander Powder', 'Black Pepper', 'Garam Masala', 'Kasuri Methi']
  }
];

export const IngredientInput: React.FC<IngredientInputProps> = ({
  selectedIngredients,
  setSelectedIngredients,
  strictMode,
  setStrictMode,
  mealType,
  setMealType,
  customNote,
  setCustomNote,
  onGenerate,
  isLoading
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddIngredient = (item: string) => {
    const trimmed = item.trim();
    if (trimmed && !selectedIngredients.some(i => i.toLowerCase() === trimmed.toLowerCase())) {
      setSelectedIngredients(prev => [...prev, trimmed]);
    }
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIngredient(inputValue);
    }
  };

  const handleRemoveIngredient = (itemToRemove: string) => {
    setSelectedIngredients(prev => prev.filter(item => item !== itemToRemove));
  };

  const handleClearAll = () => {
    setSelectedIngredients([]);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-5 sm:p-7 transition-all">
      <div className="flex items-center justify-between pb-4 border-b border-amber-100 mb-6">
        <div>
          <h2 className="text-xl font-bold text-stone-800 font-serif flex items-center">
            <Layers className="w-5 h-5 text-amber-600 mr-2" />
            What's in Your Kitchen Right Now?
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Add any main ingredients, leftover veggies, or pantry staples you have on hand.
          </p>
        </div>
        {selectedIngredients.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-md transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Input Box */}
      <div className="mb-6">
        <label htmlFor="ingredientInput" className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2">
          Type & Add Ingredient
        </label>
        <div className="flex items-center gap-2">
          <input
            id="ingredientInput"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. Eggs, Potatoes, Tomatoes, Red Chili, Rice..."
            className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder:text-stone-400"
          />
          <button
            onClick={() => handleAddIngredient(inputValue)}
            disabled={!inputValue.trim()}
            className="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white px-4 py-3 rounded-xl font-medium text-sm transition-all flex items-center shadow-md active:scale-95"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </button>
        </div>
      </div>

      {/* Selected Tags */}
      {selectedIngredients.length > 0 ? (
        <div className="mb-6 bg-amber-50/60 p-4 rounded-xl border border-amber-200/60">
          <span className="block text-xs font-bold text-amber-900 uppercase tracking-wider mb-2.5">
            Your Ingredients ({selectedIngredients.length}):
          </span>
          <div className="flex flex-wrap gap-2">
            {selectedIngredients.map((item) => (
              <span
                key={item}
                className="inline-flex items-center bg-white border border-amber-300 text-amber-950 px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs transition-all hover:bg-amber-100"
              >
                {item}
                <button
                  onClick={() => handleRemoveIngredient(item)}
                  className="ml-2 text-amber-600 hover:text-rose-600 transition-colors p-0.5 rounded-full hover:bg-rose-100"
                  title="Remove"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-6 p-3.5 bg-stone-50 rounded-xl border border-dashed border-stone-200 text-center text-xs text-stone-500">
          No ingredients added yet. Pick from the quick chips below or type above!
        </div>
      )}

      {/* Quick Category Chips */}
      <div className="mb-6 space-y-3">
        <span className="block text-xs font-semibold uppercase tracking-wider text-stone-500">
          Quick-Add Common Pakistani Staples:
        </span>
        <div className="space-y-2.5">
          {COMMON_CATEGORIES.map((cat) => (
            <div key={cat.name} className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-3">
              <span className="text-[11px] font-bold text-amber-900 w-24 shrink-0">
                {cat.name}:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((item) => {
                  const isSelected = selectedIngredients.some(i => i.toLowerCase() === item.toLowerCase());
                  return (
                    <button
                      key={item}
                      onClick={() => isSelected ? handleRemoveIngredient(item) : handleAddIngredient(item)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                        isSelected
                          ? 'bg-amber-600 text-white border-amber-600 font-semibold shadow-xs'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-amber-50 hover:border-amber-300'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strictness Mode & Preferences */}
      <div className="pt-5 border-t border-amber-100 grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        
        {/* Mode Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
            Ingredient Strictness
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setStrictMode(true)}
              className={`p-3 rounded-xl border text-left transition-all ${
                strictMode
                  ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20 text-amber-950'
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              <div className="flex items-center font-bold text-xs">
                <ShieldCheck className={`w-4 h-4 mr-1.5 ${strictMode ? 'text-amber-600' : 'text-stone-400'}`} />
                Strict Mode
              </div>
              <p className="text-[11px] text-stone-500 mt-1 leading-snug">
                Use ONLY listed items (+ plain water). Zero unlisted spices assumed.
              </p>
            </button>

            <button
              onClick={() => setStrictMode(false)}
              className={`p-3 rounded-xl border text-left transition-all ${
                !strictMode
                  ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20 text-amber-950'
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              <div className="flex items-center font-bold text-xs">
                <Flame className={`w-4 h-4 mr-1.5 ${!strictMode ? 'text-amber-600' : 'text-stone-400'}`} />
                Pantry Standard
              </div>
              <p className="text-[11px] text-stone-500 mt-1 leading-snug">
                Assume basic oil, salt & chili/turmeric if needed to balance gravy.
              </p>
            </button>
          </div>
        </div>

        {/* Meal Type & Notes */}
        <div className="space-y-3">
          <div>
            <label htmlFor="mealTypeSelect" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Meal Type Focus
            </label>
            <select
              id="mealTypeSelect"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="Any Homestyle Dish">Any Homestyle Dish</option>
              <option value="Quick 15-Minute Meal">Quick 15-Minute Meal</option>
              <option value="Lunch / Dinner Curry (Salan)">Lunch / Dinner Curry (Salan)</option>
              <option value="Breakfast / Sehri Special">Breakfast / Sehri Special</option>
              <option value="Dry Sabzi or Stir Fry">Dry Sabzi or Stir Fry</option>
              <option value="Rice Dish / Tahari">Rice Dish / Tahari</option>
            </select>
          </div>

          <div>
            <label htmlFor="customNoteInput" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
              Custom Preference / Note (Optional)
            </label>
            <input
              id="customNoteInput"
              type="text"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="e.g. Mild spice for kids, extra bhunno style, no garlic..."
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-stone-400"
            />
          </div>
        </div>

      </div>

      {/* Generate Action Button */}
      <button
        onClick={onGenerate}
        disabled={selectedIngredients.length === 0 || isLoading}
        className="w-full bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center text-base disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl active:scale-[0.99]"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin mr-2.5"></div>
            <span>Chef Ammi is Crafting Your Custom Recipe...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 mr-2" />
            <span>Create Practical Recipe with Chef Ammi</span>
          </>
        )}
      </button>

      {selectedIngredients.length === 0 && (
        <p className="text-center text-xs text-stone-400 mt-2.5 flex items-center justify-center">
          <AlertCircle className="w-3.5 h-3.5 mr-1 text-amber-500" /> Please add at least 1 ingredient above to begin.
        </p>
      )}
    </div>
  );
};
