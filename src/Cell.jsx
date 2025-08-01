import React from 'react';
import './Cell.css';

function Cell({ 
  label, 
  isSelected = false, 
  onClick, 
  showTrailingIcon = true,
  showLeadingIcon = false,
  leadingIcon,
  trailingIcon = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_2352_244010" style={{maskType: 'luminance'}} maskUnits="userSpaceOnUse" x="2" y="2" width="20" height="20">
        <path fillRule="evenodd" clipRule="evenodd" d="M2 2H22V21.999H2V2Z" fill="white"/>
      </mask>
      <g mask="url(#mask0_2352_244010)">
        <path fillRule="evenodd" clipRule="evenodd" d="M7.50017 21.9985C7.20417 21.9985 6.92217 21.8665 6.73117 21.6395L2.23117 16.2385C1.87817 15.8135 1.93617 15.1835 2.35917 14.8295C2.78517 14.4765 3.41517 14.5345 3.76917 14.9575L7.45917 19.3875L20.2002 2.39854C20.5312 1.95654 21.1592 1.86854 21.6002 2.19854C22.0422 2.52954 22.1322 3.15654 21.8002 3.59854L8.30017 21.5985C8.11617 21.8435 7.83117 21.9905 7.52517 21.9985H7.50017Z" fill="currentColor"/>
      </g>
    </svg>
  )
}) {
  return (
    <div 
      className={`cell ${isSelected ? 'cell--selected' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="cell__content">
        <div className="cell__icon-label">
          {showLeadingIcon && leadingIcon && (
            <div className="cell__leading-icon">
              {leadingIcon}
            </div>
          )}
          <div className="cell__labels">
            <div className="cell__label">{label}</div>
          </div>
        </div>
        {showTrailingIcon && isSelected && (
          <div className="cell__trailing-icon">
            {trailingIcon}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cell; 