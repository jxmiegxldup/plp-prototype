import React from 'react';
import FilterPill from './FilterPill';
import './PriceRangeFilter.css';

const PriceRangeFilter = ({ 
  selectedRanges = [], 
  onRangeChange,
  products = []
}) => {
  const priceRanges = [
    { value: '0-10', label: '£0 - £10', min: 0, max: 10 },
    { value: '10-20', label: '£10 - £20', min: 10, max: 20 },
    { value: '20-30', label: '£20 - £30', min: 20, max: 30 },
    { value: '30-40', label: '£30 - £40', min: 30, max: 40 },
    { value: '40-50', label: '£40 - £50', min: 40, max: 50 },
    { value: '50-100', label: '£50 - £100', min: 50, max: 100 },
    { value: '100-150', label: '£100 - £150', min: 100, max: 150 },
    { value: '150-200', label: '£150 - £200', min: 150, max: 200 },
    { value: '200-300', label: '£200 - £300', min: 200, max: 300 }
  ];

  // Filter out price ranges that don't have any matching products
  const availablePriceRanges = priceRanges.filter(range => {
    const hasMatchingProducts = products.some(product => 
      product.price >= range.min && product.price <= range.max
    );
    return hasMatchingProducts;
  });

  const handlePillClick = (rangeValue) => {
    console.log('Price pill clicked:', rangeValue);
    if (onRangeChange) {
      const newRanges = selectedRanges.includes(rangeValue)
        ? selectedRanges.filter(v => v !== rangeValue)
        : [...selectedRanges, rangeValue];
      console.log('New ranges:', newRanges);
      onRangeChange(newRanges);
    }
  };

  // Don't render anything if no price ranges are available
  if (availablePriceRanges.length === 0) {
    return null;
  }

  return (
    <div className="price-range-filter">
      <div className="price-range-pills">
        {availablePriceRanges.map((range) => (
          <FilterPill
            key={range.value}
            label={range.label}
            isSelected={selectedRanges.includes(range.value)}
            onClick={() => handlePillClick(range.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default PriceRangeFilter; 