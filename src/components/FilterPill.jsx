import React from 'react';
import './FilterPill.css';

const FilterPill = ({ 
  label, 
  isSelected = false, 
  onClick, 
  disabled = false 
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick(label);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <button 
      className={`filter-pill ${isSelected ? 'filter-pill--selected' : ''} ${disabled ? 'filter-pill--disabled' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      type="button"
      aria-pressed={isSelected}
    >
      <div className="filter-pill-text">{label}</div>
    </button>
  );
};

export default FilterPill; 