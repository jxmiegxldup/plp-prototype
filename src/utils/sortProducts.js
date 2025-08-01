// Sort products based on different criteria
export function sortProducts(products, sortOption) {
  const sortedProducts = [...products]; // Create a copy to avoid mutating original

  switch (sortOption) {
    case 'recommended':
      // Default order, by product ID
      return sortedProducts.sort((a, b) => a.id - b.id);
    
    case 'on-sale':
      // Sort by sale items first, then by discount percentage
      return sortedProducts.sort((a, b) => {
        const aIsOnSale = a.wasPrice && a.wasPrice > a.price;
        const bIsOnSale = b.wasPrice && b.wasPrice > b.price;
        
        if (aIsOnSale && !bIsOnSale) return -1;
        if (!aIsOnSale && bIsOnSale) return 1;
        
        if (aIsOnSale && bIsOnSale) {
          // Sort by discount percentage (highest first)
          const aDiscount = ((a.wasPrice - a.price) / a.wasPrice) * 100;
          const bDiscount = ((b.wasPrice - b.price) / b.wasPrice) * 100;
          return bDiscount - aDiscount;
        }
        
        return 0;
      });
    
    case 'price-high-low':
      // Sort by price, highest first
      return sortedProducts.sort((a, b) => b.price - a.price);
    
    case 'price-low-high':
      // Sort by price, lowest first
      return sortedProducts.sort((a, b) => a.price - b.price);
    
    case 'rating-high-low':
      // Sort by rating, highest first, then by review count
      return sortedProducts.sort((a, b) => {
        if (b.rating !== a.rating) {
          return b.rating - a.rating;
        }
        return b.reviewCount - a.reviewCount;
      });
    
    default:
      // Default order, by product ID
      return sortedProducts.sort((a, b) => a.id - b.id);
  }
} 