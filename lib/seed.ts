import { 
  initializeDatabase, 
  insertCategory, 
  insertProduct, 
  updateCategoryProductCount,
  getAllCategories,
  getAllProducts
} from './database';
import { categories as staticCategories, products as staticProducts } from './data';

export const seedDatabase = async () => {
  console.log('Starting database seeding...');
  
  try {
    // Initialize database and create tables
    initializeDatabase();
    
    // Check if data already exists
    const existingCategories = getAllCategories();
    const existingProducts = getAllProducts();
    
    if (existingCategories.length > 0 && existingProducts.length > 0) {
      console.log('Database already contains data. Skipping seed.');
      return;
    }
    
    // Insert categories
    console.log('Inserting categories...');
    for (const category of staticCategories) {
      try {
        insertCategory(category);
        console.log(`Inserted category: ${category.name}`);
      } catch (error) {
        console.log(`Category ${category.name} already exists, skipping...`);
      }
    }
    
    // Insert products
    console.log('Inserting products...');
    for (const product of staticProducts) {
      try {
        insertProduct(product);
        console.log(`Inserted product: ${product.name}`);
      } catch (error) {
        console.log(`Product ${product.name} already exists, skipping...`);
      }
    }
    
    // Update category product counts
    console.log('Updating category product counts...');
    for (const category of staticCategories) {
      updateCategoryProductCount(category.id);
    }
    
    console.log('Database seeding completed successfully!');
    
    // Log summary
    const finalCategories = getAllCategories();
    const finalProducts = getAllProducts();
    console.log(`Total categories: ${finalCategories.length}`);
    console.log(`Total products: ${finalProducts.length}`);
    
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Seeding completed.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}