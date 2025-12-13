const XLSX = require('xlsx');
const path = require('path');
const Database = require('better-sqlite3');

// Database setup
function initDb() {
  const dbPath = path.join(process.cwd(), 'ramlis-home.db');
  const db = new Database(dbPath);
  console.log('Connected to database:', dbPath);
  return db;
}

// Read Excel file
function readExcelFile() {
  try {
    const filePath = path.join(process.cwd(), 'Outscraper-20251213170553xs04.xlsx');
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    console.log(`📊 Found ${jsonData.length} products in Excel file`);
    return jsonData;
  } catch (error) {
    console.error('❌ Error reading Excel file:', error);
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

// Extract key features from included components
function extractDescription(product) {
  let description = '';
  
  if (product.details_included_components) {
    description += `This ${product.details_number_of_pieces || ''} piece cookware set includes: ${product.details_included_components}. `;
  }
  
  if (product.details_material_type_free) {
    description += `${product.details_material_type_free}. `;
  }
  
  if (product.details_special_feature) {
    description += `Features: ${product.details_special_feature}. `;
  }
  
  if (product.details_is_dishwasher_safe === 'Yes') {
    description += 'Dishwasher safe. ';
  }
  
  if (product.details_is_oven_safe === 'Yes') {
    description += 'Oven safe. ';
  }
  
  if (product.details_is_cookware_induction_compatible === 'Yes') {
    description += 'Induction compatible.';
  }
  
  return description.trim() || `Premium ${product.details_brand || ''} cookware set with excellent quality and durability.`;
}

// Map Excel data to product format
function mapExcelToProduct(excelProduct) {
  const isOnSale = excelProduct.old_price_parsed && excelProduct.old_price_parsed > excelProduct.price_parsed;
  const isPopular = excelProduct.reviews > 1000 || excelProduct.rating >= 4.5;
  
  return {
    id: generateProductId(excelProduct.name),
    name: excelProduct.name,
    description: extractDescription(excelProduct),
    price: parseFloat(excelProduct.price_parsed) || 0,
    originalPrice: isOnSale ? parseFloat(excelProduct.old_price_parsed) : null,
    image: excelProduct.image_1 || excelProduct.high_res_images?.split(',')[0]?.trim() || '',
    category: 'cookware',
    weight: excelProduct.details_item_weight || null,
    isPopular: isPopular,
    isOnSale: isOnSale,
    rating: parseFloat(excelProduct.rating) || 0,
    reviews: parseInt(excelProduct.reviews) || 0
  };
}

// Clear existing cookware products
function clearCookwareProducts(db) {
  try {
    const result = db.prepare('DELETE FROM products WHERE category = ?').run('cookware');
    console.log(`🗑️ Removed ${result.changes} existing cookware products`);
    return result.changes;
  } catch (error) {
    console.error('❌ Error clearing cookware products:', error);
    return 0;
  }
}

// Insert new products
function insertProducts(db, products) {
  const insertStmt = db.prepare(`
    INSERT INTO products (
      id, name, description, price, original_price, image, category, 
      weight, is_popular, is_on_sale, rating, reviews
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  let inserted = 0;
  let failed = 0;

  products.forEach((product, index) => {
    try {
      insertStmt.run(
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
      inserted++;
      console.log(`✅ ${index + 1}. ${product.name.substring(0, 50)}...`);
    } catch (error) {
      failed++;
      console.error(`❌ Failed to insert product ${index + 1}: ${error.message}`);
    }
  });

  return { inserted, failed };
}

// Update cookware category product count
function updateCategoryCount(db) {
  try {
    // Get count of cookware products
    const count = db.prepare('SELECT COUNT(*) as count FROM products WHERE category = ?').get('cookware')?.count || 0;
    
    // Update category table
    const updateResult = db.prepare('UPDATE categories SET product_count = ? WHERE id = ?').run(count, 'cookware');
    
    if (updateResult.changes === 0) {
      // Insert cookware category if it doesn't exist
      db.prepare(`
        INSERT OR REPLACE INTO categories (id, name, description, product_count)
        VALUES (?, ?, ?, ?)
      `).run('cookware', 'Cookware', 'Premium pots, pans, and cookware sets for all your cooking needs', count);
      console.log('📝 Created cookware category');
    }
    
    console.log(`📊 Updated cookware category count: ${count} products`);
  } catch (error) {
    console.error('❌ Error updating category count:', error);
  }
}

// Main import function
async function importCookware() {
  console.log('🚀 Starting cookware import process...\n');

  // Read Excel data
  const excelData = readExcelFile();
  if (!excelData || excelData.length === 0) {
    console.log('❌ No data found in Excel file');
    return;
  }

  // Connect to database
  const db = initDb();

  try {
    // Clear existing cookware products
    console.log('\n🗑️ Clearing existing cookware products...');
    const removedCount = clearCookwareProducts(db);

    // Map Excel data to product format
    console.log('\n🔄 Converting Excel data to product format...');
    const products = excelData.map(mapExcelToProduct);
    
    console.log(`\n📝 Sample product preview:`);
    console.log(`Name: ${products[0].name}`);
    console.log(`Price: $${products[0].price}`);
    console.log(`Original Price: ${products[0].originalPrice ? '$' + products[0].originalPrice : 'N/A'}`);
    console.log(`On Sale: ${products[0].isOnSale ? '✅' : '❌'}`);
    console.log(`Rating: ${products[0].rating} (${products[0].reviews} reviews)`);
    console.log(`Description: ${products[0].description.substring(0, 100)}...`);

    // Insert new products
    console.log('\n📦 Inserting new cookware products...');
    const { inserted, failed } = insertProducts(db, products);

    // Update category count
    console.log('\n📊 Updating category counts...');
    updateCategoryCount(db);

    // Summary
    console.log('\n🎉 IMPORT COMPLETED!');
    console.log(`═══════════════════════`);
    console.log(`📊 Removed: ${removedCount} old products`);
    console.log(`✅ Inserted: ${inserted} new products`);
    console.log(`❌ Failed: ${failed} products`);
    console.log(`📈 Success Rate: ${Math.round((inserted / (inserted + failed)) * 100)}%`);
    console.log(`═══════════════════════`);

  } catch (error) {
    console.error('❌ Import failed:', error);
  } finally {
    db.close();
    console.log('📚 Database connection closed');
  }
}

// Run the import
importCookware().catch(console.error);