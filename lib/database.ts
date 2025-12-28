import { Category, Product } from './types';
import path from 'path';

let Database: any;
let db: any;

// Lazy load better-sqlite3 to avoid SSR issues
const initDb = () => {
  if (!db) {
    try {
      Database = require('better-sqlite3');
      const dbPath = path.join(process.cwd(), 'ramlis-home.db');
      db = new Database(dbPath);
      console.log('SQLite database initialized at:', dbPath);
    } catch (error) {
      console.error('Failed to initialize SQLite database:', error);
      throw error;
    }
  }
  return db;
};

// Create tables
const createTables = () => {
  const database = initDb();
  
  // Enable foreign keys
  database.exec('PRAGMA foreign_keys = ON');

  // Categories table
  database.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      image TEXT,
      product_count INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Products table
  database.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      original_price REAL,
      image TEXT,
      category TEXT NOT NULL,
      weight TEXT,
      is_popular BOOLEAN DEFAULT 0,
      is_on_sale BOOLEAN DEFAULT 0,
      rating REAL DEFAULT 0,
      reviews INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category) REFERENCES categories(id)
    )
  `);

  // Cart items table (for persistent cart functionality)
  database.exec(`
    CREATE TABLE IF NOT EXISTS cart_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id TEXT NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      session_id TEXT,
      user_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products(id)
    )
  `);

  // Wishlist items table
  database.exec(`
    CREATE TABLE IF NOT EXISTS wishlist_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id TEXT NOT NULL,
      session_id TEXT,
      user_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products(id)
    )
  `);

  // Orders table (for future order functionality)
  database.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_number TEXT UNIQUE NOT NULL,
      user_id TEXT,
      session_id TEXT,
      total_amount REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      shipping_address TEXT,
      billing_address TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Order items table
  database.exec(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      price REAL NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    )
  `);

  // Users table
  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      phone TEXT,
      date_of_birth DATE,
      reset_token TEXT,
      reset_expires TEXT,
      is_active BOOLEAN DEFAULT 1,
      email_verified BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // User addresses table
  database.exec(`
    CREATE TABLE IF NOT EXISTS user_addresses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      type TEXT NOT NULL, -- 'shipping' or 'billing'
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      company TEXT,
      address_line_1 TEXT NOT NULL,
      address_line_2 TEXT,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      postal_code TEXT NOT NULL,
      country TEXT NOT NULL DEFAULT 'US',
      phone TEXT,
      is_default BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // User sessions table
  database.exec(`
    CREATE TABLE IF NOT EXISTS user_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      session_token TEXT UNIQUE NOT NULL,
      expires_at DATETIME NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  console.log('Database tables created successfully');
};

// Get prepared statements (lazy initialization)
const getStatements = () => {
  const database = initDb();
  return {
    getCategoriesStmt: database.prepare('SELECT * FROM categories ORDER BY name'),
    getCategoryByIdStmt: database.prepare('SELECT * FROM categories WHERE id = ?'),
    insertCategoryStmt: database.prepare(`
      INSERT INTO categories (id, name, description, image, product_count)
      VALUES (?, ?, ?, ?, ?)
    `),
    updateCategoryProductCountStmt: database.prepare(`
      UPDATE categories SET product_count = ? WHERE id = ?
    `),
    getProductsStmt: database.prepare('SELECT * FROM products ORDER BY name'),
    getProductsByCategoryStmt: database.prepare('SELECT * FROM products WHERE category = ? ORDER BY name'),
    getProductByIdStmt: database.prepare('SELECT * FROM products WHERE id = ?'),
    getPopularProductsStmt: database.prepare('SELECT * FROM products WHERE is_popular = 1 ORDER BY name'),
    getOnSaleProductsStmt: database.prepare('SELECT * FROM products WHERE is_on_sale = 1 ORDER BY name'),
    searchProductsStmt: database.prepare(`
      SELECT * FROM products 
      WHERE name LIKE ? OR description LIKE ? OR category LIKE ?
      ORDER BY name
    `),
    insertProductStmt: database.prepare(`
      INSERT INTO products (
        id, name, description, price, original_price, image, category, 
        weight, is_popular, is_on_sale, rating, reviews
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `),
    // User statements
    getUserByEmailStmt: database.prepare('SELECT * FROM users WHERE email = ?'),
    getUserByIdStmt: database.prepare('SELECT * FROM users WHERE id = ?'),
    insertUserStmt: database.prepare(`
      INSERT INTO users (email, password_hash, first_name, last_name, phone, date_of_birth)
      VALUES (?, ?, ?, ?, ?, ?)
    `),
    updateUserStmt: database.prepare(`
      UPDATE users SET first_name = ?, last_name = ?, phone = ?, date_of_birth = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `),
    // Session statements
    insertSessionStmt: database.prepare(`
      INSERT INTO user_sessions (user_id, session_token, expires_at)
      VALUES (?, ?, ?)
    `),
    getSessionStmt: database.prepare('SELECT * FROM user_sessions WHERE session_token = ? AND expires_at > CURRENT_TIMESTAMP'),
    deleteSessionStmt: database.prepare('DELETE FROM user_sessions WHERE session_token = ?'),
    deleteExpiredSessionsStmt: database.prepare('DELETE FROM user_sessions WHERE expires_at <= CURRENT_TIMESTAMP')
  };
};

