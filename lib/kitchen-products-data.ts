import { Category, Product } from './types';

export const categories: Category[] = [
  {
    id: 'cookware',
    name: 'Cookware',
    description: 'Essential pots, pans, and cooking vessels for every kitchen',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=300&fit=crop',
    productCount: 8
  },
  {
    id: 'bakeware',
    name: 'Bakeware',
    description: 'Professional baking pans, sheets, and molds',
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=500&h=300&fit=crop',
    productCount: 7
  },
  {
    id: 'small-appliances',
    name: 'Small Appliances',
    description: 'Convenient electric appliances to enhance your cooking',
    image: 'https://images.unsplash.com/photo-1585515656662-a4e3944c1ab4?w=500&h=300&fit=crop',
    productCount: 8
  },
  {
    id: 'kitchen-gadgets',
    name: 'Kitchen Gadgets',
    description: 'Innovative gadgets and tools for modern cooking',
    image: 'https://images.unsplash.com/photo-1556909114-46b0ac27c98c?w=500&h=300&fit=crop',
    productCount: 9
  },
  {
    id: 'glassware',
    name: 'Glassware',
    description: 'Elegant glasses, mugs, and drinkware collection',
    image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=500&h=300&fit=crop',
    productCount: 7
  },
  {
    id: 'food-preparation',
    name: 'Food Preparation',
    description: 'Cutting boards, measuring tools, and prep essentials',
    image: 'https://images.unsplash.com/photo-1556909253-4df5c4ac1d42?w=500&h=300&fit=crop',
    productCount: 8
  }
];

