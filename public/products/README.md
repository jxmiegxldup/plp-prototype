# Product Images

This folder contains product images for the PLP prototype.

## Image Format

- **Current Format**: WebP (high-quality, retina optimized)
- **Original Format**: JPG (kept as backup)
- **Dimensions**: 356x446 pixels (2x for retina displays)
- **Display Size**: 178x223 pixels (CSS scales down for crisp display)
- **File naming**: `Product-1.webp`, `Product-2.webp`, etc.
- **File size**: ~7-29KB per image (optimized for quality)

## Performance Benefits

✅ **Retina Optimized**: 2x resolution for crisp display on high-DPI screens
✅ **High Quality**: 90% WebP quality for excellent visual fidelity
✅ **Smart Compression**: 25-47% smaller than original JPGs
✅ **Modern Format**: WebP with smart subsampling
✅ **Fast Loading**: Optimized for web performance

## Current Images

1. `Product-1.webp` - Blue Apron Smock Dress With Pockets
2. `Product-2.webp` - Floral Summer Dress  
3. `Product-3.webp` - Classic Black Blazer
4. `Product-4.webp` - Striped Cotton T-Shirt
5. `Product-5.webp` - Denim High-Waist Jeans
6. `Product-6.webp` - Silk Evening Gown
7. `Product-7.webp` - Casual Hoodie
8. `Product-8.webp` - Formal White Shirt
9. `Product-9.webp` - Pleated Midi Skirt
10. `Product-10.webp` - Leather Crossbody Bag
11. `Product-11.webp` - Knit Sweater
12. `Product-12.webp` - A-Line Wedding Dress

## File Size Comparison (High Quality)

| Image | Original JPG | WebP (2x) | Savings | Quality |
|-------|-------------|-----------|---------|---------|
| Product-1 | 21.8KB | 15.2KB | 30.5% | High |
| Product-2 | 9.7KB | 6.8KB | 29.7% | High |
| Product-3 | 17.1KB | 12.6KB | 26.3% | High |
| Product-4 | 31.8KB | 24.2KB | 23.9% | High |
| Product-5 | 39.1KB | 29.2KB | 25.5% | High |
| Product-6 | 20.2KB | 11.3KB | 43.7% | High |
| Product-7 | 20.9KB | 12.2KB | 41.4% | High |
| Product-8 | 18.7KB | 10.0KB | 46.8% | High |
| Product-9 | 10.9KB | 8.9KB | 18.8% | High |
| Product-10 | 14.3KB | 10.7KB | 24.9% | High |
| Product-11 | 10.2KB | 7.9KB | 22.0% | High |
| Product-12 | 23.6KB | 14.0KB | 40.9% | High |

**Total**: ~250KB → ~160KB (**32% reduction** while maintaining high quality)

## Retina Display Optimization

### **Technical Details:**
- **Resolution**: 356x446px (2x the display size)
- **Quality**: 90% WebP (excellent visual fidelity)
- **Resampling**: Lanczos3 (high-quality scaling)
- **Subsampling**: Smart subsampling enabled
- **CSS**: Optimized rendering properties

### **Device Support:**
- **iPhone (2x)**: Perfect crisp display
- **iPhone Pro (3x)**: Excellent quality
- **iPad**: Sharp images
- **Desktop**: High-quality display
- **Android**: Optimized for various DPI

## Browser Support

WebP is supported by:
- Chrome 23+ (2013)
- Firefox 65+ (2019)
- Safari 14+ (2020)
- Edge 18+ (2018)

For older browsers, the app includes fallback handling.

## Conversion Process

Images were converted using:
- **Tool**: Sharp (Node.js image processing)
- **Quality**: 90% (high quality for retina displays)
- **Resize**: 356x446px with Lanczos3 resampling
- **Format**: WebP with smart subsampling
- **Optimization**: Retina display focused

## Fallback

If WebP images fail to load, the app will show placeholder images automatically. 