/**
 * CSV to JSON Converter for Product Data
 * 
 * Expected CSV format:
 * id,title,price,image,rating,reviewCount,isPreOrder,hasMultipleColors,isGoingFast,soldCount
 * 1,"Blue Apron Smock Dress With Pockets",38,"https://placehold.co/178x223",4,999,true,true,true,999
 */

export function csvToJson(csvString) {
  const lines = csvString.trim().split('\n');
  const headers = lines[0].split(',').map(header => header.trim().replace(/"/g, ''));
  
  const products = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const product = {};
    
    headers.forEach((header, index) => {
      let value = values[index] || '';
      
      // Convert string values to appropriate types
      switch (header) {
        case 'price':
        case 'wasPrice':
        case 'rating':
        case 'reviewCount':
        case 'soldCount':
          value = value === '' ? null : parseFloat(value) || 0;
          break;
        case 'isPreOrder':
        case 'hasMultipleColors':
        case 'isGoingFast':
          value = value.toLowerCase() === 'true';
          break;
        default:
          value = value.replace(/"/g, ''); // Remove quotes from strings
      }
      
      product[header] = value;
    });
    
    products.push(product);
  }
  
  return products;
}

/**
 * Parse CSV line, handling quoted values with commas
 */
function parseCSVLine(line) {
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
  
  values.push(current.trim());
  return values;
}

/**
 * Convert JSON back to CSV (for editing)
 */
export function jsonToCsv(products) {
  if (!products.length) return '';
  
  const headers = Object.keys(products[0]);
  const csvLines = [headers.join(',')];
  
  products.forEach(product => {
    const values = headers.map(header => {
      let value = product[header];
      
      // Handle special cases
      if (typeof value === 'string' && value.includes(',')) {
        value = `"${value}"`;
      }
      
      return value;
    });
    
    csvLines.push(values.join(','));
  });
  
  return csvLines.join('\n');
}

/**
 * Example CSV template
 */
export const csvTemplate = `id,title,price,image,rating,reviewCount,isPreOrder,hasMultipleColors,isGoingFast,soldCount
1,"Blue Apron Smock Dress With Pockets",38,"https://placehold.co/178x223",4,999,true,true,true,999
2,"Floral Summer Dress",45,"https://placehold.co/178x223",5,1200,false,true,false,0
3,"Classic Black Blazer",89,"https://placehold.co/178x223",4,567,false,false,true,250
4,"Striped Cotton T-Shirt",25,"https://placehold.co/178x223",3,234,false,true,false,0
5,"Denim High-Waist Jeans",65,"https://placehold.co/178x223",4,789,false,true,true,450
6,"Silk Evening Gown",120,"https://placehold.co/178x223",5,156,true,false,false,0
7,"Casual Hoodie",35,"https://placehold.co/178x223",4,432,false,true,false,0
8,"Formal White Shirt",55,"https://placehold.co/178x223",4,678,false,false,true,300
9,"Pleated Midi Skirt",42,"https://placehold.co/178x223",3,345,false,true,false,0
10,"Leather Crossbody Bag",75,"https://placehold.co/178x223",5,890,false,false,true,600
11,"Knit Sweater",48,"https://placehold.co/178x223",4,567,false,true,false,0
12,"A-Line Wedding Dress",280,"https://placehold.co/178x223",5,234,true,false,false,0`; 