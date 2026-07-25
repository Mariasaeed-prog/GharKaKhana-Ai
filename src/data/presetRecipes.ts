import { PresetRecipe } from '../types';

export const PRESET_RECIPES: PresetRecipe[] = [
  {
    id: 'preset-1',
    title: 'Anda Pyaz Khagina (Homestyle Scrambled Eggs)',
    urduTitle: 'انڈا پیاز خاگینہ',
    category: 'Breakfast & Sehri',
    requiredIngredients: ['Eggs', 'Onion', 'Tomato', 'Green Chili', 'Oil', 'Salt'],
    story: 'A timeless Pakistani breakfast staple! When the fridge is almost empty, Ammi turns eggs, caramelized onions, and juicy tomatoes into a rich, savory skillet feast.',
    prepTimeMinutes: 5,
    cookTimeMinutes: 10,
    servings: '2 servings',
    difficulty: 'Easy',
    spiceLevel: 'Medium',
    ingredientsUsed: [
      '3 Large Eggs',
      '1 Medium Onion (finely sliced)',
      '1 Medium Tomato (finely chopped)',
      '1 Green Chili (sliced)',
      '2 tbsp Cooking Oil or Ghee',
      '1/2 tsp Salt',
      '1/2 tsp Red Chili Flakes or Powder',
      '1/4 tsp Turmeric (Haldi)'
    ],
    assumedPantryItems: ['Water', 'Salt', 'Oil'],
    equipmentNeeded: ['Frying Pan or Karahi', 'Whisk or Fork', 'Spatula'],
    instructions: [
      {
        stepNumber: 1,
        title: 'Caramelize Pyaz (Onion Sauté)',
        description: 'Heat 2 tbsp oil in a pan over medium heat. Add the sliced onions and fry for 4–5 minutes until soft and golden along the edges.',
        techniqueTip: 'Do not let onions turn dark brown; soft golden onions impart natural sweetness to the khagina.',
        timerMinutes: 4
      },
      {
        stepNumber: 2,
        title: 'Tamatar & Masala Bhunai',
        description: 'Add chopped tomatoes, green chilies, salt, red chili, and turmeric. Bhunno (sauté continuously) for 3–4 minutes until tomatoes soften into a glossy masala paste.',
        techniqueTip: 'Use the back of your spoon to mash the tomatoes into a smooth sauce base.',
        timerMinutes: 3
      },
      {
        stepNumber: 3,
        title: 'Scramble on Medium Heat',
        description: 'Beat the eggs in a bowl and pour them directly over the tomato-onion base. Let sit for 15 seconds, then gently fold and scramble until fluffy and fully cooked.',
        timerMinutes: 3
      }
    ],
    optionalUpgrade: 'Chef\'s Upgrade: Sprinkle fresh chopped coriander (hara dhaniya) and a pinch of crushed black pepper right before turning off the stove.',
    servingSuggestions: 'Serve scalding hot with crispy parathas or buttered toast and chai.'
  },
  {
    id: 'preset-2',
    title: 'Aloo Zeera Fry (Crispy Cumin Potatoes)',
    urduTitle: 'آلو زیرہ ڈرائی سالن',
    category: 'Quick 15-Min',
    requiredIngredients: ['Potatoes', 'Cumin Seeds', 'Turmeric', 'Oil', 'Salt', 'Red Chili'],
    story: 'Simple, fragrant, and immensely satisfying. Potatoes tossed with toasted cumin seeds and haldi bring out pure rustic Pakistani flavor with zero hassle.',
    prepTimeMinutes: 5,
    cookTimeMinutes: 15,
    servings: '2 - 3 servings',
    difficulty: 'Easy',
    spiceLevel: 'Medium',
    ingredientsUsed: [
      '3 Medium Potatoes (sliced into thin rounds or small cubes)',
      '1 tsp Cumin Seeds (Zeera)',
      '1/2 tsp Turmeric (Haldi)',
      '1/2 tsp Red Chili Flakes or Powder',
      '2.5 tbsp Oil',
      '3/4 tsp Salt'
    ],
    assumedPantryItems: ['Oil', 'Salt'],
    equipmentNeeded: ['Karahi or Non-Stick Pan', 'Lid'],
    instructions: [
      {
        stepNumber: 1,
        title: 'Zeera Tarka (Sizzling Cumin)',
        description: 'Heat oil in a pan over medium-high heat. Toss in cumin seeds and let them sizzle and pop for 20 seconds until intensely aromatic.',
        techniqueTip: 'Tarka Tip: Keep an eye on the cumin seeds; they should bloom in oil without burning dark.',
        timerMinutes: 1
      },
      {
        stepNumber: 2,
        title: 'Toss Aloo & Spices',
        description: 'Add the potato slices directly into the tempered oil. Sprinkle salt, turmeric, and red chili flakes. Stir well so every potato slice is coated in golden spice oil.',
        timerMinutes: 2
      },
      {
        stepNumber: 3,
        title: 'Dum Cook till Tender',
        description: 'Cover with a tight lid, turn heat to low (Dum), and steam-cook for 10–12 minutes until potatoes are fork-tender and crispy around the edges.',
        techniqueTip: 'Dum Technique: Low heat traps steam inside, cooking the potatoes without adding extra water.',
        timerMinutes: 11
      }
    ],
    optionalUpgrade: 'Chef\'s Upgrade: Squeeze fresh lemon juice over the sizzling hot potatoes immediately after turning off the flame for a tangy chatpata bite.',
    servingSuggestions: 'Pair with warm plain Roti or serve as a side with Daal Chawal.'
  },
  {
    id: 'preset-3',
    title: 'Kali Mirch Chicken Handi (Creamy Black Pepper Chicken)',
    urduTitle: 'کالی مرچ چکن ہانڈی',
    category: 'Karahi & Fry',
    requiredIngredients: ['Chicken', 'Yogurt', 'Garlic', 'Ginger', 'Black Pepper', 'Oil', 'Salt'],
    story: 'A velvety white gravy Karahi cooked in yogurt and coarse black pepper. No tomatoes required! Extremely rich and fragrant.',
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    servings: '3 - 4 servings',
    difficulty: 'Medium',
    spiceLevel: 'Medium',
    ingredientsUsed: [
      '500g Bone-in or Boneless Chicken',
      '1 Cup Whisked Plain Yogurt (Dahi)',
      '1 tbsp Ginger-Garlic Paste (or finely minced)',
      '1.5 tsp Coarsely Ground Black Pepper (Kali Mirch)',
      '1/2 tsp Cumin Powder',
      '3 tbsp Oil or Ghee',
      '1 tsp Salt'
    ],
    assumedPantryItems: ['Oil', 'Salt'],
    equipmentNeeded: ['Deep Karahi or Clay Handi', 'Lid'],
    instructions: [
      {
        stepNumber: 1,
        title: 'Chicken Sauté (Bhunai)',
        description: 'Heat oil in karahi. Add chicken pieces and ginger-garlic paste. Bhunno on high heat for 5 minutes until chicken turns white and fragrant.',
        timerMinutes: 5
      },
      {
        stepNumber: 2,
        title: 'Simmer in Whisked Dahi',
        description: 'Lower heat to low. Add whisked yogurt, salt, cumin powder, and 1 tsp crushed black pepper. Stir well until gravy becomes smooth.',
        techniqueTip: 'Dahi Tip: Always whisk yogurt and lower the flame before adding to prevent curdling.',
        timerMinutes: 3
      },
      {
        stepNumber: 3,
        title: 'Dum for Tender Meat',
        description: 'Cover and simmer on low heat for 12 minutes until chicken is tender and oil separates to the top (Tari appearing). Sprinkle remaining black pepper on top.',
        timerMinutes: 12
      }
    ],
    optionalUpgrade: 'Chef\'s Upgrade: Swirl 2 tbsp of heavy cream or a knob of fresh butter during the last 2 minutes of dum for restaurant richness.',
    servingSuggestions: 'Best enjoyed with hot Tandoori Naan or Garlic Paratha.'
  },
  {
    id: 'preset-4',
    title: 'Moong Daal Tarka Fry (Quick Yellow Lentils)',
    urduTitle: 'مونگ دال تڑکہ فرائی',
    category: 'Comfort Daal & Rice',
    requiredIngredients: ['Yellow Moong Daal', 'Garlic', 'Cumin Seeds', 'Oil', 'Salt', 'Turmeric'],
    story: 'The ultimate Pakistani comfort dish! Soft yellow lentils tempered with golden garlic slices and roasted zeera.',
    prepTimeMinutes: 5,
    cookTimeMinutes: 20,
    servings: '3 servings',
    difficulty: 'Easy',
    spiceLevel: 'Mild',
    ingredientsUsed: [
      '1 Cup Yellow Moong Daal (rinsed)',
      '4 Cloves Garlic (sliced thinly)',
      '1 tsp Cumin Seeds (Zeera)',
      '1/2 tsp Turmeric (Haldi)',
      '1 tsp Salt',
      '2.5 Cups Water',
      '2 tbsp Ghee or Oil'
    ],
    assumedPantryItems: ['Water', 'Oil', 'Salt'],
    equipmentNeeded: ['Saucepan or Cooker', 'Small Tarka Pan'],
    instructions: [
      {
        stepNumber: 1,
        title: 'Boil Daal',
        description: 'In a pot, combine rinsed daal, 2.5 cups water, salt, and turmeric. Bring to a boil, skim off top foam, cover and cook on medium-low for 15 minutes until soft.',
        timerMinutes: 15
      },
      {
        stepNumber: 2,
        title: 'Whisk & Consistency',
        description: 'Whisk daal gently with a wooden spoon or hand whisk until creamy. Adjust water if too thick.',
        timerMinutes: 2
      },
      {
        stepNumber: 3,
        title: 'Golden Garlic Tarka',
        description: 'In a small frying pan, heat 2 tbsp ghee/oil. Add sliced garlic and cumin seeds. Fry until garlic turns dark golden brown. Pour sizzling tarka over the daal!',
        techniqueTip: 'Tarka magic: Immediately cover the daal pot with a lid after pouring tarka to trap the smoky garlic aroma inside!',
        timerMinutes: 3
      }
    ],
    optionalUpgrade: 'Chef\'s Upgrade: Add dried whole red chilies (Sabut Lal Mirch) and a pinch of Kalonji (nigella seeds) into the tarka pan for dhabba flavor.',
    servingSuggestions: 'Serve hot with boiled Basmati rice, kachumber salad, and achar.'
  },
  {
    id: 'preset-5',
    title: 'Aloo Palak Dhabba Style (Spinach & Potato Curry)',
    urduTitle: 'آلو پالک سالن',
    category: 'Sabzi Special',
    requiredIngredients: ['Spinach', 'Potatoes', 'Garlic', 'Red Chili', 'Oil', 'Salt'],
    story: 'Fresh green spinach sautéed with potatoes and garlic. Healthy, vibrant, and packed with homestyle Pakistani warmth.',
    prepTimeMinutes: 10,
    cookTimeMinutes: 18,
    servings: '3 servings',
    difficulty: 'Easy',
    spiceLevel: 'Medium',
    ingredientsUsed: [
      '1 Bunch Fresh Spinach (washed & coarsely chopped)',
      '2 Medium Potatoes (peeled & cubed)',
      '1 tbsp Minced Garlic',
      '1/2 tsp Red Chili Powder or Flakes',
      '1/2 tsp Turmeric',
      '2 tbsp Oil',
      '3/4 tsp Salt'
    ],
    assumedPantryItems: ['Oil', 'Salt'],
    equipmentNeeded: ['Karahi or Deep Pan', 'Lid'],
    instructions: [
      {
        stepNumber: 1,
        title: 'Sauté Garlic & Potatoes',
        description: 'Heat oil in pan. Sauté garlic until fragrant. Toss in potato cubes with salt, turmeric, and chili. Fry for 4 minutes until potato edges get lightly golden.',
        timerMinutes: 4
      },
      {
        stepNumber: 2,
        title: 'Fold in Chopped Spinach',
        description: 'Add chopped spinach. Stir well. The spinach will release its own natural moisture—no need to add water!',
        timerMinutes: 3
      },
      {
        stepNumber: 3,
        title: 'Cover & Dum Cook',
        description: 'Cover pan and steam cook on medium-low for 10–12 minutes until potatoes are soft and spinach is glossy.',
        timerMinutes: 11
      }
    ],
    optionalUpgrade: 'Chef\'s Upgrade: Rub 1 tsp Kasuri Methi (dried fenugreek leaves) between your palms and sprinkle over the finished sabzi for authentic road-side dhabba aroma.',
    servingSuggestions: 'Serve with warm whole-wheat Chapati or Bajra Roti.'
  }
];
