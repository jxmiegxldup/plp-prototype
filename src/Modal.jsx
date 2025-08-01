import React, { useEffect, useRef } from 'react';
import Button from './Button';
import './Modal.css';

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id=" 24 / Close">
      <path id="Fill 1" fillRule="evenodd" clipRule="evenodd" d="M19.6969 17.9999L29.6485 8.04833C30.1177 7.57913 30.1177 6.82073 29.6485 6.35153C29.1793 5.88233 28.4209 5.88233 27.9517 6.35153L18.0001 16.3031L8.04852 6.35153C7.57932 5.88233 6.82092 5.88233 6.35172 6.35153C5.88252 6.82073 5.88252 7.57913 6.35172 8.04833L16.3033 17.9999L6.35172 27.9515C5.88252 28.4207 5.88252 29.1791 6.35172 29.6483C6.58572 29.8823 6.89292 29.9999 7.20012 29.9999C7.50732 29.9999 7.81452 29.8823 8.04852 29.6483L18.0001 19.6967L27.9517 29.6483C28.1857 29.8823 28.4929 29.9999 28.8001 29.9999C29.1073 29.9999 29.4145 29.8823 29.6485 29.6483C30.1177 29.1791 30.1177 28.4207 29.6485 27.9515L19.6969 17.9999Z" fill="currentColor"/>
    </g>
  </svg>
);

function Modal({ 
  isOpen, 
  onClose, 
  title = "Sheet title", 
  children, 
  primaryButtonText = "Apply", 
  secondaryButtonText = "Reset",
  onPrimaryClick,
  onSecondaryClick,
  showFooter = true 
}) {
  const modalRef = useRef(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Close button outside modal - Tablet+ Only */}
      <button 
        className="modal-external-close ds-btn ds-btn--round ds-btn--secondary ds-btn--icon"
        onClick={onClose}
        aria-label="Close modal"
      >
        <CloseIcon />
      </button>

      <div 
        className="modal-container" 
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close Button Area - Mobile Only */}
        <div className="modal-close-area">
          <button 
            className="modal-close-button ds-btn ds-btn--secondary ds-btn--icon"
            onClick={onClose}
            aria-label="Close modal"
          >
            <div>
              <CloseIcon />
            </div>
          </button>
        </div>

        {/* Header */}
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">{title}</h2>
        </div>

        {/* Content */}
        <div className="modal-content">
          <div className="modal-main-content">
            {children}
          </div>
          
          {/* Footer */}
          {showFooter && (
            <div className="modal-footer">
              <Button 
                type="tertiary"
                onClick={onSecondaryClick}
                className="modal-footer-button"
              >
                {secondaryButtonText}
              </Button>
              <Button 
                type="primary"
                onClick={onPrimaryClick}
                className="modal-footer-button"
              >
                {primaryButtonText}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal; 