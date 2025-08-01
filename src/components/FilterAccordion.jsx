import React, { useState } from 'react';
import './FilterAccordion.css';

const FilterAccordion = ({ title, children, isOpen = true, onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(isOpen);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    if (onToggle) onToggle(!isExpanded);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  return (
    <div className="filter-accordion">
      <button
        className="filter-accordion-header"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isExpanded}
        aria-controls={`accordion-content-${title.toLowerCase().replace(/\s+/g, '-')}`}
        type="button"
      >
        <div className="filter-accordion-title">{title}</div>
        <div className="filter-accordion-icon">
          {isExpanded ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.913 11C19.5134 11 20 11.4477 20 12C20 12.5128 19.5804 12.9355 19.0398 12.9933L18.913 13H5.08696C4.48665 13 4 12.5523 4 12C4 11.4872 4.41961 11.0645 4.96019 11.0067L5.08696 11H18.913Z" fill="var(--Base-Colours-Black, #131313)"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z" fill="var(--Base-Colours-Black, #131313)"/>
            </svg>
          )}
        </div>
      </button>
      {isExpanded && (
        <div 
          className="filter-accordion-content"
          id={`accordion-content-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default FilterAccordion; 