import React from 'react';
import Button from './Button';

const iconSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M9.5 2C10.0523 2 10.5 2.44772 10.5 3C10.5 3.51284 10.114 3.93551 9.61662 3.99327L9.5 4H4V9.5C4 10.0128 3.61396 10.4355 3.11662 10.4933L3 10.5C2.48716 10.5 2.06449 10.114 2.00673 9.61662L2 9.5V2H9.5ZM3.99327 14.3834C3.93551 13.886 3.51284 13.5 3 13.5C2.44772 13.5 2 13.9477 2 14.5V22H9.5L9.61662 21.9933C10.114 21.9355 10.5 21.5128 10.5 21L10.4933 20.8834C10.4355 20.386 10.0128 20 9.5 20H4V14.5L3.99327 14.3834ZM21.9933 14.3834C21.9355 13.886 21.5128 13.5 21 13.5L20.8834 13.5067C20.386 13.5645 20 13.9872 20 14.5V20H14.5L14.3834 20.0067C13.886 20.0645 13.5 20.4872 13.5 21C13.5 21.5523 13.9477 22 14.5 22H22V14.5L21.9933 14.3834ZM22 9.5V2H14.5L14.3834 2.00673C13.886 2.06449 13.5 2.48716 13.5 3L13.5067 3.11662C13.5645 3.61396 13.9872 4 14.5 4H20V9.5L20.0067 9.61662C20.0645 10.114 20.4872 10.5 21 10.5C21.5523 10.5 22 10.0523 22 9.5Z" fill="currentColor"/>
  </svg>
);

export default function ComponentPreview() {
  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
      <h2>Button Variants</h2>
      <div style={{ display: 'flex', gap: 16 }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        <Button variant="primary" iconBefore={iconSvg}>Primary + Icon</Button>
        <Button variant="secondary" iconAfter={iconSvg}>Secondary + Icon</Button>
        <Button variant="tertiary" iconBefore={iconSvg} iconAfter={iconSvg}>Tertiary + 2 Icons</Button>
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        <Button variant="primary" shape="round">8XL</Button>
        <Button variant="secondary" shape="round">8XL</Button>
        <Button variant="tertiary" shape="round">8XL</Button>
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        <Button variant="primary" shape="round">
          <span className="ds-btn__icon ds-btn__icon--before">{iconSvg}</span>
          <span className="plp-bottom-nav__label">Label</span>
        </Button>
        <Button variant="secondary" shape="round">
          <span className="ds-btn__icon ds-btn__icon--before">{iconSvg}</span>
          <span className="plp-bottom-nav__label">Label</span>
        </Button>
        <Button variant="tertiary" shape="round">
          <span className="ds-btn__icon ds-btn__icon--before">{iconSvg}</span>
          <span className="plp-bottom-nav__label">Label</span>
        </Button>
      </div>
    </div>
  );
} 