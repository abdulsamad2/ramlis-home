import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts, insertProduct, updateProduct, deleteProduct, getAllCategories } from '@/lib/database';
import { Product } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const products = getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json();

    if (!productData.name || !productData.price || !productData.category) {
      return NextResponse.json(
        { error: 'Name, price, and category are required' },
        { status: 400 }
      );
    }

    const newProduct: Product = {
      id: `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: productData.name,
      description: productData.description || '',
      price: parseFloat(productData.price),
      originalPrice: productData.originalPrice ? parseFloat(productData.originalPrice) : undefined,
      image: productData.image || '/placeholder-product.jpg',
      category: productData.category,
      weight: productData.weight,
      isPopular: productData.isPopular || false,
      isOnSale: productData.isOnSale || false,
      rating: productData.rating || 0,
      reviews: productData.reviews || 0,
    };

    insertProduct(newProduct);
    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...productData } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    if (productData.price) {
      productData.price = parseFloat(productData.price);
    }
    if (productData.originalPrice) {
      productData.originalPrice = parseFloat(productData.originalPrice);
    }

    updateProduct(id, productData);
    return NextResponse.json({ success: true, message: 'Product updated' });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('id');

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    deleteProduct(productId);
    return NextResponse.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
