import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the CSV file
const csvPath = path.join(__dirname, 'src', 'data', 'products-template.csv');
const jsonPath = path.join(__dirname, 'src', 'data', 'products.json');

try {
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const lines = csvContent.trim().split('\n');
  
  // Parse header
  const headers = lines[0].split(',').map(h => h.trim());
  
  // Parse data rows
  const products = lines.slice(1).map(line => {
    const product = {};
    
    // Simple CSV parsing that handles quoted values
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim()); // Add the last value
    
    headers.forEach((header, index) => {
      let value = values[index] || '';
      
      // Remove quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      
      // Convert data types
      switch (header) {
        case 'id':
        case 'price':
        case 'wasPrice':
        case 'rating':
        case 'reviewCount':
        case 'soldCount':
          product[header] = value === '' ? null : Number(value);
          break;
        case 'isPreOrder':
        case 'hasMultipleColors':
        case 'isGoingFast':
          product[header] = value === 'TRUE';
          break;
        case 'sizes':
          product[header] = value ? value.split(',').map(s => s.trim()) : [];
          break;
        case 'image':
          // Convert placeholder URLs to local WebP paths
          if (value.includes('placehold.co')) {
            product[header] = `/products/product-${product.id || 'placeholder'}.webp`;
          } else {
            product[header] = value;
          }
          break;
        case 'material':
          product[header] = value || null;
          break;
        default:
          product[header] = value || null;
      }
    });
    
    return product;
  });
  
  // Write to JSON file
  fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2));
  
  console.log(`✅ Successfully converted ${products.length} products from CSV to JSON`);
  console.log(`📁 Output saved to: ${jsonPath}`);
  
} catch (error) {
  console.error('❌ Error converting CSV to JSON:', error.message);
  process.exit(1);
} 