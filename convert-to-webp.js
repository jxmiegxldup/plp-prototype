import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsDir = './public/products';
const outputDir = './public/products';
const productsJsonPath = './src/data/products.json';

// Image sizes for different pixel densities
const imageSizes = {
  standard: { width: 178, height: 223 }, // 1x - standard resolution
  retina: { width: 356, height: 446 },   // 2x - retina displays
  ultra: { width: 534, height: 669 }     // 3x - ultra high DPI displays
};

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
        const numA = parseInt(a.match(/product-(\d+)\.jpg/)?.[1] || '0');
        const numB = parseInt(b.match(/product-(\d+)\.jpg/)?.[1] || '0');
        return numA - numB;
      });

    console.log(`Found ${files.length} JPG files to convert...`);

    // Track converted files for JSON update
    const convertedFiles = [];

    for (const file of files) {
      const inputPath = path.join(productsDir, file);
      const baseName = file.replace('.jpg', '');
      
      console.log(`Converting ${file} to WebP (multiple resolutions)...`);
      
      const webpFiles = {};
      let totalOriginalSize = 0;
      let totalWebpSize = 0;

      // Generate multiple resolutions
      for (const [density, size] of Object.entries(imageSizes)) {
        const outputFileName = density === 'standard' 
          ? `${baseName}.webp` 
          : `${baseName}-${density}.webp`;
        const outputPath = path.join(outputDir, outputFileName);
        
        await sharp(inputPath)
          .resize(size.width, size.height, { 
            fit: 'cover',
            position: 'center'
          })
          .webp({ 
            quality: 85, // Slightly higher quality for better compression
            effort: 6,
            nearLossless: true // Better quality for high-res images
          })
          .toFile(outputPath);
        
        // Get file sizes for comparison
        const originalSize = fs.statSync(inputPath).size;
        const webpSize = fs.statSync(outputPath).size;
        
        totalOriginalSize += originalSize;
        totalWebpSize += webpSize;
        
        webpFiles[density] = {
          file: outputFileName,
          size: webpSize,
          dimensions: size
        };
        
        console.log(`   ${density}: ${outputFileName} (${size.width}x${size.height})`);
      }
      
      const savings = ((totalOriginalSize - totalWebpSize) / totalOriginalSize * 100).toFixed(1);
      
      console.log(`✅ ${file} → 3 WebP variants created`);
      console.log(`   Original: ${(totalOriginalSize / 1024).toFixed(1)}KB`);
      console.log(`   WebP Total: ${(totalWebpSize / 1024).toFixed(1)}KB`);
      console.log(`   Savings: ${savings}%\n`);

      // Track for JSON update
      convertedFiles.push({
        original: file,
        webp: webpFiles,
        productNumber: parseInt(file.match(/product-(\d+)\.jpg/)?.[1] || '0')
      });
    }

    // Update products.json with new WebP image paths and responsive image data
    if (fs.existsSync(productsJsonPath)) {
      console.log('📝 Updating products.json with responsive WebP image paths...');
      
      const productsData = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));
      let updatedCount = 0;

      productsData.forEach(product => {
        // Check if this product has corresponding WebP files
        const webpFile = convertedFiles.find(file => file.productNumber === product.id);
        if (webpFile) {
          const oldImagePath = product.image;
          
          // Create responsive image object
          const responsiveImage = {
            standard: `/products/${webpFile.webp.standard.file}`,
            retina: `/products/${webpFile.webp.retina.file}`,
            ultra: `/products/${webpFile.webp.ultra.file}`,
            // Keep the standard as the default for backward compatibility
            default: `/products/${webpFile.webp.standard.file}`
          };
          
          // Update the product with responsive image data
          product.image = responsiveImage.default; // Keep backward compatibility
          product.responsiveImage = responsiveImage; // Add new responsive image data
          
          updatedCount++;
          console.log(`   Product ${product.id}: Added responsive images`);
        }
      });

      // Write updated JSON back to file
      fs.writeFileSync(productsJsonPath, JSON.stringify(productsData, null, 2));
      console.log(`✅ Updated ${updatedCount} products with responsive image data`);
    } else {
      console.log('⚠️  products.json not found, skipping JSON update');
    }

    console.log('\n🎉 All images converted to high-resolution WebP successfully!');
    console.log('\nGenerated image sizes:');
    console.log(`   Standard (1x): ${imageSizes.standard.width}x${imageSizes.standard.height}`);
    console.log(`   Retina (2x): ${imageSizes.retina.width}x${imageSizes.retina.height}`);
    console.log(`   Ultra (3x): ${imageSizes.ultra.width}x${imageSizes.ultra.height}`);
    console.log('\nNext steps:');
    console.log('1. ✅ products.json has been updated with responsive image data');
    console.log('2. Update ProductTile component to use responsive images');
    console.log('3. Optionally remove original .jpg files');
    
  } catch (error) {
    console.error('❌ Error converting images:', error);
  }
}

convertToWebP(); 