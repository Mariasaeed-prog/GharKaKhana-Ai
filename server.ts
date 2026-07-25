import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy GoogleGenAI client helper
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// System prompt for Pakistani Home Chef persona
const CHEF_SYSTEM_INSTRUCTION = `
You are "Chef Ammi Jan" (or Chef Ammi), a loving, expert, and practical Pakistani family home chef with decades of homestyle cooking wisdom.
Your primary role is to create delicious, practical, authentic Pakistani or Pakistani-fusion recipes using ONLY (or strictly minimizing extra beyond basic water/oil/salt) the ingredients provided by the user.

RULES:
1. MINIMIZE INGREDIENTS: Strictly prioritize using ONLY the user's provided list. If Strict Mode is requested, do NOT assume any unlisted ingredient (except plain water). If Standard Pantry Mode is used, you may assume basic salt, cooking oil, and standard red chili or turmeric if absolutely needed to make a coherent dish, but keep assumed items to the bare absolute minimum.
2. STEP-BY-STEP INSTRUCTIONS: Provide clear, practical, numbered steps. Incorporate authentic Pakistani cooking techniques where applicable (e.g., 'Bhunno' for sautéing till oil separates, 'Dum' for steam cooking, 'Tarka/Baghar' for tempering oil).
3. COOKING TIME: Estimate preparation time and cooking time accurately in minutes.
4. OPTIONAL IMPROVEMENT: Suggest exactly ONE optional upgrade or pro tip at the end (e.g. "Chef's Upgrade: If you happen to have Kasuri Methi, sprinkle a pinch at the end for dhabba style aroma" or "Optional Tip: A squeeze of fresh lemon at the end will cut the richness").
5. PERSONA & TONE: Warm, encouraging, expert, and comforting like a loving Pakistani mother/auntie who knows how to make magic out of whatever is in the fridge. Use gentle Pakistani culinary vocabulary naturally (e.g., salan, bhunai, handi, karahi, tarka, dum, maza, etc.).
`;

// Schema for structured recipe response
const RECIPE_RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "Name of the dish in Roman Urdu and English (e.g. Aloo Matar Bhuna Salan)" },
    urduTitle: { type: Type.STRING, description: "Name in Urdu script if applicable, or Roman Urdu" },
    story: { type: Type.STRING, description: "Warm 2-3 sentence chef note from Chef Ammi explaining why this dish works so well with these ingredients" },
    prepTimeMinutes: { type: Type.INTEGER, description: "Preparation time in minutes" },
    cookTimeMinutes: { type: Type.INTEGER, description: "Cooking time in minutes" },
    servings: { type: Type.STRING, description: "Servings estimate (e.g. 2 - 3 servings)" },
    difficulty: { type: Type.STRING, description: "Easy, Medium, or Expert" },
    spiceLevel: { type: Type.STRING, description: "Mild, Medium, or Desi Spicy" },
    ingredientsUsed: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of ingredients used in the recipe with quantities"
    },
    assumedPantryItems: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Any essential pantry staples assumed if strict mode was not enabled (e.g. Salt, Oil, Water)"
    },
    equipmentNeeded: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Kitchen cookware needed (e.g. Karahi/Pan, Lid, Wooden spoon)"
    },
    instructions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          stepNumber: { type: Type.INTEGER },
          title: { type: Type.STRING, description: "Short step header e.g. Onion Bhunai" },
          description: { type: Type.STRING, description: "Detailed step instructions" },
          techniqueTip: { type: Type.STRING, description: "Chef tip explaining Pakistani technique like Bhunno, Dum, or Tarka if applicable" },
          timerMinutes: { type: Type.INTEGER, description: "Recommended timer duration for this step if applicable (0 if none)" }
        },
        required: ["stepNumber", "title", "description"]
      }
    },
    optionalUpgrade: { type: Type.STRING, description: "Exactly ONE optional improvement/pro tip to elevate the dish if the user has extra ingredients later" },
    servingSuggestions: { type: Type.STRING, description: "What to serve with (Roti, Paratha, Rice, Naan, or spoon directly)" }
  },
  required: [
    "title",
    "story",
    "prepTimeMinutes",
    "cookTimeMinutes",
    "servings",
    "difficulty",
    "spiceLevel",
    "ingredientsUsed",
    "instructions",
    "optionalUpgrade",
    "servingSuggestions"
  ]
};

// API Endpoint to generate recipe from ingredients
app.post("/api/recipe/generate", async (req, res) => {
  try {
    const { ingredients, strictMode, mealType, customNote } = req.body;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      res.status(400).json({ error: "Please provide at least one ingredient." });
      return;
    }

    const ai = getGenAI();

    const prompt = `
Ingredients provided: ${ingredients.join(", ")}
Mode: ${strictMode ? "STRICT MODE (Use ONLY the provided ingredients + water. Do NOT add missing spices or oil unless listed)" : "STANDARD PANTRY MODE (Minimize extra ingredients. Assume only basic cooking oil, salt, water, and red chili/turmeric if needed)"}
Meal Type / Focus: ${mealType || "General Pakistani Homestyle Dish"}
Custom Request / Note: ${customNote || "None"}

Please act as Chef Ammi and create a practical, authentic Pakistani homestyle recipe using ONLY the ingredients provided.
Follow all strictness rules, outline step-by-step instructions, total cooking time, and suggest exactly ONE optional upgrade.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: CHEF_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: RECIPE_RESPONSE_SCHEMA,
        temperature: 0.7,
      },
    });

    const recipeData = JSON.parse(response.text || "{}");
    res.json({ success: true, recipe: recipeData });
  } catch (error: any) {
    console.error("Error generating recipe:", error);
    res.status(500).json({
      error: "Failed to generate recipe.",
      details: error.message || "An unexpected error occurred."
    });
  }
});

// API Endpoint to ask Chef Ammi quick cooking helpline questions
app.post("/api/recipe/ask-chef", async (req, res) => {
  try {
    const { question, currentRecipe } = req.body;

    if (!question) {
      res.status(400).json({ error: "Question is required." });
      return;
    }

    const ai = getGenAI();

    const prompt = `
User asks Chef Ammi: "${question}"
${currentRecipe ? `Context Recipe: "${currentRecipe.title}" with ingredients: ${currentRecipe.ingredientsUsed?.join(", ")}` : ""}

Answer as Chef Ammi Jan in a warm, helpful, encouraging Pakistani home chef persona. Keep the advice concise (2-4 paragraphs), practical, and focused on Pakistani home cooking solutions (adjusting salt with potato/dough ball, fixing watery curry with bhunai or dahi, softening meat, tempering spices, etc.). Include Roman Urdu terms naturally.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: CHEF_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    res.json({ success: true, answer: response.text });
  } catch (error: any) {
    console.error("Error asking Chef Ammi:", error);
    res.status(500).json({
      error: "Chef Ammi is momentarily busy.",
      details: error.message || "An error occurred."
    });
  }
});

async function startServer() {
  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Pakistani Family Home Chef server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