// Database functions
export const initializeDatabase = () => {
  createTables();
};

// Category functions
export const getAllCategories = (): Category[] => {
  const { getCategoriesStmt } = getStatements();
  const rows = getCategoriesStmt.all();
  return rows.map((row: { id: any; name: any; description: any; image: any; product_count: any; }) => ({
    id: row.id,
    name: row.name,
    description: row.description || '',
    image: row.image || '',
    productCount: row.product_count || 0
  }));
};

export const getCategoryById = (id: string): Category | null => {
  const { getCategoryByIdStmt } = getStatements();
  const row = getCategoryByIdStmt.get(id);
  if (!row) return null;
  
  return {
    id: row.id,
    name: row.name,
    description: row.description || '',
    image: row.image || '',
    productCount: row.product_count || 0
  };
};

export const insertCategory = (category: Category): void => {
  const { insertCategoryStmt } = getStatements();
  insertCategoryStmt.run(
    category.id,
    category.name,
    category.description,
    category.image,
    category.productCount
  );
};

// Product functions
export const getAllProducts = (): Product[] => {
  const { getProductsStmt } = getStatements();
  const rows = getProductsStmt.all();
  return rows.map(mapRowToProduct);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  const { getProductsByCategoryStmt } = getStatements();
  const rows = getProductsByCategoryStmt.all(categoryId);
  return rows.map(mapRowToProduct);
};

export const getProductById = (id: string): Product | null => {
  const { getProductByIdStmt } = getStatements();
  const row = getProductByIdStmt.get(id);
  if (!row) return null;
  
  return mapRowToProduct(row);
};

export const getPopularProducts = (): Product[] => {
  const { getPopularProductsStmt } = getStatements();
  const rows = getPopularProductsStmt.all();
  return rows.map(mapRowToProduct);
};

export const getOnSaleProducts = (): Product[] => {
  const { getOnSaleProductsStmt } = getStatements();
  const rows = getOnSaleProductsStmt.all();
  return rows.map(mapRowToProduct);
};

export const searchProducts = (query: string): Product[] => {
  const { searchProductsStmt } = getStatements();
  const searchTerm = `%${query}%`;
  const rows = searchProductsStmt.all(searchTerm, searchTerm, searchTerm);
  return rows.map(mapRowToProduct);
};

export const getDeals = (): Product[] => {
  return getOnSaleProducts().filter(product => 
    product.originalPrice && product.originalPrice > product.price
  );
};

export const insertProduct = (product: Product): void => {
  const { insertProductStmt } = getStatements();
  insertProductStmt.run(
    product.id,
    product.name,
    product.description,
    product.price,
    product.originalPrice || null,
    product.image,
    product.category,
    product.weight || null,
    product.isPopular ? 1 : 0,
    product.isOnSale ? 1 : 0,
    product.rating || 0,
    product.reviews || 0
  );
};

// Update product count for categories
export const updateCategoryProductCount = (categoryId: string): void => {
  const database = initDb();
  const { updateCategoryProductCountStmt } = getStatements();
  const count = database.prepare('SELECT COUNT(*) as count FROM products WHERE category = ?').get(categoryId)?.count || 0;
  updateCategoryProductCountStmt.run(count, categoryId);
};

// Helper function to map database row to Product interface
const mapRowToProduct = (row: any): Product => ({
  id: row.id,
  name: row.name,
  description: row.description || '',
  price: row.price,
  originalPrice: row.original_price || undefined,
  image: row.image || '',
  category: row.category,
  weight: row.weight || undefined,
  isPopular: Boolean(row.is_popular),
  isOnSale: Boolean(row.is_on_sale),
  rating: row.rating || 0,
  reviews: row.reviews || 0
});

