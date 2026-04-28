import { Product } from "@/components/product-card";

export const products: Product[] = [
  {
  id: 1,
  name: "Aloe Vera Gel",

  sizes: ["100gm"],
  prices: [199],

  // ⚠️ IMPORTANT (image ➜ images)
  image: [
    "/about/aloe1.jpg",
    "/about/aloe2.jpg",
    "/about/aloe3.jpg",
    "/about/aloe4.jpg",
    "/about/aloe5.jpg",
    "/about/aloe6.jpg",
    "/about/aloe7.jpg",
  ],

  category: "skincare",

  // ✅ DESCRIPTION 🔥
  description: `Experience the refreshing care of BLYZZA Aloe Vera Gel, made with naturally derived aloe vera known for its soothing and hydrating properties. This lightweight, non-sticky gel helps moisturize the skin, leaving it soft, smooth, and refreshed. It can be used daily to calm dry or irritated skin and provide a natural glow. Suitable for both skin and hair care, this versatile gel absorbs quickly without clogging pores, making it ideal for all skin types.`,

  // ✅ BENEFITS 🔥
  benefits: `• Deeply hydrates and nourishes the skin  
• Soothes irritation and redness  
• Helps maintain soft and smooth skin  
• Lightweight, non-greasy formula  
• Suitable for all skin types`,

  // ✅ HOW TO USE 🔥
  howToUse: `Take a small amount of aloe vera gel and apply evenly on clean skin or scalp. Gently massage until fully absorbed. It can be used as a daily moisturizer, soothing gel, or hair conditioner. Use regularly for best results.`,

  // ✅ INGREDIENTS 🔥
  ingredients: `Aloe Vera Extract, Coconut Oil, Shea Butter, Castor Oil, Olive Oil, Glycerin, Vitamin E, Natural Essential Oils, Herbal Base`,
},
  {
    id: 2,
    name: "Hibiscus Powder",
    sizes: ["50gm", "100gm", "200gm"],
    prices: [99, 149, 199],
    image: [
      "/about/hibiscus1.jpg",
      "/about/hibiscus2.jpg",
      "/about/hibiscus3.jpg",
      "/about/hibiscus4.jpg",
      "/about/hibiscus5.jpg",
      "/about/hibiscus6.jpg",
      "/about/hibiscus7.jpg"
    ],
    category: "haircare",

    description: `Experience the natural goodness of BLYZZA Hibiscus Powder, made from carefully selected hibiscus flowers and processed to retain their natural nutrients. Known for its traditional use in hair care, hibiscus helps nourish the scalp, support healthy-looking hair, and enhance natural shine. This herbal powder can be used as a hair mask by mixing it with water or other natural ingredients to create a smooth paste. It helps gently cleanse the scalp, reduce excess oil, and promote stronger, smoother hair. Suitable for all hair types, this chemical-free powder is a perfect addition to your natural hair care routine.`,

    // 🔥 (OPTIONAL - NEXT LEVEL)
    benefits: "Supports hair growth, reduces hair fall, improves shine, nourishes scalp.",
    howToUse: "Mix with water to form a paste, apply on scalp and hair, leave for 20-30 minutes, then rinse.",
    ingredients: "100% Natural Hibiscus Flower Powder",
    },
  {
    id: 3,
    name: "Chamomile Powder",

    sizes: ["50gm", "100gm", "200gm"],
    prices: [109, 159, 209],

    image: [
      "/about/Chamomile1.jpg",
      "/about/Chamomile2.jpg",
      "/about/Chamomile3.jpg",
      "/about/Chamomile4.jpg",
      "/about/Chamomile5.jpg",
      "/about/Chamomile6.jpg",
      "/about/Chamomile7.jpg"
    ],

    category: "skincare",

    // ✅ DESCRIPTION 🔥
    description: `Experience the gentle care of BLYZZA Chamomile Powder, made from finely processed chamomile flowers known for their soothing and calming properties. Traditionally used in skincare, chamomile helps refresh and comfort the skin while promoting a natural glow. This herbal powder can be used as a face pack or mixed with natural ingredients to create a nourishing skincare treatment. It helps cleanse the skin, reduce dullness, and leave your skin feeling soft, smooth, and revitalized. Suitable for all skin types, especially sensitive skin, this chemical-free powder is perfect for daily natural skincare routines.`,

    // ✅ BENEFITS 🔥
    benefits: `• Soothes and calms irritated skin  
  • Helps reduce redness and inflammation  
  • Improves natural skin glow  
  • Gently cleanses and refreshes skin  
  • Suitable for sensitive skin types`,

    // ✅ HOW TO USE 🔥
    howToUse: `Mix required amount of chamomile powder with water, rose water, or milk to form a smooth paste. Apply evenly on face or skin and leave it for 15–20 minutes. Rinse off with lukewarm water. Use 2–3 times a week for best results.`,

    // ✅ INGREDIENTS 🔥
    ingredients: `100% Natural Chamomile Flower Powder`,
  },
  {
  id: 4,
  name: "Butterfly Pea Powder",

  sizes: ["50gm", "100gm", "200gm"],
  prices: [149, 229, 309],

  // ⚠️ IMPORTANT
  image: [
    "/about/Butterfly1.jpg",
    "/about/Butterfly2.jpg",
    "/about/Butterfly3.jpg",
    "/about/Butterfly4.jpg",
    "/about/Butterfly5.jpg",
    "/about/Butterfly6.jpg",
    "/about/Butterfly7.jpg",
  ],

  category: "haircare",

  // ✅ DESCRIPTION 🔥
  description: `Experience the natural goodness of BLYZZA Butterfly Pea Powder, made from carefully dried butterfly pea flowers known for their traditional use in hair care. Rich in natural antioxidants, this herbal powder helps nourish the scalp and support healthy-looking hair. It can be used as a natural hair mask to improve hair texture, enhance shine, and promote stronger, smoother strands. This chemical-free powder is suitable for all hair types and is a great addition to your natural hair care routine.`,

  // ✅ BENEFITS 🔥
  benefits: `• Helps nourish and strengthen hair  
• Improves natural shine and smoothness  
• Supports healthy-looking hair growth  
• Helps reduce dryness and frizz  
• Suitable for all hair types`,

  // ✅ HOW TO USE 🔥
  howToUse: `Mix required amount of butterfly pea powder with water, aloe vera gel, or curd to form a smooth paste. Apply evenly on scalp and hair. Leave it for 20–30 minutes and rinse thoroughly with water. Use 1–2 times a week for best results.`,

  // ✅ INGREDIENTS 🔥
  ingredients: `100% Natural Butterfly Pea Flower Powder`,
},
  {
  id: 5,
  name: "Moringa Powder",

  sizes: ["50gm", "100gm", "200gm"],
  prices: [99, 149, 199],

  // ✅ FIXED
  image: [
    "/about/moringa1.jpg",
    "/about/moringa2.jpg",
    "/about/moringa3.jpg",
    "/about/moringa4.jpg",
  ],

  category: "skincare",

  // ✅ DESCRIPTION 🔥
  description: `Experience the natural power of BLYZZA Moringa Powder, made from finely processed moringa leaves known for their rich nutrients and traditional skincare benefits. This herbal powder helps gently cleanse the skin, remove impurities, and promote a fresh, healthy glow. It can be used as a face pack by mixing with water or other natural ingredients to create a smooth paste. Suitable for all skin types, this chemical-free powder is a perfect addition to your natural skincare routine.`,

  // ✅ BENEFITS 🔥
  benefits: `• Helps cleanse and purify the skin  
• Rich in natural vitamins and antioxidants  
• Improves skin glow and freshness  
• Helps control excess oil  
• Suitable for all skin types`,

  // ✅ HOW TO USE 🔥
  howToUse: `Mix required amount of moringa powder with water, rose water, or milk to form a smooth paste. Apply evenly on face or skin and leave it for 15–20 minutes. Rinse off with lukewarm water. Use 2–3 times a week for best results.`,

  // ✅ INGREDIENTS 🔥
  ingredients: `100% Natural Moringa Leaf Powder`,
},
  {
  id: 6,
  name: "Senna Leaves",

  sizes: ["100gm", "200gm"],
  prices: [149, 199],

  // ✅ FIXED
  image: [
    "/about/Senna1.jpg",
    "/about/Senna2.jpg",
    "/about/Senna3.jpg",
    "/about/Senna4.jpg",
    "/about/Senna5.jpg",
    "/about/Senna6.jpg",
  ],

  category: "haircare",

  // ✅ DESCRIPTION 🔥
  description: `Experience the natural care of BLYZZA Senna Leaves, traditionally used for hair conditioning and scalp care. Senna is known for its natural cleansing properties that help remove buildup from the scalp while maintaining the hair’s natural balance. This herbal ingredient is widely used as a natural alternative to chemical conditioners, leaving hair soft, smooth, and manageable. Suitable for all hair types, it is especially beneficial for those looking to enhance hair texture and maintain healthy-looking hair.`,

  // ✅ BENEFITS 🔥
  benefits: `• Natural hair conditioner  
• Helps improve hair softness and smoothness  
• Gently cleanses the scalp  
• Adds natural shine to hair  
• Suitable for all hair types`,

  // ✅ HOW TO USE 🔥
  howToUse: `Soak senna leaves powder in water to form a smooth paste. Apply evenly on scalp and hair. Leave it for 20–30 minutes and rinse thoroughly with water. It can also be mixed with other herbal powders for enhanced benefits. Use regularly for best results.`,

  // ✅ INGREDIENTS 🔥
  ingredients: `100% Natural Senna Leaves Powder`,
},
  {
  id: 7,
  name: "Goat Milk White Soap",

  sizes: ["100gm"],
  prices: [199],

  // ✅ FIXED
  image: [
    "/about/goatmilk1.jpg",
    "/about/goatmilk2.jpg",
    "/about/goatmilk3.jpg",
    "/about/goatmilk4.jpg",
    "/about/goatmilk5.jpg",
    "/about/goatmilk6.jpg",
    "/about/goatmilk7.jpg"
  ],

  category: "soaps",

  // ✅ DESCRIPTION 🔥
  description: `Experience the gentle nourishment of BLYZZA Goat Milk White Soap, crafted using traditional methods and enriched with the goodness of goat milk. Known for its moisturizing properties, goat milk helps hydrate the skin deeply while maintaining its natural softness. This soap produces a rich, creamy lather that gently cleanses without stripping away natural oils, leaving your skin feeling smooth, supple, and refreshed. Ideal for daily use, it is suitable for all skin types, especially dry and sensitive skin.`,

  // ✅ BENEFITS 🔥
  benefits: `• Deeply moisturizes and nourishes skin  
• Helps maintain soft and smooth texture  
• Gentle cleansing without dryness  
• Supports healthy-looking skin  
• Suitable for dry and sensitive skin`,

  // ✅ HOW TO USE 🔥
  howToUse: `Wet your skin and gently apply the soap to create a rich lather. Massage softly over face and body, then rinse thoroughly with water. Use daily for clean, soft, and refreshed skin.`,

  // ✅ INGREDIENTS 🔥
  ingredients: `Goat Milk, Natural Oils, Herbal Base`,
},
{
  id: 8,
  name: "Neem Soap",

  sizes: ["100gm"],
  prices: [199],

  // ✅ FIXED
  image: [
    "/about/Neem1.jpg",
    "/about/Neem2.jpg",
    "/about/Neem3.jpg",
    "/about/Neem4.jpg",
    "/about/Neem5.jpg",
    "/about/Neem6.jpg",
    "/about/Neem7.jpg"
  ],

  category: "soaps",

  // ✅ DESCRIPTION 🔥
  description: `Experience the gentle nourishment of BLYZZA Goat Milk White Soap, crafted using traditional methods and enriched with the goodness of goat milk. Known for its moisturizing properties, goat milk helps hydrate the skin deeply while maintaining its natural softness. This soap produces a rich, creamy lather that gently cleanses without stripping away natural oils, leaving your skin feeling smooth, supple, and refreshed. Ideal for daily use, it is suitable for all skin types, especially dry and sensitive skin.`,

  // ✅ BENEFITS 🔥
  benefits: `• Deeply moisturizes and nourishes skin  
• Helps maintain soft and smooth texture  
• Gentle cleansing without dryness  
• Supports healthy-looking skin  
• Suitable for dry and sensitive skin`,

  // ✅ HOW TO USE 🔥
  howToUse: `Wet your skin and gently apply the soap to create a rich lather. Massage softly over face and body, then rinse thoroughly with water. Use daily for clean, soft, and refreshed skin.`,

  // ✅ INGREDIENTS 🔥
  ingredients: `Goat Milk, Natural Oils, Herbal Base`,
},
  {
  id: 9,
  name: "Nettle Soap(Kuppaimeni)",

  sizes: ["100gm"],
  prices: [229],

  // ✅ FIXED
  image: [
    "/about/Nettle1.jpg",
    "/about/Nettle2.jpg",
    "/about/Nettle3.jpg",
    "/about/Nettle4.jpg",
    "/about/Nettle5.jpg",
    "/about/Nettle6.jpg",
    "/about/Nettle7.jpg"
  ],

  category: "soaps",

  // ✅ DESCRIPTION 🔥
  description: `Experience the natural cleansing power of BLYZZA Nettle Soap, enriched with nettle known for its purifying and skin-balancing properties. This herbal soap helps gently cleanse the skin by removing dirt, excess oil, and impurities without disturbing the skin’s natural moisture. It creates a refreshing lather that leaves your skin feeling clean, smooth, and revitalized after every wash. Ideal for daily use, this soap is especially suitable for oily and acne-prone skin types.`,

  // ✅ BENEFITS 🔥
  benefits: `• Helps control excess oil  
• Supports clearer-looking skin  
• Gently removes dirt and impurities  
• Refreshes and revitalizes skin  
• Suitable for oily and acne-prone skin`,

  // ✅ HOW TO USE 🔥
  howToUse: `Wet your skin and gently apply the soap to create a rich lather. Massage softly over face and body, then rinse thoroughly with water. Use daily for best results.`,

  // ✅ INGREDIENTS 🔥
  ingredients: `Nettle Extract, Natural Oils, Herbal Base`,
},
  {
  id: 10,
  name: "Manjistha & Coconut Soap",

  sizes: ["100gm"],
  prices: [229],

  // ✅ FIXED
  image: [
    "/about/Manjistha1.jpg",
    "/about/Manjistha2.jpg",
    "/about/Manjistha3.jpg",
    "/about/Manjistha4.jpg",
    "/about/Manjistha5.jpg",
    "/about/Manjistha6.jpg",
    "/about/Manjistha7.jpg",
  ],

  category: "soaps",

  // ✅ DESCRIPTION 🔥
  description: `Experience the natural glow care of BLYZZA Manjistha & Coconut Soap, crafted using traditional methods and enriched with the goodness of manjistha and coconut. Manjistha is known for its skin-purifying properties, while coconut helps deeply moisturize and nourish the skin. This soap gently cleanses impurities, supports clearer-looking skin, and leaves your skin feeling soft, refreshed, and naturally radiant. Perfect for daily use on face and body, it is suitable for all skin types.`,

  // ✅ BENEFITS 🔥
  benefits: `• Helps improve skin clarity and glow  
• Gently removes dirt and impurities  
• Nourishes and moisturizes skin  
• Supports smooth and soft texture  
• Suitable for all skin types`,

  // ✅ HOW TO USE 🔥
  howToUse: `Wet your skin and apply the soap to create a rich lather. Massage gently over face and body, then rinse thoroughly with water. Use daily for clean, soft, and glowing skin.`,

  // ✅ INGREDIENTS 🔥
  ingredients: `Manjistha Extract, Coconut Oil, Natural Oils, Herbal Base`,
},
  {
  id: 11,
  name: "Red Clay Soap",

  sizes: ["100gm"],
  prices: [229],

  // ✅ FIXED
  image: [
    "/about/RedClay1.jpg",
    "/about/RedClay2.jpg",
    "/about/RedClay3.jpg",
    "/about/RedClay4.jpg",
    "/about/RedClay5.jpg",
    "/about/RedClay6.jpg",
    "/about/RedClay7.jpg",
  ],

  category: "soaps",

  // ✅ DESCRIPTION 🔥
  description: `Experience the deep cleansing care of BLYZZA Red Clay Soap, crafted with natural red clay known for its powerful detoxifying properties. Red clay helps absorb excess oil, remove impurities, and gently exfoliate the skin, leaving it fresh and revitalized. This soap supports clearer-looking skin while maintaining natural moisture balance. Ideal for daily use on face and body, it is especially beneficial for oily and combination skin types.`,

  // ✅ BENEFITS 🔥
  benefits: `• Helps detoxify and cleanse deeply  
• Absorbs excess oil and impurities  
• Gently exfoliates dead skin cells  
• Improves skin texture and clarity  
• Suitable for oily and combination skin`,

  // ✅ HOW TO USE 🔥
  howToUse: `Wet your skin and apply the soap to create a rich lather. Massage gently over face and body, then rinse thoroughly with water. Use daily for clean, refreshed, and healthy-looking skin.`,

  // ✅ INGREDIENTS 🔥
  ingredients: `Red Clay, Coconut Oil, Natural Oils, Herbal Base`,
},
  {
  id: 12,
  name: "Shea Butter",

  sizes: ["100gm", "200gm", "500gm"],
  prices: [199, 389, 949],

  // ✅ FIXED
  image: [
    "/about/sheabutter.jpg",
  ],

  category: "skincare",

  // ✅ DESCRIPTION 🔥
  description: `Experience intense nourishment with BLYZZA Shea Butter, a rich and natural moisturizer known for its deep hydrating and skin-repairing properties. Extracted from the nuts of the shea tree, this butter helps restore moisture, improve skin elasticity, and protect against dryness. Its creamy texture melts into the skin, leaving it soft, smooth, and healthy-looking. Ideal for daily use on face, body, lips, and even dry hair ends, it is suitable for all skin types, especially dry and sensitive skin.`,

  // ✅ BENEFITS 🔥
  benefits: `• Deeply moisturizes and nourishes skin  
• Helps reduce dryness and roughness  
• Improves skin elasticity and softness  
• Supports skin barrier protection  
• Suitable for dry and sensitive skin`,

  // ✅ HOW TO USE 🔥
  howToUse: `Take a small amount and gently massage onto clean skin until fully absorbed. Use daily on face and body, focusing on dry areas like elbows, knees, and heels. Can also be applied to lips and hair ends for extra nourishment.`,

  // ✅ INGREDIENTS 🔥
  ingredients: `Pure Shea Butter`,
}
];