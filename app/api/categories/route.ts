import { NextRequest, NextResponse } from 'next/server';
import { getAllCategories, getCategoryById, initializeDatabase } from '@/lib/database';

// Initialize database on first load
initializeDatabase();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('id');

    if (categoryId) {
      // Get specific category
      const category = getCategoryById(categoryId);
      if (!category) {
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(category);
    } else {
      // Get all categories
      const categories = getAllCategories();
      return NextResponse.json(categories);
    }
  } catch (error) {
    console.error('Categories API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}