import { Category, Product } from './types';

const API_BASE_URL = '/api';

// Categories API functions
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      cache: 'no-store' // Ensure fresh data
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchCategoryById = async (id: string): Promise<Category | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories?id=${id}`, {
      cache: 'no-store'
    });
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch category: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error;
  }
};

// Products API functions
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      cache: 'no-store'
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products?id=${id}`, {
      cache: 'no-store'
    });
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const fetchProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products?category=${categoryId}`, {
      cache: 'no-store'
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch products by category: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

export const fetchPopularProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products?popular=true`, {
      cache: 'no-store'
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch popular products: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching popular products:', error);
    throw error;
  }
};

export const fetchOnSaleProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products?onSale=true`, {
      cache: 'no-store'
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch on sale products: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching on sale products:', error);
    throw error;
  }
};

export const fetchDeals = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products?deals=true`, {
      cache: 'no-store'
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch deals: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching deals:', error);
    throw error;
  }
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(query)}`, {
      cache: 'no-store'
    });
    if (!response.ok) {
      throw new Error(`Failed to search products: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

// Utility functions for backward compatibility
export const getProductsByCategory = fetchProductsByCategory;
export const getPopularProducts = fetchPopularProducts;
export const getOnSaleProducts = fetchOnSaleProducts;
export const getProductById = fetchProductById;
export const getCategoryById = fetchCategoryById;
export const getDeals = fetchDeals;