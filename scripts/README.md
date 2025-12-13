# Product Import Script

A general-purpose script for importing Amazon product data from Excel files into different product categories.

## Usage

```bash
node scripts/import-products.js <category> <excel-file>
```

### Parameters

- **category**: The product category to import into
- **excel-file**: Path to the Excel file containing product data

### Valid Categories

- `cookware` - Pots, pans, and cooking vessels
- `bakeware` - Baking pans, sheets, and molds
- `kitchen-utensils` - Cooking tools and utensils
- `small-appliances` - Electric kitchen appliances
- `knives-cutlery` - Knives and cutting tools
- `kitchen-storage` - Food storage containers
- `kitchen-gadgets` - Kitchen gadgets and tools

## Examples

```bash
# Import cookware products
node scripts/import-products.js cookware cookware-data.xlsx

# Import bakeware products
node scripts/import-products.js bakeware bakeware.xlsx

# Import kitchen utensils
node scripts/import-products.js kitchen-utensils utensils.xlsx
```

## Features

- ✅ **Category validation** - Ensures valid category names
- ✅ **Data validation** - Validates required product fields
- ✅ **Smart descriptions** - Category-specific product descriptions
- ✅ **Price handling** - Detects sales and original prices
- ✅ **Popularity detection** - Marks popular products based on reviews/ratings
- ✅ **Database cleanup** - Removes existing products before import
- ✅ **Progress tracking** - Real-time import progress
- ✅ **Error handling** - Graceful error handling and reporting
- ✅ **Statistics** - Import summary with success/failure counts

## Expected Excel Format

The script expects Amazon product data with these key fields:

- `name` - Product name (required)
- `price_parsed` - Product price (required)
- `old_price_parsed` - Original price (for sales)
- `rating` - Product rating (1-5)
- `reviews` - Number of reviews
- `image_1` - Primary product image URL
- `details_*` - Various product detail fields

## Output

The script provides:
- Real-time progress updates
- Import statistics
- Error reporting
- Database connection status
- Category count updates

## Database

Products are stored in the SQLite database at `ramlis-home.db` with automatic category count updates.