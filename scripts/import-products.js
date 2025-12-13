const XLSX = require('xlsx');
const path = require('path');
const Database = require('better-sqlite3');

// Configuration
const USAGE = `
Usage: node import-products.js <category> <excel-file>

Examples:
  node import-products.js cookware cookware-data.xlsx
  node import-products.js bakeware bakeware.xlsx
  node import-products.js kitchen-utensils utensils.xlsx
  
Categories: cookware, bakeware, kitchen-utensils, small-appliances, knives-cutlery, kitchen-storage, kitchen-gadgets, glassware
`;

// Get command line arguments
function getArgs() {
  const args = process.argv.slice(2);
  
  if (args.length !== 2) {
    console.log(USAGE);
    process.exit(1);
  }
  
  const [category, filename] = args;
  const validCategories = [
    'cookware', 'bakeware', 'kitchen-utensils', 'small-appliances', 
    'knives-cutlery', 'kitchen-storage', 'kitchen-gadgets', 'glassware'
  ];
  
  if (!validCategories.includes(category)) {
    console.error(`❌ Invalid category: ${category}`);
    console.error(`Valid categories: ${validCategories.join(', ')}`);
    process.exit(1);
  }
  
  return { category, filename };
}

// Database setup
function initDb() {
  const dbPath = path.join(process.cwd(), 'ramlis-home.db');
  const db = new Database(dbPath);
  console.log('Connected to database:', dbPath);
  return db;
}

// Read Excel file
function readExcelFile(filename) {
  try {
    const filePath = path.join(process.cwd(), filename);
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    console.log(`📊 Found ${jsonData.length} products in ${filename}`);
    return jsonData;
  } catch (error) {
    console.error(`❌ Error reading Excel file '${filename}':`, error.message);
    return null;
  }
}

// Generate product ID from name
function generateProductId(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50) + '-' + Math.random().toString(36).substring(2, 8);
}

// Extract description based on category
function extractDescription(product, category) {
  let description = '';
  
  // Common fields for all categories
  if (product.details_included_components) {
    description += `This ${category.replace('-', ' ')} includes: ${product.details_included_components}. `;
  }
  
  if (product.details_material_feature) {
    description += `Features: ${product.details_material_feature}. `;
  }
  
  if (product.details_special_feature) {
    description += `Special features: ${product.details_special_feature}. `;
  }
  
  // Category-specific descriptions
  switch (category) {
    case 'cookware':
    case 'bakeware':
      if (product.details_product_care_instructions) {
        description += `Care instructions: ${product.details_product_care_instructions}. `;
      }
      if (product.details_upper_temperature_rating) {
        description += `Temperature rating: ${product.details_upper_temperature_rating}. `;
      }
      if (product.details_is_dishwasher_safe === 'Yes') {
        description += 'Dishwasher safe. ';
      }
      if (product.details_is_oven_safe === 'Yes') {
        description += 'Oven safe. ';
      }
      if (product.details_is_cookware_induction_compatible === 'Yes') {
        description += 'Induction compatible. ';
      }
      break;
      
    case 'knives-cutlery':
      if (product.details_blade_material) {
        description += `Blade material: ${product.details_blade_material}. `;
      }
      if (product.details_handle_material) {
        description += `Handle material: ${product.details_handle_material}. `;
      }
      break;
      
    case 'small-appliances':
      if (product.details_wattage) {
        description += `Wattage: ${product.details_wattage}. `;
      }
      if (product.details_voltage) {
        description += `Voltage: ${product.details_voltage}. `;
      }
      break;
      
    case 'kitchen-storage':
      if (product.details_capacity) {
        description += `Capacity: ${product.details_capacity}. `;
      }
      if (product.details_closure_type) {
        description += `Closure type: ${product.details_closure_type}. `;
      }
      break;
      
    case 'glassware':
      if (product.details_material) {
        description += `Material: ${product.details_material}. `;
      }
      if (product.details_capacity) {
        description += `Capacity: ${product.details_capacity}. `;
      }
      if (product.details_is_dishwasher_safe === 'Yes') {
        description += 'Dishwasher safe. ';
      }
      if (product.details_is_microwave_safe === 'Yes') {
        description += 'Microwave safe. ';
      }
      break;
  }
  
  if (product.details_product_dimensions) {
    description += `Dimensions: ${product.details_product_dimensions}. `;
  }
  
  const brandName = product.details_manufacturer || product.details_brand || '';
  return description.trim() || `Premium ${brandName} ${category.replace('-', ' ')} with excellent quality and durability.`;
}

