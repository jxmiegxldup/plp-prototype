import React, { useState } from 'react';
import FilterPill from './FilterPill';
import './FilterGroup.css';

const FilterGroup = ({ 
  options = [], 
  selectedValues = [], 
  onSelectionChange, 
  itemsPerRow = 4,
  showAllButton = true,
  products = [],
  filterField = null
}) => {
  const [showAll, setShowAll] = useState(false);
  
  // Filter out options that don't have any matching products
  const availableOptions = filterField && products.length > 0 
    ? options.filter(option => {
        const hasMatchingProducts = products.some(product => {
          if (filterField === 'sizes') {
            return product.sizes?.includes(option.value);
          } else if (filterField === 'rating') {
            return product.rating >= option.value;
          } else {
            return product[filterField] === option.value;
          }
        });
        return hasMatchingProducts;
      })
    : options;
  
  // Show all options or limit to first few rows
  const itemsToShow = showAll ? availableOptions : availableOptions.slice(0, itemsPerRow * 2);

  const handlePillClick = (value) => {
    if (onSelectionChange) {
      const newSelection = selectedValues.includes(value)
        ? selectedValues.filter(v => v !== value)
        : [...selectedValues, value];
      onSelectionChange(newSelection);
    }
  };

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  // Don't render anything if no options are available
  if (availableOptions.length === 0) {
    return null;
  }

  return (
    <div className="filter-group">
      <div className="filter-group-row">
        {itemsToShow.map((option) => (
          <FilterPill
            key={option.value}
            label={option.label}
            isSelected={selectedValues.includes(option.value)}
            onClick={handlePillClick}
            disabled={option.disabled}
          />
        ))}
      </div>
      
      {showAllButton && availableOptions.length > itemsPerRow * 2 && (
        <div className="filter-group-button-container">
          <button 
            className="filter-group-show-all-button"
            onClick={handleShowAll}
          >
            <div className="filter-group-show-all-text">
              {showAll ? 'Show less' : 'Show all'}
            </div>
            <div className="filter-group-show-all-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M2.99975 11H18.5858L15.2927 7.70701C14.9018 7.31601 14.9018 6.68401 15.2927 6.29301C15.6837 5.90201 16.3158 5.90201 16.7067 6.29301L21.7068 11.293C22.0978 11.684 22.0978 12.316 21.7068 12.707L16.7067 17.707C16.5117 17.902 16.2558 18 15.9998 18C15.7438 18 15.4878 17.902 15.2927 17.707C14.9018 17.316 14.9018 16.684 15.2927 16.293L18.5858 13H2.99975C2.44775 13 1.99975 12.552 1.99975 12C1.99975 11.448 2.44775 11 2.99975 11Z" 
                  fill="var(--Comms-Palette-Default-Info, #0066CC)"
                  style={{ transform: showAll ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}
                />
              </svg>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterGroup; 