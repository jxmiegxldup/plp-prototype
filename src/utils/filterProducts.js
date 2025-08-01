// Filter products based on multiple criteria
export function filterProducts(products, filters) {
  return products.filter(product => {
    // Price filter
    if (filters.price && filters.price.length > 0) {
      const priceInRange = filters.price.some(rangeValue => {
        const [min, max] = rangeValue.split('-').map(Number);
        return product.price >= min && product.price <= max;
      });
      if (!priceInRange) {
        return false;
      }
    }

    // Brand filter
    if (filters.brand && filters.brand.length > 0) {
      if (!filters.brand.includes(product.brand)) {
        return false;
      }
    }

    // Color filter
    if (filters.color && filters.color.length > 0) {
      if (!filters.color.includes(product.color)) {
        return false;
      }
    }

    // Size filter
    if (filters.size && filters.size.length > 0) {
      const hasMatchingSize = product.sizes?.some(size => 
        filters.size.includes(size)
      );
      if (!hasMatchingSize) {
        return false;
      }
    }

    // Material filter
    if (filters.material && filters.material.length > 0) {
      if (!filters.material.includes(product.material)) {
        return false;
      }
    }

    // Rating filter
    if (filters.rating && filters.rating.length > 0) {
      const minRating = Math.min(...filters.rating);
      if (product.rating < minRating) {
        return false;
      }
    }

    return true;
  });
}

// Get filter summary for display
export function getFilterSummary(filters) {
  const summary = [];

  if (filters.price && filters.price.length > 0) {
    summary.push(`${filters.price.length} price range${filters.price.length > 1 ? 's' : ''}`);
  }

  if (filters.brand && filters.brand.length > 0) {
    summary.push(`${filters.brand.length} brand${filters.brand.length > 1 ? 's' : ''}`);
  }

  if (filters.color && filters.color.length > 0) {
    summary.push(`${filters.color.length} color${filters.color.length > 1 ? 's' : ''}`);
  }

  if (filters.size && filters.size.length > 0) {
    summary.push(`${filters.size.length} size${filters.size.length > 1 ? 's' : ''}`);
  }

  if (filters.material && filters.material.length > 0) {
    summary.push(`${filters.material.length} material${filters.material.length > 1 ? 's' : ''}`);
  }

  if (filters.rating && filters.rating.length > 0) {
    const minRating = Math.min(...filters.rating);
    summary.push(`${minRating}+ stars`);
  }

  return summary;
} 