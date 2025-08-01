import React from 'react';
import Cell from './Cell';
import './RadioGroup.css';

function RadioGroup({ 
  options, 
  selectedValue, 
  onValueChange, 
  name = 'radio-group'
}) {
  return (
    <div className="radio-group" role="radiogroup" aria-label={name}>
      {options.map((option) => (
        <Cell
          key={option.id}
          label={option.label}
          isSelected={selectedValue === option.id}
          onClick={() => onValueChange(option.id)}
          aria-checked={selectedValue === option.id}
          role="radio"
        />
      ))}
    </div>
  );
}

export default RadioGroup; 