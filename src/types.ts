export interface RecipeStep {
  stepNumber: number;
  title: string;
  description: string;
  techniqueTip?: string;
  timerMinutes?: number;
}

export interface Recipe {
  id?: string;
  title: string;
  urduTitle?: string;
  story: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: string;
  difficulty: 'Easy' | 'Medium' | 'Expert';
  spiceLevel: 'Mild' | 'Medium' | 'Desi Spicy';
  ingredientsUsed: string[];
  assumedPantryItems?: string[];
  equipmentNeeded?: string[];
  instructions: RecipeStep[];
  optionalUpgrade: string;
  servingSuggestions: string;
}

export interface PresetRecipe extends Recipe {
  id: string;
  category: 'Quick 15-Min' | 'Comfort Daal & Rice' | 'Sabzi Special' | 'Karahi & Fry' | 'Breakfast & Sehri';
  requiredIngredients: string[];
}

export interface GlossaryTerm {
  term: string;
  urduScript: string;
  phonetic: string;
  definition: string;
  chefAdvice: string;
}

export interface SavedRecipe {
  id: string;
  recipe: Recipe;
  savedAt: string;
  userNotes?: string;
}
