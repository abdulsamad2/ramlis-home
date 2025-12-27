'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { Search, SlidersHorizontal, Grid3X3, List, Star, TrendingUp, Tag, X, ChevronDown, Filter, Package } from 'lucide-react';
import { Product, Category } from '@/lib/types';
import { cn } from '@/lib/utils';

function ProductsPageContent() {
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  
  const selectedCategory = urlSearchParams.get('category');
  const selectedFilter = urlSearchParams.get('filter');
  const initialSearch = urlSearchParams.get('search') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // Sync search query from URL
  useEffect(() => {
    const search = urlSearchParams.get('search');
    if (search !== null) {
      setSearchQuery(search);
    }
  }, [urlSearchParams]);

  // Fetch data
  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCategoryDropdown) {
        setShowCategoryDropdown(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showCategoryDropdown) {
        setShowCategoryDropdown(false);
      }
    };

    if (showCategoryDropdown) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('click', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [showCategoryDropdown]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories')
        ]);
        
        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();
        
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    
    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Apply special filters
    if (selectedFilter === 'sale') {
      filtered = filtered.filter(product => product.isOnSale);
    } else if (selectedFilter === 'popular') {
      filtered = filtered.filter(product => product.isPopular);
    }
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Apply price range
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'newest':
          return b.id.localeCompare(a.id);
        default:
          return a.name.localeCompare(b.name);
      }
    });
    
    return filtered;
  }, [products, selectedCategory, selectedFilter, searchQuery, priceRange, sortBy]);

  const handleCategoryChange = (categoryId: string | null) => {
    const params = new URLSearchParams(urlSearchParams);
    if (categoryId) {
      params.set('category', categoryId);
    } else {
      params.delete('category');
    }
    router.push(`/products?${params.toString()}`);
  };

  const handleFilterChange = (filter: string | null) => {
    const params = new URLSearchParams(urlSearchParams);
    if (filter) {
      params.set('filter', filter);
    } else {
      params.delete('filter');
    }
    params.delete('category'); // Clear category when applying special filters
    router.push(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push('/products');
    setSearchQuery('');
    setPriceRange([0, 1000]);
  };

  const getPageTitle = () => {
    if (selectedFilter === 'sale') return 'Hot Deals & Sale Items';
    if (selectedFilter === 'popular') return 'Popular Products';
    if (selectedCategory) {
      const category = categories.find(c => c.id === selectedCategory);
      return `${category?.name || selectedCategory} Collection`;
    }
    return 'All Products';
  };

  // Update page title dynamically
  useEffect(() => {
    let title = 'All Products';
    if (selectedFilter === 'sale') {
      title = 'Hot Deals & Sale Items';
    } else if (selectedFilter === 'popular') {
      title = 'Popular Products';
    } else if (selectedCategory) {
      const category = categories.find(c => c.id === selectedCategory);
      title = `${category?.name || selectedCategory} Collection`;
    }
    document.title = `${title} | Ramlis Home - Premium Kitchen Products`;
  }, [selectedFilter, selectedCategory, categories]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {getPageTitle()}
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all w-64"
                />
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>

              {/* View Mode */}
              <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              {/* Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <SlidersHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Compact Filter Bar */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {/* All Products */}
            <button
              onClick={() => handleFilterChange(null)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                !selectedFilter && !selectedCategory
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              All
            </button>
            
            {/* Special Filters */}
            <button
              onClick={() => handleFilterChange('sale')}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1",
                selectedFilter === 'sale'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              <Tag className="h-3 w-3" />
              Sale
            </button>
            
            <button
              onClick={() => handleFilterChange('popular')}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1",
                selectedFilter === 'popular'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              <TrendingUp className="h-3 w-3" />
              Popular
            </button>

            {/* Separator */}
            <div className="hidden sm:block w-px h-6 bg-gray-300" />

            {/* Category Selector */}
            <div className="relative">
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setShowCategoryDropdown(!showCategoryDropdown);
                  }
                }}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all border",
                  selectedCategory
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
                )}
              >
                <Package className="h-3 w-3" />
                <span className="max-w-24 truncate">
                  {selectedCategory 
                    ? categories.find(c => c.id === selectedCategory)?.name || 'Category'
                    : 'Category'
                  }
                </span>
                <ChevronDown className={cn(
                  "h-3 w-3 transition-transform",
                  showCategoryDropdown ? 'rotate-180' : ''
                )} />
              </button>
              
              {showCategoryDropdown && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="py-1 max-h-64 overflow-y-auto">
                    <button
                      onClick={() => {
                        handleCategoryChange(null);
                        setShowCategoryDropdown(false);
                      }}
                      className={cn(
                        "w-full px-3 py-2 text-left text-xs hover:bg-gray-50 flex items-center justify-between",
                        !selectedCategory ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                      )}
                    >
                      <span>All Categories</span>
                      <span className="text-xs text-gray-400">
                        {categories.reduce((sum, cat) => sum + cat.productCount, 0)}
                      </span>
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          handleCategoryChange(category.id);
                          setShowCategoryDropdown(false);
                        }}
                        className={cn(
                          "w-full px-3 py-2 text-left text-xs hover:bg-gray-50 flex items-center justify-between",
                          selectedCategory === category.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                        )}
                      >
                        <span className="truncate">{category.name}</span>
                        <span className="text-xs text-gray-400 ml-2 flex-shrink-0">{category.productCount}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Category Pills (Desktop) */}
            <div className="hidden lg:flex flex-wrap gap-2 max-w-md">
              {categories.slice(0, 4).map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium transition-all",
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  {category.name.split(' ')[0]}
                  <span className="ml-1 opacity-75">{category.productCount}</span>
                </button>
              ))}
            </div>

            {/* Active Filters & Clear */}
            <div className="flex items-center gap-2 ml-auto">
              {(selectedCategory || selectedFilter) && (
                <span className="text-xs text-gray-500">
                  {filteredProducts.length} results
                </span>
              )}
              {(selectedCategory || selectedFilter || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 px-2 py-1 rounded-full text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <X className="h-3 w-3" />
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Filters Sidebar */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
          <div className="absolute inset-0 bg-black bg-opacity-50 lg:hidden" onClick={() => setShowFilters(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl lg:hidden p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button onClick={() => setShowFilters(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} viewMode={viewMode} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    }>
      <ProductsPageContent />
    </Suspense>
  );
}