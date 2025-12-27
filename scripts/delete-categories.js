const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'ramlis-home.db');
const db = new Database(dbPath);

console.log('Connected to database:', dbPath);

// Categories to delete
const categoriesToDelete = [
  'knives-cutlery',
  'kitchen-storage',
  'dinnerware',
  'kitchen-textiles',
  'specialty-equipment'
];

try {
  // Start transaction
  db.exec('BEGIN TRANSACTION');

  // First, delete all products belonging to these categories
  const deleteProductsStmt = db.prepare('DELETE FROM products WHERE category = ?');
  
  let totalProductsDeleted = 0;
  categoriesToDelete.forEach(categoryId => {
    const result = deleteProductsStmt.run(categoryId);
    console.log(`Deleted ${result.changes} products from category: ${categoryId}`);
    totalProductsDeleted += result.changes;
  });

  // Then, delete the categories themselves
  const deleteCategoryStmt = db.prepare('DELETE FROM categories WHERE id = ?');
  
  let totalCategoriesDeleted = 0;
  categoriesToDelete.forEach(categoryId => {
    const result = deleteCategoryStmt.run(categoryId);
    console.log(`Deleted category: ${categoryId}`);
    totalCategoriesDeleted += result.changes;
  });

  // Commit transaction
  db.exec('COMMIT');

  console.log('\n✅ Deletion completed successfully!');
  console.log(`Total products deleted: ${totalProductsDeleted}`);
  console.log(`Total categories deleted: ${totalCategoriesDeleted}`);

  // Show remaining categories
  console.log('\n📋 Remaining categories:');
  const remainingCategories = db.prepare('SELECT id, name, product_count FROM categories ORDER BY name').all();
  remainingCategories.forEach(cat => {
    console.log(`  - ${cat.name} (${cat.id}): ${cat.product_count} products`);
  });

  // Update product counts for remaining categories
  console.log('\n🔄 Updating product counts...');
  const updateCountStmt = db.prepare(`
    UPDATE categories 
    SET product_count = (SELECT COUNT(*) FROM products WHERE category = categories.id)
  `);
  updateCountStmt.run();
  console.log('Product counts updated!');

} catch (error) {
  // Rollback on error
  db.exec('ROLLBACK');
  console.error('❌ Error during deletion:', error);
  process.exit(1);
} finally {
  db.close();
  console.log('\n✅ Database connection closed.');
}
