import { Category, Product } from './types';

export const categories: Category[] = [
  {
    id: 'cookware',
    name: 'Cookware',
    description: 'Essential pots, pans, and cooking vessels for every kitchen',
    image: 'https://picsum.photos/500/300?random=1',
    productCount: 8
  },
  {
    id: 'bakeware',
    name: 'Bakeware',
    description: 'Professional baking pans, sheets, and molds',
    image: 'https://picsum.photos/500/300?random=2',
    productCount: 7
  },
  {
    id: 'kitchen-utensils',
    name: 'Kitchen Utensils',
    description: 'Essential cooking tools and utensils for food preparation',
    image: 'https://picsum.photos/500/300?random=3',
    productCount: 10
  },
  {
    id: 'small-appliances',
    name: 'Small Appliances',
    description: 'Convenient electric appliances to enhance your cooking',
    image: 'https://picsum.photos/500/300?random=4',
    productCount: 8
  },
  {
    id: 'knives-cutlery',
    name: 'Knives & Cutlery',
    description: 'Professional-grade knives and cutting tools',
    image: 'https://picsum.photos/500/300?random=5',
    productCount: 6
  },
  {
    id: 'kitchen-storage',
    name: 'Kitchen Storage',
    description: 'Food storage containers and organization solutions',
    image: 'https://picsum.photos/500/300?random=6',
    productCount: 8
  },
  {
    id: 'kitchen-gadgets',
    name: 'Kitchen Gadgets',
    description: 'Innovative gadgets and tools for modern cooking',
    image: 'https://picsum.photos/500/300?random=7',
    productCount: 9
  },
  {
    id: 'dinnerware',
    name: 'Dinnerware',
    description: 'Beautiful plates, bowls, and serving pieces',
    image: 'https://picsum.photos/500/300?random=8',
    productCount: 6
  },
  {
    id: 'glassware',
    name: 'Glassware',
    description: 'Elegant glasses, mugs, and drinkware collection',
    image: 'https://picsum.photos/500/300?random=9',
    productCount: 7
  },
  {
    id: 'kitchen-textiles',
    name: 'Kitchen Textiles',
    description: 'Kitchen towels, aprons, and protective wear',
    image: 'https://picsum.photos/500/300?random=10',
    productCount: 6
  },
  {
    id: 'food-preparation',
    name: 'Food Preparation',
    description: 'Cutting boards, measuring tools, and prep essentials',
    image: 'https://picsum.photos/500/300?random=11',
    productCount: 8
  },
  {
    id: 'specialty-equipment',
    name: 'Specialty Equipment',
    description: 'Professional and specialized kitchen equipment',
    image: 'https://picsum.photos/500/300?random=12',
    productCount: 7
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
    image: 'https://picsum.photos/400/400?random=101',
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
    image: 'https://picsum.photos/400/400?random=102',
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
    image: 'https://picsum.photos/400/400?random=103',
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
    image: 'https://picsum.photos/400/400?random=104',
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
    image: 'https://picsum.photos/400/400?random=105',
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
    image: 'https://picsum.photos/400/400?random=106',
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
    image: 'https://picsum.photos/400/400?random=107',
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
    image: 'https://picsum.photos/400/400?random=108',
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
    image: 'https://picsum.photos/400/400?random=109',
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
    image: 'https://picsum.photos/400/400?random=500',
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
    image: 'https://picsum.photos/400/400?random=500',
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
    image: 'https://picsum.photos/400/400?random=500',
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
    image: 'https://picsum.photos/400/400?random=500',
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
    image: 'https://picsum.photos/400/400?random=500',
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
    image: 'https://picsum.photos/400/400?random=500',
    category: 'bakeware',
    weight: '2 lbs',
    rating: 4.5,
    reviews: 187
  },

  // Kitchen Utensils - 10 products
  {
    id: 'utensil-set-silicone',
    name: 'Silicone Utensil Set',
    description: 'Complete 12-piece silicone cooking utensil set with holder',
    price: 39.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'kitchen-utensils',
    weight: '3 lbs',
    isPopular: true,
    rating: 4.7,
    reviews: 456
  },
  {
    id: 'wooden-spoon-set',
    name: 'Bamboo Wooden Spoon Set',
    description: 'Eco-friendly bamboo cooking spoons and spatulas',
    price: 16.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'kitchen-utensils',
    weight: '1 lb',
    rating: 4.5,
    reviews: 234
  },
  {
    id: 'whisk-stainless-steel',
    name: 'Stainless Steel Whisk Set',
    description: 'Professional balloon whisks in 3 different sizes',
    price: 21.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'kitchen-utensils',
    weight: '1.5 lbs',
    rating: 4.6,
    reviews: 178
  },
  {
    id: 'tongs-silicone-tip',
    name: 'Silicone Tip Tongs',
    description: 'Heat-resistant tongs with silicone tips, locking mechanism',
    price: 12.99,
    originalPrice: 16.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'kitchen-utensils',
    weight: '0.5 lbs',
    isOnSale: true,
    rating: 4.4,
    reviews: 267
  },
  {
    id: 'ladle-stainless',
    name: 'Stainless Steel Ladle',
    description: 'One-piece stainless steel ladle with ergonomic handle',
    price: 14.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'kitchen-utensils',
    weight: '0.7 lbs',
    rating: 4.5,
    reviews: 145
  },
  {
    id: 'spatula-set-heat-resistant',
    name: 'Heat-Resistant Spatula Set',
    description: 'Flexible silicone spatulas for non-stick cookware',
    price: 18.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'kitchen-utensils',
    weight: '1 lb',
    rating: 4.6,
    reviews: 189
  },
  {
    id: 'pasta-fork-wooden',
    name: 'Wooden Pasta Fork',
    description: 'Traditional wooden pasta fork for serving and mixing',
    price: 8.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'kitchen-utensils',
    weight: '0.3 lbs',
    rating: 4.3,
    reviews: 98
  },
  {
    id: 'potato-masher-stainless',
    name: 'Stainless Steel Potato Masher',
    description: 'Heavy-duty potato masher with comfortable grip',
    price: 15.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'kitchen-utensils',
    weight: '1 lb',
    rating: 4.7,
    reviews: 123
  },
  {
    id: 'basting-brush-silicone',
    name: 'Silicone Basting Brush',
    description: 'Heat-resistant silicone basting brush, dishwasher safe',
    price: 9.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'kitchen-utensils',
    weight: '0.2 lbs',
    rating: 4.4,
    reviews: 156
  },
  {
    id: 'slotted-spoon-stainless',
    name: 'Stainless Steel Slotted Spoon',
    description: 'Professional slotted spoon for straining and serving',
    price: 11.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'kitchen-utensils',
    weight: '0.4 lbs',
    rating: 4.5,
    reviews: 167
  },

  // Small Appliances - 8 products
  {
    id: 'stand-mixer-professional',
    name: 'Professional Stand Mixer',
    description: '6-quart stand mixer with multiple attachments',
    price: 299.99,
    originalPrice: 349.99,
    image: 'https://picsum.photos/400/400?random=500',
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
    image: 'https://picsum.photos/400/400?random=500',
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
    image: 'https://picsum.photos/400/400?random=500',
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
    image: 'https://picsum.photos/400/400?random=500',
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
    image: 'https://picsum.photos/400/400?random=500',
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
    image: 'https://picsum.photos/400/400?random=500',
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
    image: 'https://picsum.photos/400/400?random=500',
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
    image: 'https://picsum.photos/400/400?random=500',
    category: 'small-appliances',
    weight: '2 lbs',
    rating: 4.7,
    reviews: 234
  },

  // Knives & Cutlery - 6 products
  {
    id: 'chef-knife-german',
    name: 'German Steel Chef Knife 8"',
    description: 'Professional German steel chef knife with ergonomic handle',
    price: 89.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'knives-cutlery',
    weight: '0.8 lbs',
    isPopular: true,
    rating: 4.9,
    reviews: 278
  },
  {
    id: 'knife-block-set',
    name: '15-Piece Knife Block Set',
    description: 'Complete knife set with wooden block and kitchen shears',
    price: 159.99,
    originalPrice: 199.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'knives-cutlery',
    weight: '8 lbs',
    isOnSale: true,
    rating: 4.6,
    reviews: 445
  },
  {
    id: 'paring-knife-ceramic',
    name: 'Ceramic Paring Knife',
    description: 'Ultra-sharp ceramic paring knife that stays sharp longer',
    price: 24.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'knives-cutlery',
    weight: '0.2 lbs',
    rating: 4.5,
    reviews: 167
  },
  {
    id: 'santoku-knife-japanese',
    name: 'Japanese Santoku Knife 7"',
    description: 'Traditional Japanese santoku knife with Damascus pattern',
    price: 119.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'knives-cutlery',
    weight: '0.6 lbs',
    rating: 4.8,
    reviews: 189
  },
  {
    id: 'bread-knife-serrated',
    name: 'Serrated Bread Knife',
    description: '10-inch serrated bread knife with comfortable grip',
    price: 34.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'knives-cutlery',
    weight: '0.5 lbs',
    rating: 4.4,
    reviews: 234
  },
  {
    id: 'steak-knife-set',
    name: 'Steak Knife Set of 6',
    description: 'Sharp stainless steel steak knives with wooden handles',
    price: 49.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'knives-cutlery',
    weight: '2 lbs',
    rating: 4.7,
    reviews: 156
  },

  // Kitchen Storage - 8 products
  {
    id: 'glass-containers-set',
    name: 'Glass Food Storage Set',
    description: '10-piece borosilicate glass containers with airtight lids',
    price: 59.99,
    originalPrice: 79.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'kitchen-storage',
    weight: '8 lbs',
    isOnSale: true,
    isPopular: true,
    rating: 4.6,
    reviews: 567
  },
  {
    id: 'plastic-containers-bpa-free',
    name: 'BPA-Free Plastic Container Set',
    description: 'Stackable plastic food storage containers, microwave safe',
    price: 29.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'kitchen-storage',
    weight: '3 lbs',
    rating: 4.4,
    reviews: 345
  },
  {
    id: 'spice-rack-magnetic',
    name: 'Magnetic Spice Rack',
    description: '12-jar magnetic spice rack with pre-filled common spices',
    price: 44.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'kitchen-storage',
    weight: '4 lbs',
    rating: 4.5,
    reviews: 234
  },
  {
    id: 'canister-set-ceramic',
    name: 'Ceramic Canister Set',
    description: '4-piece ceramic canisters with airtight bamboo lids',
    price: 39.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'kitchen-storage',
    weight: '6 lbs',
    rating: 4.7,
    reviews: 189
  },
  {
    id: 'vacuum-storage-bags',
    name: 'Vacuum Storage Bags',
    description: 'Space-saving vacuum seal bags for food storage',
    price: 19.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'kitchen-storage',
    weight: '1 lb',
    rating: 4.3,
    reviews: 278
  },
  {
    id: 'bread-box-bamboo',
    name: 'Bamboo Bread Box',
    description: 'Large bamboo bread box with roll-top lid',
    price: 49.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'kitchen-storage',
    weight: '5 lbs',
    rating: 4.6,
    reviews: 145
  },
  {
    id: 'pantry-organizers',
    name: 'Clear Pantry Organizer Bins',
    description: 'Set of 8 clear bins for pantry and cabinet organization',
    price: 34.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'kitchen-storage',
    weight: '4 lbs',
    rating: 4.5,
    reviews: 167
  },
  {
    id: 'mason-jar-set',
    name: 'Mason Jar Storage Set',
    description: '12-piece mason jar set with measuring lids',
    price: 24.99,
    originalPrice: 32.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'kitchen-storage',
    weight: '6 lbs',
    isOnSale: true,
    rating: 4.4,
    reviews: 234
  },

  // Kitchen Gadgets - 9 products
  {
    id: 'can-opener-electric',
    name: 'Electric Can Opener',
    description: 'Hands-free electric can opener with magnetic lid holder',
    price: 29.99,
    image: 'https://picsum.photos/400/400?random=500',
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
    image: 'https://picsum.photos/400/400?random=500',
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
    image: 'https://picsum.photos/400/400?random=500',
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
    image: 'https://picsum.photos/400/400?random=500',
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
    image: 'https://picsum.photos/400/400?random=500',
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
    image: 'https://picsum.photos/400/400?random=500',
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
    image: 'https://picsum.photos/400/400?random=500',
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
    image: 'https://picsum.photos/400/400?random=500',
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
    image: 'https://picsum.photos/400/400?random=500',
    category: 'kitchen-gadgets',
    weight: '0.4 lbs',
    rating: 4.6,
    reviews: 234
  },

  // Dinnerware - 6 products
  {
    id: 'dinner-plate-set-ceramic',
    name: 'Ceramic Dinner Plate Set',
    description: '12-piece ceramic dinnerware set, microwave and dishwasher safe',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'dinnerware',
    weight: '15 lbs',
    isOnSale: true,
    isPopular: true,
    rating: 4.6,
    reviews: 456
  },
  {
    id: 'bowl-set-melamine',
    name: 'Melamine Bowl Set',
    description: 'Colorful melamine bowls, perfect for outdoor dining',
    price: 34.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'dinnerware',
    weight: '3 lbs',
    rating: 4.4,
    reviews: 234
  },
  {
    id: 'serving-platter-bamboo',
    name: 'Bamboo Serving Platter',
    description: 'Large bamboo serving board with cheese knife slots',
    price: 29.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'dinnerware',
    weight: '2 lbs',
    rating: 4.7,
    reviews: 189
  },
  {
    id: 'salad-bowl-acacia',
    name: 'Acacia Wood Salad Bowl',
    description: 'Hand-crafted acacia wood salad bowl with servers',
    price: 39.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'dinnerware',
    weight: '2.5 lbs',
    rating: 4.8,
    reviews: 145
  },
  {
    id: 'soup-bowls-ceramic',
    name: 'Ceramic Soup Bowl Set',
    description: 'Set of 6 deep ceramic soup bowls with handles',
    price: 44.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'dinnerware',
    weight: '6 lbs',
    rating: 4.5,
    reviews: 167
  },
  {
    id: 'pasta-bowls-porcelain',
    name: 'Porcelain Pasta Bowls',
    description: 'Wide rim porcelain pasta bowls, set of 4',
    price: 49.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'dinnerware',
    weight: '4 lbs',
    rating: 4.6,
    reviews: 123
  },

  // Glassware - 7 products
  {
    id: 'wine-glass-set',
    name: 'Crystal Wine Glass Set',
    description: 'Set of 6 crystal wine glasses for red and white wine',
    price: 59.99,
    image: 'https://picsum.photos/400/400?random=500',
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
    image: 'https://picsum.photos/400/400?random=500',
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
    image: 'https://picsum.photos/400/400?random=500',
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
    image: 'https://picsum.photos/400/400?random=500',
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
    image: 'https://picsum.photos/400/400?random=500',
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
    image: 'https://picsum.photos/400/400?random=500',
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
    image: 'https://picsum.photos/400/400?random=500',
    category: 'glassware',
    weight: '1.5 lbs',
    rating: 4.6,
    reviews: 123
  },

  // Kitchen Textiles - 6 products
  {
    id: 'kitchen-towel-set',
    name: 'Microfiber Kitchen Towel Set',
    description: 'Super absorbent microfiber kitchen towels, set of 12',
    price: 19.99,
    originalPrice: 26.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'kitchen-textiles',
    weight: '2 lbs',
    isOnSale: true,
    isPopular: true,
    rating: 4.5,
    reviews: 567
  },
  {
    id: 'oven-mitts-silicone',
    name: 'Silicone Oven Mitts',
    description: 'Heat-resistant silicone oven mitts, up to 450°F',
    price: 24.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'kitchen-textiles',
    weight: '1 lb',
    rating: 4.6,
    reviews: 234
  },
  {
    id: 'apron-adjustable-cotton',
    name: 'Adjustable Cotton Apron',
    description: 'Professional-style cotton apron with multiple pockets',
    price: 22.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'kitchen-textiles',
    weight: '0.8 lbs',
    rating: 4.4,
    reviews: 189
  },
  {
    id: 'pot-holders-quilted',
    name: 'Quilted Pot Holders',
    description: 'Heat-resistant quilted pot holders, set of 4',
    price: 14.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'kitchen-textiles',
    weight: '0.5 lbs',
    rating: 4.3,
    reviews: 145
  },
  {
    id: 'dish-drying-mat',
    name: 'Microfiber Dish Drying Mat',
    description: 'Large microfiber mat for air-drying dishes',
    price: 16.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'kitchen-textiles',
    weight: '0.6 lbs',
    rating: 4.5,
    reviews: 278
  },
  {
    id: 'table-runner-linen',
    name: 'Linen Table Runner',
    description: 'Natural linen table runner for elegant dining',
    price: 29.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'kitchen-textiles',
    weight: '0.4 lbs',
    rating: 4.7,
    reviews: 156
  },

  // Food Preparation - 8 products
  {
    id: 'cutting-board-bamboo-large',
    name: 'Large Bamboo Cutting Board',
    description: 'Extra large bamboo cutting board with juice groove',
    price: 34.99,
    originalPrice: 44.99,
    image: 'https://picsum.photos/400/400?random=500',
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
    image: 'https://picsum.photos/400/400?random=500',
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
    image: 'https://picsum.photos/400/400?random=500',
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
    image: 'https://picsum.photos/400/400?random=500',
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
    image: 'https://picsum.photos/400/400?random=500',
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
    image: 'https://picsum.photos/400/400?random=500',
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
    image: 'https://picsum.photos/400/400?random=500',
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
    image: 'https://picsum.photos/400/400?random=500',
    category: 'food-preparation',
    weight: '1 lb',
    isOnSale: true,
    rating: 4.5,
    reviews: 145
  },

  // Specialty Equipment - 7 products
  {
    id: 'pasta-machine-stainless',
    name: 'Stainless Steel Pasta Machine',
    description: 'Manual pasta machine with adjustable thickness settings',
    price: 69.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'specialty-equipment',
    weight: '8 lbs',
    isPopular: true,
    rating: 4.6,
    reviews: 189
  },
  {
    id: 'meat-thermometer-digital',
    name: 'Digital Meat Thermometer',
    description: 'Instant-read digital thermometer with probe and timer',
    price: 29.99,
    originalPrice: 39.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'specialty-equipment',
    weight: '0.5 lbs',
    isOnSale: true,
    rating: 4.7,
    reviews: 278
  },
  {
    id: 'mortar-pestle-granite',
    name: 'Granite Mortar & Pestle',
    description: 'Large granite mortar and pestle for spice grinding',
    price: 34.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'specialty-equipment',
    weight: '6 lbs',
    rating: 4.8,
    reviews: 156
  },
  {
    id: 'smoking-gun-handheld',
    name: 'Handheld Smoking Gun',
    description: 'Professional smoking gun for adding smoke flavor',
    price: 89.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'specialty-equipment',
    weight: '1.5 lbs',
    rating: 4.5,
    reviews: 89
  },
  {
    id: 'sous-vide-circulator',
    name: 'Immersion Sous Vide Circulator',
    description: 'Precision temperature control for sous vide cooking',
    price: 149.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'specialty-equipment',
    weight: '2 lbs',
    rating: 4.6,
    reviews: 234
  },
  {
    id: 'ice-cream-maker',
    name: 'Electric Ice Cream Maker',
    description: '2-quart electric ice cream maker with compressor',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'specialty-equipment',
    weight: '22 lbs',
    isOnSale: true,
    rating: 4.4,
    reviews: 145
  },
  {
    id: 'dehydrator-food',
    name: 'Food Dehydrator',
    description: '9-tray food dehydrator with temperature control',
    price: 119.99,
    image: 'https://picsum.photos/400/400?random=500',
    category: 'specialty-equipment',
    weight: '12 lbs',
    rating: 4.5,
    reviews: 167
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

export const getDeals = (): Product[] => {
  return products.filter(product => product.originalPrice && product.originalPrice > product.price);
};
