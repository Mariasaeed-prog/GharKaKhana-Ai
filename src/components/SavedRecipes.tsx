import React from 'react';
import { Recipe } from '../types';
import { RecipeCard } from './RecipeCard';
import { Bookmark, Search, Trash2 } from 'lucide-react';

interface SavedRecipesProps {
  savedRecipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  onStartCooking: (recipe: Recipe) => void;
  onToggleSave: (recipe: Recipe) => void;
  onClearAllSaved: () => void;
}

export const SavedRecipes: React.FC<SavedRecipesProps> = ({
  savedRecipes,
  onSelectRecipe,
  onStartCooking,
  onToggleSave,
  onClearAllSaved
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filtered = savedRecipes.filter(r =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.ingredientsUsed.some(i => i.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl shadow-md border border-amber-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-serif text-stone-800 flex items-center">
            <Bookmark className="w-5 h-5 text-amber-600 mr-2" />
            Your Recipe Book ({savedRecipes.length})
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Bookmarked homestyle Pakistani recipes saved locally on your device.
          </p>
        </div>

        {savedRecipes.length > 0 && (
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search saved..."
                className="bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              onClick={onClearAllSaved}
              className="text-xs text-rose-600 bg-rose-50 hover:bg-rose-100 px-3 py-2 rounded-xl font-semibold transition-colors flex items-center"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1" />
              Clear Saved
            </button>
          </div>
        )}
      </div>

      {/* Grid of Saved Cards */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((recipe, index) => (
            <RecipeCard
              key={recipe.id || index}
              recipe={recipe}
              onSelect={onSelectRecipe}
              onStartCooking={onStartCooking}
              isSaved={true}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-stone-300">
          <Bookmark className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-stone-700 font-serif">
            {savedRecipes.length === 0 ? 'No Saved Recipes Yet' : 'No recipes match your search'}
          </h3>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            {savedRecipes.length === 0
              ? 'When you generate or explore recipes, click the bookmark icon to save them to your personal family notebook!'
              : 'Try searching with different ingredients or titles.'}
          </p>
        </div>
      )}

    </div>
  );
};
