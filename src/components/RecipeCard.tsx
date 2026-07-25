import React from 'react';
import { Recipe } from '../types';
import { Clock, Flame, Users, Sparkles, Bookmark, BookmarkCheck, Play, ChevronRight, CheckCircle2 } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: (recipe: Recipe) => void;
  onStartCooking: (recipe: Recipe) => void;
  isSaved: boolean;
  onToggleSave: (recipe: Recipe) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onSelect,
  onStartCooking,
  isSaved,
  onToggleSave
}) => {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <div className="bg-white rounded-2xl shadow-md border border-amber-100/80 hover:border-amber-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Top Banner Header */}
        <div className="bg-gradient-to-r from-amber-900 to-orange-950 p-4 text-white relative">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-300 block">
                Pakistani Homestyle
              </span>
              <h3 className="text-lg font-bold font-serif text-white group-hover:text-amber-200 transition-colors leading-tight mt-0.5">
                {recipe.title}
              </h3>
              {recipe.urduTitle && (
                <p className="text-xs text-amber-200/80 font-serif mt-0.5">
                  {recipe.urduTitle}
                </p>
              )}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(recipe);
              }}
              className={`p-2 rounded-xl transition-colors shrink-0 ${
                isSaved
                  ? 'bg-amber-500 text-stone-950'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              title={isSaved ? 'Remove from Saved' : 'Save Recipe'}
            >
              {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
            </button>
          </div>

          {/* Quick Badges */}
          <div className="flex flex-wrap items-center gap-2 mt-3 text-[11px] font-semibold text-amber-100">
            <span className="flex items-center bg-white/10 backdrop-blur-xs px-2.5 py-1 rounded-md">
              <Clock className="w-3.5 h-3.5 mr-1 text-amber-300" />
              {totalTime} mins ({recipe.prepTimeMinutes}m prep + {recipe.cookTimeMinutes}m cook)
            </span>
            <span className="flex items-center bg-white/10 backdrop-blur-xs px-2.5 py-1 rounded-md">
              <Users className="w-3.5 h-3.5 mr-1 text-amber-300" />
              {recipe.servings}
            </span>
            <span className="flex items-center bg-white/10 backdrop-blur-xs px-2.5 py-1 rounded-md">
              <Flame className="w-3.5 h-3.5 mr-1 text-orange-400" />
              {recipe.spiceLevel}
            </span>
          </div>
        </div>

        {/* Story & Chef Note */}
        <div className="p-5">
          <p className="text-xs text-stone-600 italic line-clamp-3 leading-relaxed mb-4 border-l-2 border-amber-400 pl-3 bg-amber-50/40 py-1 rounded-r-md">
            "{recipe.story}"
          </p>

          {/* Ingredients Preview */}
          <div className="mb-4">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-2">
              Key Ingredients Used ({recipe.ingredientsUsed.length}):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {recipe.ingredientsUsed.slice(0, 5).map((ing, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center text-[11px] bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded-md font-medium"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 mr-1" />
                  {ing}
                </span>
              ))}
              {recipe.ingredientsUsed.length > 5 && (
                <span className="text-[11px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded-md">
                  +{recipe.ingredientsUsed.length - 5} more
                </span>
              )}
            </div>
          </div>

          {/* Optional Upgrade Highlight Callout */}
          {recipe.optionalUpgrade && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-xl p-3 text-xs mb-2">
              <div className="flex items-center font-bold text-amber-900 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 mr-1.5 shrink-0" />
                Optional Upgrade (Chef's Pro Tip):
              </div>
              <p className="text-stone-700 text-[11px] leading-snug">
                {recipe.optionalUpgrade}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-5 pb-5 pt-2 border-t border-stone-100 flex items-center gap-2">
        <button
          onClick={() => onSelect(recipe)}
          className="flex-1 bg-stone-100 hover:bg-amber-100 text-stone-800 hover:text-amber-950 font-bold py-2.5 px-3 rounded-xl text-xs transition-colors flex items-center justify-center"
        >
          View Full Recipe
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>

        <button
          onClick={() => onStartCooking(recipe)}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 px-3.5 rounded-xl text-xs transition-colors flex items-center justify-center shadow-xs"
        >
          <Play className="w-3.5 h-3.5 mr-1 fill-white" />
          Cook Now
        </button>
      </div>
    </div>
  );
};
