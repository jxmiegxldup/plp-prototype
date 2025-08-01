import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsDir = './public/products';
const outputDir = './public/products';

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function convertToWebP() {
  try {
    // Get all JPG files
    const files = fs.readdirSync(productsDir)
      .filter(file => file.toLowerCase().endsWith('.jpg'))
      .sort((a, b) => {
        // Sort by product number
        const numA = parseInt(a.match(/Product-(\d+)\.jpg/)?.[1] || '0');
        const numB = parseInt(b.match(/Product-(\d+)\.jpg/)?.[1] || '0');
        return numA - numB;
      });

    console.log(`Found ${files.length} JPG files to convert...`);

    for (const file of files) {
      const inputPath = path.join(productsDir, file);
      const outputPath = path.join(outputDir, file.replace('.jpg', '.webp'));
      
      console.log(`Converting ${file} to WebP...`);
      
      await sharp(inputPath)
        .resize(178, 223, { 
          fit: 'cover',
          position: 'center'
        })
        .webp({ 
          quality: 80,
          effort: 6
        })
        .toFile(outputPath);
      
      // Get file sizes for comparison
      const originalSize = fs.statSync(inputPath).size;
      const webpSize = fs.statSync(outputPath).size;
      const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
      
      console.log(`✅ ${file} → ${file.replace('.jpg', '.webp')}`);
      console.log(`   Original: ${(originalSize / 1024).toFixed(1)}KB`);
      console.log(`   WebP: ${(webpSize / 1024).toFixed(1)}KB`);
      console.log(`   Savings: ${savings}%\n`);
    }

    console.log('🎉 All images converted to WebP successfully!');
    console.log('\nNext steps:');
    console.log('1. Update products.json to use .webp files');
    console.log('2. Optionally remove original .jpg files');
    
  } catch (error) {
    console.error('❌ Error converting images:', error);
  }
}

convertToWebP(); 