// Map Excel data to product format
function mapExcelToProduct(excelProduct, category) {
  const isOnSale = excelProduct.old_price_parsed && excelProduct.old_price_parsed > excelProduct.price_parsed;
  const isPopular = excelProduct.reviews > 1000 || excelProduct.rating >= 4.5;
  
  return {
    id: generateProductId(excelProduct.name),
    name: excelProduct.name,
    description: extractDescription(excelProduct, category),
    price: parseFloat(excelProduct.price_parsed) || 0,
    originalPrice: isOnSale ? parseFloat(excelProduct.old_price_parsed) : null,
    image: excelProduct.image_1 || excelProduct.high_res_images?.split(',')[0]?.trim() || '',
    category: category,
    weight: excelProduct.details_item_weight || null,
    isPopular: isPopular,
    isOnSale: isOnSale,
    rating: parseFloat(excelProduct.rating) || 0,
    reviews: parseInt(excelProduct.reviews) || 0
  };
}

// Clear existing products in category
function clearCategoryProducts(db, category) {
  try {
    const result = db.prepare('DELETE FROM products WHERE category = ?').run(category);
    console.log(`🗑️ Removed ${result.changes} existing ${category} products`);
    return result.changes;
  } catch (error) {
    console.error(`❌ Error clearing ${category} products:`, error);
    return 0;
  }
}

// Insert new product
function insertProduct(db, product) {
  try {
    const stmt = db.prepare(`
      INSERT INTO products (
        id, name, description, price, original_price, image, category, 
        weight, is_popular, is_on_sale, rating, reviews
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run(
      product.id,
      product.name,
      product.description,
      product.price,
      product.originalPrice,
      product.image,
      product.category,
      product.weight,
      product.isPopular ? 1 : 0,
      product.isOnSale ? 1 : 0,
      product.rating,
      product.reviews
    );
    
    return true;
  } catch (error) {
    console.error('❌ Error inserting product:', product.name, error.message);
    return false;
  }
}

// Update category product count
function updateCategoryCount(db, category) {
  try {
    const count = db.prepare('SELECT COUNT(*) as count FROM products WHERE category = ?').get(category);
    const updateResult = db.prepare('UPDATE categories SET product_count = ? WHERE id = ?').run(count.count, category);
    
    if (updateResult.changes > 0) {
      console.log(`📊 Updated ${category} category count to ${count.count}`);
    } else {
      console.log(`⚠️ Category '${category}' not found in categories table, but products imported successfully`);
    }
  } catch (error) {
    console.error('❌ Error updating category count:', error);
  }
}

// Validate product data
function validateProduct(product) {
  const required = ['name', 'price_parsed'];
  const missing = required.filter(field => !product[field]);
  
  if (missing.length > 0) {
    console.warn(`⚠️ Product missing required fields: ${missing.join(', ')} - ${product.name || 'Unknown'}`);
    return false;
  }
  
  return true;
}

// Main import function
async function importProducts() {
  console.log('🚀 Starting product import...\n');
  
  const { category, filename } = getArgs();
  const db = initDb();
  const excelData = readExcelFile(filename);
  
  if (!excelData || excelData.length === 0) {
    console.log('❌ No data found in Excel file');
    db.close();
    return;
  }
  
  console.log(`📂 Importing into category: ${category}`);
  console.log(`📄 From file: ${filename}\n`);
  
  // Clear existing products in category
  const removedCount = clearCategoryProducts(db, category);
  console.log('');
  
  // Import new products
  console.log(`📦 Importing ${category} products...`);
  let successCount = 0;
  let failCount = 0;
  let skippedCount = 0;
  
  for (const [index, excelProduct] of excelData.entries()) {
    try {
      if (!validateProduct(excelProduct)) {
        skippedCount++;
        continue;
      }
      
      const product = mapExcelToProduct(excelProduct, category);
      const success = insertProduct(db, product);
      
      if (success) {
        successCount++;
        console.log(`✅ ${successCount.toString().padStart(2, ' ')}. ${product.name.substring(0, 60)}...`);
      } else {
        failCount++;
      }
    } catch (error) {
      failCount++;
      console.error(`❌ Failed to process product ${index + 1}: ${excelProduct.name || 'Unknown'}`);
    }
  }
  
  // Update category count
  updateCategoryCount(db, category);
  
  console.log('\n📋 Import Summary:');
  console.log(`📂 Category: ${category}`);
  console.log(`📄 Source file: ${filename}`);
  console.log(`🗑️ Removed: ${removedCount} existing products`);
  console.log(`✅ Successfully imported: ${successCount} products`);
  console.log(`❌ Failed imports: ${failCount} products`);
  console.log(`⚠️ Skipped (invalid): ${skippedCount} products`);
  console.log(`📊 Success rate: ${((successCount / (excelData.length - skippedCount)) * 100).toFixed(1)}%`);
  
  db.close();
  console.log(`\n🎉 ${category} import completed!`);
}

// Handle errors and run
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled error:', error);
  process.exit(1);
});

// Run the import
importProducts().catch((error) => {
  console.error('❌ Import failed:', error);
  process.exit(1);
});