import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { IngredientInput } from './components/IngredientInput';
import { RecipeCard } from './components/RecipeCard';
import { RecipeDetail } from './components/RecipeDetail';
import { CookingMode } from './components/CookingMode';
import { ChefHelpline } from './components/ChefHelpline';
import { SavedRecipes } from './components/SavedRecipes';
import { KitchenGlossaryModal } from './components/KitchenGlossaryModal';
import { PRESET_RECIPES } from './data/presetRecipes';
import { Recipe } from './types';
import { Utensils, Sparkles, BookOpen, AlertCircle, ChefHat, Filter, RefreshCw, Layers } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'generator' | 'presets' | 'saved' | 'helpline' | 'glossary'>('generator');
  
  // Ingredient Input State
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([
    'Eggs', 'Potatoes', 'Onions', 'Tomatoes', 'Green Chili', 'Salt', 'Oil'
  ]);
  const [strictMode, setStrictMode] = useState<boolean>(true);
  const [mealType, setMealType] = useState<string>('Any Homestyle Dish');
  const [customNote, setCustomNote] = useState<string>('');
  
  // Generated Recipe & Loading State
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Active Viewing / Cooking Modals
  const [activeModalRecipe, setActiveModalRecipe] = useState<Recipe | null>(null);
  const [activeCookingRecipe, setActiveCookingRecipe] = useState<Recipe | null>(null);

  // Presets Filter State
  const [presetCategory, setPresetCategory] = useState<string>('All');

  // Saved Recipes Persistence
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>(() => {
    try {
      const stored = localStorage.getItem('pakistani_saved_recipes');
      return stored ? JSON.parse(stored) : [PRESET_RECIPES[0]]; // Default 1 saved
    } catch {
      return [PRESET_RECIPES[0]];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('pakistani_saved_recipes', JSON.stringify(savedRecipes));
    } catch (err) {
      console.error('Failed to save recipes to localStorage', err);
    }
  }, [savedRecipes]);

  // Toggle Save Recipe
  const handleToggleSave = (recipeToSave: Recipe) => {
    setSavedRecipes(prev => {
      const exists = prev.some(r => r.title === recipeToSave.title);
      if (exists) {
        return prev.filter(r => r.title !== recipeToSave.title);
      } else {
        const withId = recipeToSave.id ? recipeToSave : { ...recipeToSave, id: `saved-${Date.now()}` };
        return [withId, ...prev];
      }
    });
  };

  const isSaved = (recipe: Recipe) => {
    return savedRecipes.some(r => r.title === recipe.title);
  };

  // API Call to Generate Recipe
  const handleGenerate = async () => {
    if (selectedIngredients.length === 0) return;
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/recipe/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ingredients: selectedIngredients,
          strictMode,
          mealType,
          customNote
        })
      });

      const data = await res.json();

      if (data.success && data.recipe) {
        setGeneratedRecipe(data.recipe);
        // Scroll down to recipe output
        setTimeout(() => {
          document.getElementById('recipe-output')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        setErrorMessage(data.error || 'Failed to craft recipe. Please check your ingredients and try again.');
      }
    } catch (err: any) {
      console.error('Error in recipe generation:', err);
      setErrorMessage('Network error connecting to Chef Ammi. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Filtered Presets
  const filteredPresets = PRESET_RECIPES.filter(p => {
    if (presetCategory === 'All') return true;
    return p.category === presetCategory;
  });

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 font-sans flex flex-col antialiased selection:bg-amber-500 selection:text-white">
      
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedRecipes.length}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* TAB 1: INGREDIENT COOK / GENERATOR */}
        {activeTab === 'generator' && (
          <div className="space-y-8">
            
            {/* Input Form Section */}
            <IngredientInput
              selectedIngredients={selectedIngredients}
              setSelectedIngredients={setSelectedIngredients}
              strictMode={strictMode}
              setStrictMode={setStrictMode}
              mealType={mealType}
              setMealType={setMealType}
              customNote={customNote}
              setCustomNote={setCustomNote}
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />

            {/* Error Message */}
            {errorMessage && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl text-xs sm:text-sm flex items-center shadow-xs">
                <AlertCircle className="w-5 h-5 text-rose-600 mr-2 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Recipe Output Display */}
            <div id="recipe-output">
              {generatedRecipe ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold font-serif text-stone-800 flex items-center">
                      <Sparkles className="w-5 h-5 text-amber-600 mr-2" />
                      Chef Ammi's Custom Created Recipe:
                    </h3>
                    <button
                      onClick={handleGenerate}
                      disabled={isLoading}
                      className="text-xs font-semibold text-amber-800 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-xl transition-colors flex items-center"
                    >
                      <RefreshCw className="w-3.5 h-3.5 mr-1" />
                      Regenerate
                    </button>
                  </div>

                  <div className="max-w-2xl">
                    <RecipeCard
                      recipe={generatedRecipe}
                      onSelect={(r) => setActiveModalRecipe(r)}
                      onStartCooking={(r) => setActiveCookingRecipe(r)}
                      isSaved={isSaved(generatedRecipe)}
                      onToggleSave={handleToggleSave}
                    />
                  </div>
                </div>
              ) : (
                /* Instant Quick Inspiration Cards when no recipe generated yet */
                <div className="bg-white rounded-2xl p-6 border border-amber-100 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold font-serif text-stone-800 flex items-center">
                        <Utensils className="w-4 h-4 text-amber-600 mr-2" />
                        Featured Quick Pakistani Homestyle Recipes:
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Or click "Create Practical Recipe with Chef Ammi" above for a custom recipe generated for your exact list!
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PRESET_RECIPES.slice(0, 3).map((preset) => (
                      <RecipeCard
                        key={preset.id}
                        recipe={preset}
                        onSelect={(r) => setActiveModalRecipe(r)}
                        onStartCooking={(r) => setActiveCookingRecipe(r)}
                        isSaved={isSaved(preset)}
                        onToggleSave={handleToggleSave}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: PRESET RECIPES */}
        {activeTab === 'presets' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md border border-amber-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold font-serif text-stone-800 flex items-center">
                  <BookOpen className="w-5 h-5 text-amber-600 mr-2" />
                  Classic Pakistani Minimalist Presets
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Tried-and-true authentic Pakistani homestyle recipes crafted from 3-5 pantry staples.
                </p>
              </div>

              {/* Category Filter */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                <Filter className="w-4 h-4 text-stone-400 shrink-0" />
                {['All', 'Quick 15-Min', 'Comfort Daal & Rice', 'Karahi & Fry', 'Sabzi Special', 'Breakfast & Sehri'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setPresetCategory(cat)}
                    className={`text-xs px-3 py-1.5 rounded-xl font-semibold transition-all shrink-0 ${
                      presetCategory === cat
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-stone-100 text-stone-700 hover:bg-amber-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPresets.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onSelect={(r) => setActiveModalRecipe(r)}
                  onStartCooking={(r) => setActiveCookingRecipe(r)}
                  isSaved={isSaved(recipe)}
                  onToggleSave={handleToggleSave}
                />
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SAVED RECIPES */}
        {activeTab === 'saved' && (
          <SavedRecipes
            savedRecipes={savedRecipes}
            onSelectRecipe={(r) => setActiveModalRecipe(r)}
            onStartCooking={(r) => setActiveCookingRecipe(r)}
            onToggleSave={handleToggleSave}
            onClearAllSaved={() => setSavedRecipes([])}
          />
        )}

        {/* TAB 4: CHEF HELPLINE */}
        {activeTab === 'helpline' && (
          <ChefHelpline currentRecipeTitle={generatedRecipe?.title || activeModalRecipe?.title} />
        )}

        {/* TAB 5: KITCHEN GLOSSARY */}
        {activeTab === 'glossary' && (
          <KitchenGlossaryModal />
        )}

      </main>

      {/* DETAIL MODAL */}
      {activeModalRecipe && (
        <RecipeDetail
          recipe={activeModalRecipe}
          onClose={() => setActiveModalRecipe(null)}
          onStartCooking={(r) => {
            setActiveModalRecipe(null);
            setActiveCookingRecipe(r);
          }}
          isSaved={isSaved(activeModalRecipe)}
          onToggleSave={handleToggleSave}
        />
      )}

      {/* INTERACTIVE COOKING MODE FULLSCREEN OVERLAY */}
      {activeCookingRecipe && (
        <CookingMode
          recipe={activeCookingRecipe}
          onClose={() => setActiveCookingRecipe(null)}
        />
      )}

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-6 border-t border-stone-800 text-center text-xs mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <ChefHat className="w-4 h-4 text-amber-500" />
            <span className="font-serif font-bold text-stone-200">Chef Ammi's Pakistani Kitchen</span>
          </div>
          <p className="text-stone-500">
            Homestyle Pakistani Recipes • Made with strictly provided pantry ingredients
          </p>
        </div>
      </footer>

    </div>
  );
}