// User authentication functions
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserSession {
  id: number;
  userId: number;
  sessionToken: string;
  expiresAt: string;
  createdAt: string;
}

export const createUser = (userData: {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
}): number => {
  const { insertUserStmt } = getStatements();
  const result = insertUserStmt.run(
    userData.email,
    userData.passwordHash,
    userData.firstName,
    userData.lastName,
    userData.phone || null,
    userData.dateOfBirth || null
  );
  return result.lastInsertRowid as number;
};

export const getUserByEmail = (email: string): User | null => {
  const { getUserByEmailStmt } = getStatements();
  const row = getUserByEmailStmt.get(email);
  if (!row) return null;
  
  return mapRowToUser(row);
};

export const getUserById = (id: number): User | null => {
  const { getUserByIdStmt } = getStatements();
  const row = getUserByIdStmt.get(id);
  if (!row) return null;
  
  return mapRowToUser(row);
};

export const updateUser = (id: number, userData: {
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
}): void => {
  const { updateUserStmt } = getStatements();
  updateUserStmt.run(
    userData.firstName,
    userData.lastName,
    userData.phone || null,
    userData.dateOfBirth || null,
    id
  );
};

// Session management functions
export const createSession = (userId: number, sessionToken: string, expiresAt: Date): void => {
  const { insertSessionStmt } = getStatements();
  insertSessionStmt.run(userId, sessionToken, expiresAt.toISOString());
};

export const getSession = (sessionToken: string): (UserSession & { user: User }) | null => {
  const { getSessionStmt } = getStatements();
  const row = getSessionStmt.get(sessionToken);
  if (!row) return null;

  const user = getUserById(row.user_id);
  if (!user) return null;

  return {
    id: row.id,
    userId: row.user_id,
    sessionToken: row.session_token,
    expiresAt: row.expires_at,
    createdAt: row.created_at,
    user
  };
};

export const deleteSession = (sessionToken: string): void => {
  const { deleteSessionStmt } = getStatements();
  deleteSessionStmt.run(sessionToken);
};

export const cleanupExpiredSessions = (): void => {
  const { deleteExpiredSessionsStmt } = getStatements();
  deleteExpiredSessionsStmt.run();
};

export const setPasswordResetToken = (email: string, resetToken: string, resetExpires: string): boolean => {
  const database = initDb();
  const result = database.prepare(`
    UPDATE users 
    SET reset_token = ?, reset_expires = ?
    WHERE email = ?
  `).run(resetToken, resetExpires, email);
  return result.changes > 0;
};

export const getPasswordResetToken = (resetToken: string): User | null => {
  const database = initDb();
  const row = database.prepare(`
    SELECT id, email, first_name, last_name, reset_token, reset_expires
    FROM users 
    WHERE reset_token = ? AND reset_expires > datetime('now')
  `).get(resetToken);
  return row ? mapRowToUser(row) : null;
};

export const clearPasswordResetToken = (email: string): void => {
  const database = initDb();
  database.prepare(`
    UPDATE users 
    SET reset_token = NULL, reset_expires = NULL
    WHERE email = ?
  `).run(email);
};

// Helper function to map database row to User interface
const mapRowToUser = (row: any): User => ({
  id: row.id,
  email: row.email,
  firstName: row.first_name,
  lastName: row.last_name,
  phone: row.phone || undefined,
  dateOfBirth: row.date_of_birth || undefined,
  isActive: Boolean(row.is_active),
  emailVerified: Boolean(row.email_verified),
  createdAt: row.created_at,
  updatedAt: row.updated_at
});

// Order management functions
export interface Order {
  id: number;
  orderNumber: string;
  userId?: string;
  sessionId?: string;
  totalAmount: number;
  status: string;
  shippingAddress?: string;
  billingAddress?: string;
  customerEmail?: string;
  customerName?: string;
  paymentMethod?: string;
  createdAt: string;
  updatedAt: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: string;
  productName?: string;
  quantity: number;
  price: number;
}