export const products: Product[] = [
  // Cookware - 8 products
  {
    id: 'nonstick-pan-set',
    name: 'Professional Non-Stick Pan Set',
    description: 'Premium 3-piece non-stick cookware set with ceramic coating',
    price: 89.99,
    originalPrice: 119.99,
    image: 'https://images.unsplash.com/photo-1556909114-46b0ac27c98c?w=400&h=400&fit=crop',
    category: 'cookware',
    weight: '8 lbs',
    isPopular: true,
    isOnSale: true,
    rating: 4.8,
    reviews: 324
  },
  {
    id: 'stainless-steel-pot-set',
    name: 'Stainless Steel Pot Set',
    description: 'Heavy-duty stainless steel pots with aluminum base',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1556909114-4f6e3e8f9eab?w=400&h=400&fit=crop',
    category: 'cookware',
    weight: '12 lbs',
    rating: 4.7,
    reviews: 256
  },
  {
    id: 'cast-iron-skillet',
    name: 'Cast Iron Skillet 12"',
    description: 'Pre-seasoned cast iron skillet for superior heat retention',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1594736797933-d0f32e5d0681?w=400&h=400&fit=crop',
    category: 'cookware',
    weight: '6 lbs',
    isPopular: true,
    rating: 4.9,
    reviews: 189
  },
  {
    id: 'dutch-oven',
    name: 'Enameled Dutch Oven',
    description: 'Versatile 5.5-quart enameled cast iron Dutch oven',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1556909254-4c4bcde4c3c3?w=400&h=400&fit=crop',
    category: 'cookware',
    weight: '11 lbs',
    rating: 4.6,
    reviews: 145
  },
  {
    id: 'wok-carbon-steel',
    name: 'Carbon Steel Wok 14"',
    description: 'Traditional carbon steel wok for authentic stir-frying',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1556909253-4df5c4ac1d42?w=400&h=400&fit=crop',
    category: 'cookware',
    weight: '3 lbs',
    rating: 4.5,
    reviews: 98
  },
  {
    id: 'copper-sauce-pan',
    name: 'Copper Core Sauce Pan',
    description: 'Professional copper core sauce pan with stainless steel interior',
    price: 124.99,
    image: 'https://images.unsplash.com/photo-1556909297-4b4c4bcdb306?w=400&h=400&fit=crop',
    category: 'cookware',
    weight: '2.5 lbs',
    rating: 4.8,
    reviews: 67
  },
  {
    id: 'ceramic-stockpot',
    name: 'Ceramic Non-Stick Stockpot',
    description: '8-quart ceramic non-stick stockpot with glass lid',
    price: 69.99,
    originalPrice: 89.99,
    image: 'https://images.unsplash.com/photo-1585515656662-a4e3944c1ab4?w=400&h=400&fit=crop',
    category: 'cookware',
    weight: '7 lbs',
    isOnSale: true,
    rating: 4.4,
    reviews: 134
  },
  {
    id: 'grill-pan-ridged',
    name: 'Ridged Grill Pan',
    description: 'Heavy-duty aluminum grill pan with non-stick coating',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    category: 'cookware',
    weight: '4 lbs',
    rating: 4.3,
    reviews: 178
  },

  // Bakeware - 7 products
  {
    id: 'baking-sheet-set',
    name: 'Professional Baking Sheet Set',
    description: 'Heavy-duty aluminum baking sheets with silicone mats',
    price: 29.99,
    originalPrice: 39.99,
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=400&fit=crop',
    category: 'bakeware',
    weight: '4 lbs',
    isOnSale: true,
    isPopular: true,
    rating: 4.7,
    reviews: 289
  },
  {
    id: 'cake-pan-set',
    name: 'Round Cake Pan Set',
    description: 'Non-stick round cake pans - 8" and 9" with removable bottoms',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    category: 'bakeware',
    weight: '2 lbs',
    rating: 4.6,
    reviews: 167
  },
  {
    id: 'muffin-tin-silicone',
    name: 'Silicone Muffin Tin',
    description: 'Food-grade silicone 12-cup muffin tin, easy release',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1556909114-5ba4ade8648c?w=400&h=400&fit=crop',
    category: 'bakeware',
    weight: '1.5 lbs',
    rating: 4.5,
    reviews: 234
  },
  {
    id: 'loaf-pan-set',
    name: 'Glass Loaf Pan Set',
    description: 'Borosilicate glass loaf pans, set of 2',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=400&fit=crop',
    category: 'bakeware',
    weight: '3 lbs',
    rating: 4.4,
    reviews: 145
  },
  {
    id: 'pie-dish-ceramic',
    name: 'Ceramic Pie Dish',
    description: 'Deep dish ceramic pie pan with fluted edges',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop',
    category: 'bakeware',
    weight: '2.5 lbs',
    rating: 4.8,
    reviews: 98
  },
  {
    id: 'cookie-sheets-insulated',
    name: 'Insulated Cookie Sheets',
    description: 'Air-insulated cookie sheets prevent over-browning',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1556909253-f3c6dae87846?w=400&h=400&fit=crop',
    category: 'bakeware',
    weight: '3 lbs',
    rating: 4.6,
    reviews: 123
  },
  {
    id: 'bundt-pan-nonstick',
    name: 'Non-Stick Bundt Pan',
    description: 'Decorative non-stick bundt cake pan with intricate design',
    price: 26.99,
    image: 'https://images.unsplash.com/photo-1556909297-8f4f4b9b4e6f?w=400&h=400&fit=crop',
    category: 'bakeware',
    weight: '2 lbs',
    rating: 4.5,
    reviews: 187
  },

  // Small Appliances - 8 products
  {
    id: 'stand-mixer-professional',
    name: 'Professional Stand Mixer',
    description: '6-quart stand mixer with multiple attachments',
    price: 299.99,
    originalPrice: 349.99,
    image: 'https://images.unsplash.com/photo-1585515656662-a4e3944c1ab4?w=400&h=400&fit=crop',
    category: 'small-appliances',
    weight: '25 lbs',
    isOnSale: true,
    isPopular: true,
    rating: 4.8,
    reviews: 567
  },
  {
    id: 'blender-high-speed',
    name: 'High-Speed Blender',
    description: 'Professional-grade blender with 2HP motor',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1556909297-8f4f4b9b4e6f?w=400&h=400&fit=crop',
    category: 'small-appliances',
    weight: '8 lbs',
    rating: 4.7,
    reviews: 345
  },
  {
    id: 'food-processor-14-cup',
    name: '14-Cup Food Processor',
    description: 'Large capacity food processor with multiple blades',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1593618998160-e34014c9a66b?w=400&h=400&fit=crop',
    category: 'small-appliances',
    weight: '15 lbs',
    rating: 4.6,
    reviews: 234
  },
  {
    id: 'coffee-maker-programmable',
    name: 'Programmable Coffee Maker',
    description: '12-cup programmable drip coffee maker with thermal carafe',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=400&fit=crop',
    category: 'small-appliances',
    weight: '6 lbs',
    isPopular: true,
    rating: 4.5,
    reviews: 456
  },
  {
    id: 'toaster-oven-convection',
    name: 'Convection Toaster Oven',
    description: 'Multi-function toaster oven with convection cooking',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    category: 'small-appliances',
    weight: '12 lbs',
    rating: 4.4,
    reviews: 289
  },
  {
    id: 'hand-mixer-electric',
    name: 'Electric Hand Mixer',
    description: '7-speed hand mixer with turbo boost and storage case',
    price: 49.99,
    originalPrice: 64.99,
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop',
    category: 'small-appliances',
    weight: '3 lbs',
    isOnSale: true,
    rating: 4.6,
    reviews: 178
  },
  {
    id: 'slow-cooker-programmable',
    name: 'Programmable Slow Cooker',
    description: '6-quart slow cooker with digital timer and automatic keep-warm',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1556909114-4f6e3e8f9eab?w=400&h=400&fit=crop',
    category: 'small-appliances',
    weight: '10 lbs',
    rating: 4.5,
    reviews: 367
  },
  {
    id: 'immersion-blender',
    name: 'Immersion Blender Set',
    description: 'Variable speed immersion blender with attachments',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1556909253-f3c6dae87846?w=400&h=400&fit=crop',
    category: 'small-appliances',
    weight: '2 lbs',
    rating: 4.7,
    reviews: 234
  },

  // Kitchen Gadgets - 9 products
  {
    id: 'can-opener-electric',
    name: 'Electric Can Opener',
    description: 'Hands-free electric can opener with magnetic lid holder',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1594736797933-d0f32e5d0681?w=400&h=400&fit=crop',
    category: 'kitchen-gadgets',
    weight: '3 lbs',
    rating: 4.3,
    reviews: 234
  },
  {
    id: 'vegetable-peeler-set',
    name: 'Vegetable Peeler Set',
    description: '3-piece peeler set - standard, julienne, and serrated',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1556909114-4c4bcde4c3c3?w=400&h=400&fit=crop',
    category: 'kitchen-gadgets',
    weight: '0.5 lbs',
    isPopular: true,
    rating: 4.5,
    reviews: 345
  },
  {
    id: 'garlic-press-heavy-duty',
    name: 'Heavy-Duty Garlic Press',
    description: 'Aluminum garlic press with easy-squeeze handle',
    price: 19.99,
    originalPrice: 26.99,
    image: 'https://images.unsplash.com/photo-1593618998160-e34014c9a66b?w=400&h=400&fit=crop',
    category: 'kitchen-gadgets',
    weight: '1 lb',
    isOnSale: true,
    rating: 4.6,
    reviews: 189
  },
  {
    id: 'mandoline-slicer',
    name: 'Adjustable Mandoline Slicer',
    description: 'Professional mandoline with safety guard and multiple blades',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1556909253-4df5c4ac1d42?w=400&h=400&fit=crop',
    category: 'kitchen-gadgets',
    weight: '2 lbs',
    rating: 4.4,
    reviews: 156
  },
  {
    id: 'digital-food-scale',
    name: 'Digital Kitchen Scale',
    description: 'Precision digital scale with tare function, up to 11 lbs',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1556909114-46b0ac27c98c?w=400&h=400&fit=crop',
    category: 'kitchen-gadgets',
    weight: '3 lbs',
    rating: 4.7,
    reviews: 278
  },
  {
    id: 'herb-scissors',
    name: '5-Blade Herb Scissors',
    description: 'Multi-blade scissors for quick herb chopping',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1556909297-4b4c4bcdb306?w=400&h=400&fit=crop',
    category: 'kitchen-gadgets',
    weight: '0.3 lbs',
    rating: 4.2,
    reviews: 123
  },
  {
    id: 'avocado-tool-3-in-1',
    name: '3-in-1 Avocado Tool',
    description: 'Split, pit, and slice avocados with one handy tool',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1556909114-5ba4ade8648c?w=400&h=400&fit=crop',
    category: 'kitchen-gadgets',
    weight: '0.2 lbs',
    rating: 4.3,
    reviews: 167
  },
  {
    id: 'egg-separator',
    name: 'Stainless Steel Egg Separator',
    description: 'Professional egg separator with comfortable handle',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1556909254-4c4bcde4c3c3?w=400&h=400&fit=crop',
    category: 'kitchen-gadgets',
    weight: '0.1 lbs',
    rating: 4.1,
    reviews: 89
  },
  {
    id: 'citrus-zester-grater',
    name: 'Citrus Zester & Grater',
    description: 'Sharp stainless steel zester for citrus and hard cheeses',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    category: 'kitchen-gadgets',
    weight: '0.4 lbs',
    rating: 4.6,
    reviews: 234
  },

  // Glassware - 7 products
  {
    id: 'wine-glass-set',
    name: 'Crystal Wine Glass Set',
    description: 'Set of 6 crystal wine glasses for red and white wine',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=400&fit=crop',
    category: 'glassware',
    weight: '3 lbs',
    isPopular: true,
    rating: 4.7,
    reviews: 278
  },
  {
    id: 'water-glasses-borosilicate',
    name: 'Borosilicate Water Glasses',
    description: 'Heat-resistant borosilicate glass tumblers, set of 8',
    price: 34.99,
    originalPrice: 44.99,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    category: 'glassware',
    weight: '4 lbs',
    isOnSale: true,
    rating: 4.5,
    reviews: 234
  },
  {
    id: 'coffee-mugs-ceramic',
    name: 'Ceramic Coffee Mug Set',
    description: 'Large ceramic coffee mugs with comfortable handles, set of 6',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop',
    category: 'glassware',
    weight: '4 lbs',
    rating: 4.6,
    reviews: 345
  },
  {
    id: 'beer-glasses-pilsner',
    name: 'Pilsner Beer Glasses',
    description: 'Tall pilsner glasses for beer, set of 4',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1556909114-5ba4ade8648c?w=400&h=400&fit=crop',
    category: 'glassware',
    weight: '2 lbs',
    rating: 4.4,
    reviews: 156
  },
  {
    id: 'champagne-flutes',
    name: 'Champagne Flute Set',
    description: 'Elegant champagne flutes for celebrations, set of 6',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1556909297-8f4f4b9b4e6f?w=400&h=400&fit=crop',
    category: 'glassware',
    weight: '2.5 lbs',
    rating: 4.8,
    reviews: 189
  },
  {
    id: 'shot-glasses-heavy-bottom',
    name: 'Heavy Bottom Shot Glasses',
    description: 'Thick bottom shot glasses, set of 6',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1556909253-4df5c4ac1d42?w=400&h=400&fit=crop',
    category: 'glassware',
    weight: '2 lbs',
    rating: 4.3,
    reviews: 167
  },
  {
    id: 'tea-cups-glass',
    name: 'Double-Wall Glass Tea Cups',
    description: 'Insulated double-wall glass tea cups, set of 4',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1556909254-4c4bcde4c3c3?w=400&h=400&fit=crop',
    category: 'glassware',
    weight: '1.5 lbs',
    rating: 4.6,
    reviews: 123
  },

  // Food Preparation - 8 products
  {
    id: 'cutting-board-bamboo-large',
    name: 'Large Bamboo Cutting Board',
    description: 'Extra large bamboo cutting board with juice groove',
    price: 34.99,
    originalPrice: 44.99,
    image: 'https://images.unsplash.com/photo-1556909253-4df5c4ac1d42?w=400&h=400&fit=crop',
    category: 'food-preparation',
    weight: '3 lbs',
    isOnSale: true,
    isPopular: true,
    rating: 4.7,
    reviews: 456
  },
  {
    id: 'cutting-board-set-plastic',
    name: 'Color-Coded Cutting Board Set',
    description: 'Set of 4 color-coded flexible cutting boards',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1556909114-4c4bcde4c3c3?w=400&h=400&fit=crop',
    category: 'food-preparation',
    weight: '2 lbs',
    rating: 4.4,
    reviews: 234
  },
  {
    id: 'measuring-cups-stainless',
    name: 'Stainless Steel Measuring Cups',
    description: 'Nested measuring cup set with long handles',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1593618998160-e34014c9a66b?w=400&h=400&fit=crop',
    category: 'food-preparation',
    weight: '2 lbs',
    rating: 4.6,
    reviews: 345
  },
  {
    id: 'measuring-spoons-magnetic',
    name: 'Magnetic Measuring Spoons',
    description: 'Dual-sided magnetic measuring spoons that nest together',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1556909297-4b4c4bcdb306?w=400&h=400&fit=crop',
    category: 'food-preparation',
    weight: '0.5 lbs',
    rating: 4.5,
    reviews: 189
  },
  {
    id: 'mixing-bowls-glass',
    name: 'Glass Mixing Bowl Set',
    description: 'Nested glass mixing bowls with pour spouts, set of 5',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=400&fit=crop',
    category: 'food-preparation',
    weight: '6 lbs',
    rating: 4.8,
    reviews: 278
  },
  {
    id: 'colander-stainless-steel',
    name: 'Stainless Steel Colander',
    description: 'Large stainless steel colander with stable base',
    price: 27.99,
    image: 'https://images.unsplash.com/photo-1585515656662-a4e3944c1ab4?w=400&h=400&fit=crop',
    category: 'food-preparation',
    weight: '2 lbs',
    rating: 4.4,
    reviews: 167
  },
  {
    id: 'salad-spinner',
    name: 'Large Salad Spinner',
    description: 'Easy-pump salad spinner with brake and pour spout',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    category: 'food-preparation',
    weight: '3 lbs',
    rating: 4.6,
    reviews: 234
  },
  {
    id: 'pastry-mat-silicone',
    name: 'Silicone Pastry Mat',
    description: 'Non-stick silicone baking mat with measurements',
    price: 18.99,
    originalPrice: 24.99,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    category: 'food-preparation',
    weight: '1 lb',
    isOnSale: true,
    rating: 4.5,
    reviews: 145
  }
];

// Utility functions
export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};

export const getPopularProducts = (): Product[] => {
  return products.filter(product => product.isPopular);
};

export const getOnSaleProducts = (): Product[] => {
  return products.filter(product => product.isOnSale);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
};