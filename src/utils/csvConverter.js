import { csvToJson, jsonToCsv, csvTemplate } from './csvToJson.js';

/**
 * Development tool for CSV to JSON conversion
 * 
 * Usage:
 * 1. Copy your CSV data
 * 2. Call convertCsvToJson(csvString)
 * 3. Copy the output to products.json
 */

export function convertCsvToJson(csvString) {
  try {
    const products = csvToJson(csvString);
    console.log('✅ CSV converted successfully!');
    console.log('📊 Products found:', products.length);
    console.log('📋 JSON output:');
    console.log(JSON.stringify(products, null, 2));
    return products;
  } catch (error) {
    console.error('❌ Error converting CSV:', error);
    return null;
  }
}

/**
 * Convert current JSON back to CSV for editing
 */
export function convertJsonToCsv(products) {
  try {
    const csv = jsonToCsv(products);
    console.log('✅ JSON converted to CSV!');
    console.log('📋 CSV output:');
    console.log(csv);
    return csv;
  } catch (error) {
    console.error('❌ Error converting JSON:', error);
    return null;
  }
}

/**
 * Get CSV template for reference
 */
export function getCsvTemplate() {
  console.log('📋 CSV Template:');
  console.log(csvTemplate);
  return csvTemplate;
}

/**
 * Validate product data structure
 */
export function validateProductData(products) {
  const requiredFields = [
    'id', 'title', 'price', 'image', 'rating', 
    'reviewCount', 'isPreOrder', 'hasMultipleColors', 
    'isGoingFast', 'soldCount'
  ];
  
  const errors = [];
  
  products.forEach((product, index) => {
    requiredFields.forEach(field => {
      if (!(field in product)) {
        errors.push(`Product ${index + 1}: Missing field "${field}"`);
      }
    });
    
    // Type validation
    if (typeof product.price !== 'number') {
      errors.push(`Product ${index + 1}: Price must be a number`);
    }
    if (typeof product.rating !== 'number' || product.rating < 1 || product.rating > 5) {
      errors.push(`Product ${index + 1}: Rating must be a number between 1-5`);
    }
  });
  
  if (errors.length > 0) {
    console.error('❌ Validation errors:', errors);
    return false;
  }
  
  console.log('✅ All products validated successfully!');
  return true;
}

// Example usage in browser console:
// 
// 1. Import the functions:
// import { convertCsvToJson, getCsvTemplate, validateProductData } from './utils/csvConverter.js';
//
// 2. Get template:
// getCsvTemplate();
//
// 3. Convert CSV:
// const csvData = `id,title,price,image,rating,reviewCount,isPreOrder,hasMultipleColors,isGoingFast,soldCount
// 1,"New Product",50,"https://example.com/image.jpg",4,100,false,true,false,0`;
// convertCsvToJson(csvData);
//
// 4. Validate existing data:
// import products from './data/products.json';
// validateProductData(products); 