export const createOrder = (orderData: {
  orderNumber: string;
  userId?: string;
  sessionId?: string;
  totalAmount: number;
  status?: string;
  shippingAddress?: string;
  billingAddress?: string;
  customerEmail?: string;
  customerName?: string;
  paymentMethod?: string;
}): number => {
  const database = initDb();
  const result = database.prepare(`
    INSERT INTO orders (
      order_number, user_id, session_id, total_amount, status,
      shipping_address, billing_address
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    orderData.orderNumber,
    orderData.userId || null,
    orderData.sessionId || null,
    orderData.totalAmount,
    orderData.status || 'pending',
    orderData.shippingAddress || null,
    orderData.billingAddress || null
  );
  return result.lastInsertRowid as number;
};

export const addOrderItem = (orderItem: {
  orderId: number;
  productId: string;
  quantity: number;
  price: number;
}): void => {
  const database = initDb();
  database.prepare(`
    INSERT INTO order_items (order_id, product_id, quantity, price)
    VALUES (?, ?, ?, ?)
  `).run(orderItem.orderId, orderItem.productId, orderItem.quantity, orderItem.price);
};

export const getAllOrders = (): Order[] => {
  const database = initDb();
  const rows = database.prepare(`
    SELECT * FROM orders ORDER BY created_at DESC
  `).all();
  return rows.map(mapRowToOrder);
};

export const getOrderById = (id: number): Order | null => {
  const database = initDb();
  const row = database.prepare('SELECT * FROM orders WHERE id = ?').get(id);
  if (!row) return null;
  
  const order = mapRowToOrder(row);
  order.items = getOrderItems(id);
  return order;
};

export const getOrderItems = (orderId: number): OrderItem[] => {
  const database = initDb();
  const rows = database.prepare(`
    SELECT oi.*, p.name as product_name
    FROM order_items oi
    LEFT JOIN products p ON oi.product_id = p.id
    WHERE oi.order_id = ?
  `).all(orderId);
  
  return rows.map((row: any) => ({
    id: row.id,
    orderId: row.order_id,
    productId: row.product_id,
    productName: row.product_name,
    quantity: row.quantity,
    price: row.price
  }));
};

export const updateOrderStatus = (orderId: number, status: string): void => {
  const database = initDb();
  database.prepare(`
    UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
  `).run(status, orderId);
};

export const deleteOrder = (orderId: number): void => {
  const database = initDb();
  database.prepare('DELETE FROM order_items WHERE order_id = ?').run(orderId);
  database.prepare('DELETE FROM orders WHERE id = ?').run(orderId);
};

export const updateProduct = (productId: string, productData: Partial<Product>): void => {
  const database = initDb();
  const updates: string[] = [];
  const values: any[] = [];
  
  if (productData.name !== undefined) {
    updates.push('name = ?');
    values.push(productData.name);
  }
  if (productData.description !== undefined) {
    updates.push('description = ?');
    values.push(productData.description);
  }
  if (productData.price !== undefined) {
    updates.push('price = ?');
    values.push(productData.price);
  }
  if (productData.originalPrice !== undefined) {
    updates.push('original_price = ?');
    values.push(productData.originalPrice);
  }
  if (productData.image !== undefined) {
    updates.push('image = ?');
    values.push(productData.image);
  }
  if (productData.category !== undefined) {
    updates.push('category = ?');
    values.push(productData.category);
  }
  if (productData.weight !== undefined) {
    updates.push('weight = ?');
    values.push(productData.weight);
  }
  if (productData.isPopular !== undefined) {
    updates.push('is_popular = ?');
    values.push(productData.isPopular ? 1 : 0);
  }
  if (productData.isOnSale !== undefined) {
    updates.push('is_on_sale = ?');
    values.push(productData.isOnSale ? 1 : 0);
  }
  
  if (updates.length > 0) {
    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(productId);
    database.prepare(`UPDATE products SET ${updates.join(', ')} WHERE id = ?`).run(...values);
  }
};

export const deleteProduct = (productId: string): void => {
  const database = initDb();
  database.prepare('DELETE FROM products WHERE id = ?').run(productId);
};

const mapRowToOrder = (row: any): Order => ({
  id: row.id,
  orderNumber: row.order_number,
  userId: row.user_id,
  sessionId: row.session_id,
  totalAmount: row.total_amount,
  status: row.status,
  shippingAddress: row.shipping_address,
  billingAddress: row.billing_address,
  createdAt: row.created_at,
  updatedAt: row.updated_at
});

// Close database connection when process exits
process.on('exit', () => {
  if (db) {
    db.close();
  }
});

process.on('SIGINT', () => {
  if (db) {
    db.close();
  }
  process.exit(0);
});

export { initDb };
export default initDb;