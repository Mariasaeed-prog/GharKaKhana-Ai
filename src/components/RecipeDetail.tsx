import React from 'react';
import { Recipe } from '../types';
import { X, Clock, Users, Flame, ChefHat, Sparkles, Bookmark, BookmarkCheck, Play, CheckCircle2, UtensilsCrossed, AlertTriangle, Lightbulb } from 'lucide-react';

interface RecipeDetailProps {
  recipe: Recipe;
  onClose: () => void;
  onStartCooking: (recipe: Recipe) => void;
  isSaved: boolean;
  onToggleSave: (recipe: Recipe) => void;
}

export const RecipeDetail: React.FC<RecipeDetailProps> = ({
  recipe,
  onClose,
  onStartCooking,
  isSaved,
  onToggleSave
}) => {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-amber-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden my-auto">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-amber-900 via-orange-950 to-amber-950 p-6 sm:p-8 text-white relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-300 block mb-1">
              Homestyle Pakistani Recipe
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
              {recipe.title}
            </h2>
            {recipe.urduTitle && (
              <p className="text-sm text-amber-200 font-serif mt-1">
                {recipe.urduTitle}
              </p>
            )}

            {/* Quick Meta Stats */}
            <div className="flex flex-wrap items-center gap-3 mt-4 text-xs font-semibold text-amber-100">
              <span className="flex items-center bg-white/15 px-3 py-1.5 rounded-lg border border-white/10">
                <Clock className="w-4 h-4 mr-1.5 text-amber-300" />
                Prep: {recipe.prepTimeMinutes}m | Cook: {recipe.cookTimeMinutes}m ({totalTime}m total)
              </span>
              <span className="flex items-center bg-white/15 px-3 py-1.5 rounded-lg border border-white/10">
                <Users className="w-4 h-4 mr-1.5 text-amber-300" />
                {recipe.servings}
              </span>
              <span className="flex items-center bg-white/15 px-3 py-1.5 rounded-lg border border-white/10">
                <Flame className="w-4 h-4 mr-1.5 text-orange-400" />
                Spice: {recipe.spiceLevel}
              </span>
              <span className="flex items-center bg-white/15 px-3 py-1.5 rounded-lg border border-white/10">
                <ChefHat className="w-4 h-4 mr-1.5 text-amber-300" />
                Difficulty: {recipe.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          
          {/* Chef Note & Story */}
          <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 sm:p-5 flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 font-bold font-serif text-lg">
              A
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1">
                Note from Chef Ammi
              </h4>
              <p className="text-sm text-stone-700 italic leading-relaxed">
                "{recipe.story}"
              </p>
            </div>
          </div>

          {/* Optional Upgrade Callout Box - Highly Prominent */}
          {recipe.optionalUpgrade && (
            <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border-2 border-amber-400/80 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center text-amber-950 font-bold text-sm mb-2">
                <Sparkles className="w-5 h-5 text-amber-600 mr-2 shrink-0 animate-pulse" />
                Suggested Optional Improvement (Chef's Pro Tip):
              </div>
              <p className="text-stone-800 text-sm leading-relaxed font-medium">
                {recipe.optionalUpgrade}
              </p>
            </div>
          )}

          {/* Ingredients & Equipment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Ingredients Used */}
            <div className="md:col-span-2 bg-stone-50 border border-stone-200 rounded-2xl p-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-800 mb-3 flex items-center">
                <UtensilsCrossed className="w-4 h-4 text-amber-600 mr-2" />
                Ingredients Used ({recipe.ingredientsUsed.length}):
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-stone-700">
                {recipe.ingredientsUsed.map((ing, idx) => (
                  <li key={idx} className="flex items-center bg-white p-2.5 rounded-xl border border-stone-200/70 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>

              {/* Assumed Pantry Warning */}
              {recipe.assumedPantryItems && recipe.assumedPantryItems.length > 0 && (
                <div className="mt-4 pt-3 border-t border-stone-200 text-xs text-stone-500 flex items-center">
                  <AlertTriangle className="w-4 h-4 text-amber-500 mr-2 shrink-0" />
                  <span>Standard pantry assumed: {recipe.assumedPantryItems.join(', ')}</span>
                </div>
              )}
            </div>

            {/* Equipment & Serving */}
            <div className="space-y-4">
              {recipe.equipmentNeeded && (
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    Cookware Needed:
                  </h4>
                  <ul className="text-xs text-stone-600 space-y-1.5">
                    {recipe.equipmentNeeded.map((eq, i) => (
                      <li key={i} className="flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2"></span>
                        {eq}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-amber-50/60 border border-amber-200/60 rounded-2xl p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1">
                  Best Served With:
                </h4>
                <p className="text-xs text-stone-700 font-medium">
                  {recipe.servingSuggestions}
                </p>
              </div>
            </div>

          </div>

          {/* Step-By-Step Instructions */}
          <div>
            <h3 className="text-lg font-bold font-serif text-stone-800 mb-4 flex items-center">
              <ChefHat className="w-5 h-5 text-amber-600 mr-2" />
              Step-by-Step Cooking Instructions:
            </h3>

            <div className="space-y-4">
              {recipe.instructions.map((step) => (
                <div
                  key={step.stepNumber}
                  className="bg-stone-50/80 border border-stone-200/90 rounded-2xl p-5 hover:border-amber-300 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <span className="w-8 h-8 rounded-xl bg-amber-600 text-white font-extrabold flex items-center justify-center shrink-0 text-sm shadow-xs">
                      {step.stepNumber}
                    </span>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-base font-bold text-stone-900 font-serif">
                          {step.title}
                        </h4>
                        {step.timerMinutes && step.timerMinutes > 0 && (
                          <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full flex items-center">
                            <Clock className="w-3 h-3 mr-1 text-amber-600" />
                            ~{step.timerMinutes} mins
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mt-1">
                        {step.description}
                      </p>

                      {/* Technique Tip */}
                      {step.techniqueTip && (
                        <div className="mt-3 bg-white border border-amber-200/80 rounded-xl p-3 text-xs text-amber-950 flex items-start space-x-2">
                          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-amber-900">Desi Cooking Secret: </span>
                            <span className="text-stone-700">{step.techniqueTip}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Action Footer Bar */}
        <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-4 shrink-0">
          <button
            onClick={() => onToggleSave(recipe)}
            className={`flex items-center px-4 py-3 rounded-xl text-xs font-bold transition-all border ${
              isSaved
                ? 'bg-amber-100 text-amber-950 border-amber-300'
                : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
            }`}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4 mr-1.5 text-amber-600" /> : <Bookmark className="w-4 h-4 mr-1.5 text-stone-500" />}
            {isSaved ? 'Saved in Recipe Book' : 'Bookmark Recipe'}
          </button>

          <button
            onClick={() => onStartCooking(recipe)}
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md flex items-center active:scale-95"
          >
            <Play className="w-4 h-4 mr-2 fill-white" />
            Start Step-by-Step Cooking Mode
          </button>
        </div>

      </div>
    </div>
  );
};
