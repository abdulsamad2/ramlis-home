import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllProducts, 
  getProductById, 
  getProductsByCategory,
  getPopularProducts,
  getOnSaleProducts,
  searchProducts,
  getDeals,
  initializeDatabase 
} from '@/lib/database';

// Initialize database on first load
initializeDatabase();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('id');
    const category = searchParams.get('category');
    const popular = searchParams.get('popular');
    const onSale = searchParams.get('onSale');
    const deals = searchParams.get('deals');
    const search = searchParams.get('search');

    if (productId) {
      // Get specific product
      const product = getProductById(productId);
      if (!product) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(product);
    } else if (category) {
      // Get products by category
      const products = getProductsByCategory(category);
      return NextResponse.json(products);
    } else if (popular === 'true') {
      // Get popular products
      const products = getPopularProducts();
      return NextResponse.json(products);
    } else if (onSale === 'true') {
      // Get on sale products
      const products = getOnSaleProducts();
      return NextResponse.json(products);
    } else if (deals === 'true') {
      // Get deals (products with original price > current price)
      const products = getDeals();
      return NextResponse.json(products);
    } else if (search) {
      // Search products
      const products = searchProducts(search);
      return NextResponse.json(products);
    } else {
      // Get all products
      const products = getAllProducts();
      return NextResponse.json(products);
    }
  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}