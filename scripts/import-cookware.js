const XLSX = require('xlsx');
const path = require('path');

// Read and parse the Excel file
function readExcelFile() {
  try {
    const filePath = path.join(process.cwd(), 'Outscraper-20251213170553xs04.xlsx');
    console.log('Reading Excel file:', filePath);
    
    // Read the workbook
    const workbook = XLSX.readFile(filePath);
    
    // Get the first worksheet name
    const sheetName = workbook.SheetNames[0];
    console.log('Sheet name:', sheetName);
    
    // Get the worksheet
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
    console.log('Total rows found:', jsonData.length);
    console.log('\nFirst few rows:');
    console.log(JSON.stringify(jsonData.slice(0, 3), null, 2));
    
    console.log('\nColumn headers available:');
    if (jsonData.length > 0) {
      console.log(Object.keys(jsonData[0]));
    }
    
    return jsonData;
    
  } catch (error) {
    console.error('Error reading Excel file:', error);
    return null;
  }
}

// Preview the data structure
function previewData() {
  const data = readExcelFile();
  
  if (data && data.length > 0) {
    console.log('\n=== DATA PREVIEW ===');
    console.log('Total products:', data.length);
    console.log('\nSample product fields:');
    
    const sampleProduct = data[0];
    Object.keys(sampleProduct).forEach(key => {
      console.log(`${key}: ${sampleProduct[key]}`);
    });
    
    console.log('\n=== FIELD MAPPING SUGGESTIONS ===');
    const keys = Object.keys(sampleProduct).map(k => k.toLowerCase());
    
    if (keys.some(k => k.includes('name') || k.includes('title'))) {
      console.log('✅ Product name field found');
    }
    if (keys.some(k => k.includes('price') || k.includes('cost'))) {
      console.log('✅ Price field found');
    }
    if (keys.some(k => k.includes('description') || k.includes('desc'))) {
      console.log('✅ Description field found');
    }
    if (keys.some(k => k.includes('image') || k.includes('photo') || k.includes('picture'))) {
      console.log('✅ Image field found');
    }
    if (keys.some(k => k.includes('rating') || k.includes('score'))) {
      console.log('✅ Rating field found');
    }
  }
}

// Run the preview
previewData();