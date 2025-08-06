import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsDir = path.join(__dirname, 'public', 'products');
const csvPath = path.join(__dirname, 'src', 'data', 'products-template.csv');
const jsonPath = path.join(__dirname, 'src', 'data', 'products.json');

// Image sizes for different pixel densities
const imageSizes = {
  standard: { width: 178, height: 223 }, // 1x
  retina: { width: 356, height: 446 },   // 2x
  ultra: { width: 534, height: 669 }     // 3x
};

// 1. Convert all JPG images to WebP (standard, retina, ultra)
async function convertImages() {
  const files = fs.readdirSync(productsDir)
    .filter(file => file.toLowerCase().endsWith('.jpg'));
  const converted = {};

  for (const file of files) {
    const inputPath = path.join(productsDir, file);
    const baseName = file.replace('.jpg', '');
    const productNumber = parseInt(file.match(/product-(\d+)/i)?.[1] || '0');
    converted[productNumber] = {};
    for (const [density, size] of Object.entries(imageSizes)) {
      const outputFileName = density === 'standard'
        ? `${baseName}.webp`
        : `${baseName}-${density}.webp`;
      const outputPath = path.join(productsDir, outputFileName);
      await sharp(inputPath)
        .resize(size.width, size.height, {
          fit: 'cover',
          position: 'center',
        })
        .webp({
          quality: 85,
          effort: 6,
          nearLossless: true
        })
        .toFile(outputPath);
      converted[productNumber][density] = `/products/${outputFileName}`;
    }
    // For backward compatibility
    converted[productNumber].default = converted[productNumber].standard;
  }
  return converted;
}

// 2. Parse CSV and build product objects
function parseCSV(csvPath) {
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  return lines.slice(1).map(line => {
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
    values.push(current.trim());
    headers.forEach((header, index) => {
      let value = values[index] || '';
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
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
          // We'll update this below
          product[header] = value;
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
}

// 3. Combine data and write JSON
async function main() {
  console.log('Converting images...');
  const imageMap = await convertImages();
  console.log('Parsing CSV...');
  const products = parseCSV(csvPath);
  // Attach responsive image data
  products.forEach(product => {
    const id = product.id;
    if (imageMap[id]) {
      product.responsiveImage = imageMap[id];
      product.image = imageMap[id].default;
    } else {
      // fallback: keep whatever is in CSV
    }
  });
  fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2));
  console.log(`✅ Successfully updated ${products.length} products in products.json with responsive images.`);
}

main().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});