const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'ramlis-home.db');
const db = new Database(dbPath);

console.log('Connected to database:', dbPath);

const categoryToDelete = 'kitchen-utensils';

try {
  // Start transaction
  db.exec('BEGIN TRANSACTION');

  // Delete all products belonging to Kitchen Utensils
  const deleteProductsStmt = db.prepare('DELETE FROM products WHERE category = ?');
  const productsResult = deleteProductsStmt.run(categoryToDelete);
  console.log(`Deleted ${productsResult.changes} products from category: ${categoryToDelete}`);

  // Delete the Kitchen Utensils category
  const deleteCategoryStmt = db.prepare('DELETE FROM categories WHERE id = ?');
  const categoryResult = deleteCategoryStmt.run(categoryToDelete);
  console.log(`Deleted category: ${categoryToDelete}`);

  // Commit transaction
  db.exec('COMMIT');

  console.log('\n✅ Deletion completed successfully!');
  console.log(`Total products deleted: ${productsResult.changes}`);
  console.log(`Total categories deleted: ${categoryResult.changes}`);

  // Show remaining categories
  console.log('\n📋 Remaining categories:');
  const remainingCategories = db.prepare('SELECT id, name, product_count FROM categories ORDER BY name').all();
  remainingCategories.forEach(cat => {
    console.log(`  - ${cat.name} (${cat.id}): ${cat.product_count} products`);
  });

  // Update product counts
  console.log('\n🔄 Updating product counts...');
  const updateCountStmt = db.prepare(`
    UPDATE categories 
    SET product_count = (SELECT COUNT(*) FROM products WHERE category = categories.id)
  `);
  updateCountStmt.run();
  console.log('Product counts updated!');

} catch (error) {
  db.exec('ROLLBACK');
  console.error('❌ Error during deletion:', error);
  process.exit(1);
} finally {
  db.close();
  console.log('\n✅ Database connection closed.');
}
