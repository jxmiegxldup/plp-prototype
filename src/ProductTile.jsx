import React, { useRef, useEffect, useCallback } from 'react';
import Price from './Price';
import StarRating from './StarRating';
import './ProductTile.css';

function ProductTile({ product, onTileClick }) {
  const tileRef = useRef(null);
  const taggstarRef = useRef(null);
  
  // Calculate derived values
  const savePrice = product.wasPrice ? product.wasPrice - product.price : 0;
  const isOnSale = product.wasPrice && product.wasPrice > product.price;

  // Handle image loading errors
  const handleImageError = useCallback((event) => {
    event.target.src = "https://placehold.co/178x223";
  }, []);

  // Generate responsive image srcset
  const generateSrcSet = useCallback(() => {
    if (product.responsiveImage) {
      // Create srcset string with proper formatting for Firefox
      return `${product.responsiveImage.standard} 1x, ${product.responsiveImage.retina} 2x`;
    }
    return undefined;
  }, [product]);

  // Get the best image source for the current device
  const getImageSrc = useCallback(() => {
    if (product.responsiveImage) {
      return product.responsiveImage.standard;
    }
    return product.image;
  }, [product]);

  // Handle tile click
  const handleTileClick = useCallback(() => {
    if (onTileClick) {
      onTileClick(product);
    }
  }, [onTileClick, product]);

  // Handle keyboard interaction
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleTileClick();
    }
  }, [handleTileClick]);

  // Intersection Observer for taggstar animation
  useEffect(() => {
    if (!tileRef.current || !taggstarRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && taggstarRef.current) {
            setTimeout(() => {
              taggstarRef.current.style.animation = 'slideInTaggstar 300ms ease-out forwards';
            }, 500);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    observer.observe(tileRef.current);

    return () => {
      if (tileRef.current) {
        observer.unobserve(tileRef.current);
      }
    };
  }, []);

  return (
    <article 
      className="product-tile" 
      ref={tileRef} 
      tabIndex={0}
      role="button"
      aria-label={`${product.title}, £${product.price}${isOnSale ? `, was £${product.wasPrice}` : ''}`}
      onClick={handleTileClick}
      onKeyDown={handleKeyDown}
    >
      {/* Product Image Section */}
      <div className="product-tile__image-container">
        <div className="product-tile__image-wrapper">
          <img 
            className="product-tile__image" 
            src={getImageSrc()}
            srcSet={generateSrcSet()}
            alt={product.title}
            onError={handleImageError}
            loading="lazy"
          />
          
          {/* Save Button */}
          <button 
            className="product-tile__save-button ds-btn ds-btn--small ds-btn--secondary ds-btn--icon" 
            aria-label="Add to saved items"
            tabIndex={0}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.9219 4.44351L11.7206 4.28063L11.5147 4.1272C9.57305 2.73941 7.07278 2.59359 5.06696 3.91023L4.85401 4.05688L4.64403 4.21364C1.48496 6.65295 1.11628 10.7126 3.75331 13.7298L3.94661 13.9494L10.338 20.2577L10.4514 20.3784C11.3471 21.2637 12.8233 21.2213 13.713 20.2041L15.2262 18.7121C15.863 18.0842 15.4184 17 14.524 17H14.1175L12.1912 18.9009C12.0602 19.0164 11.946 19.0207 11.843 18.9362L5.39952 12.5768L5.10191 12.2264C3.35357 10.0573 3.70036 7.35608 6.02453 5.67857C7.60995 4.53419 9.73657 4.86545 11.1485 6.48002L11.2481 6.59371L11.3377 6.68395C11.7445 7.04499 12.3788 7.01638 12.7495 6.59702L12.8485 6.48502L13.0027 6.31655C14.4143 4.84474 16.4472 4.57604 17.976 5.67957C18.518 6.07077 18.9524 6.51763 19.2779 7.00047L21.5388 7.0004C21.0793 5.89253 20.2789 4.87521 19.1465 4.05788L18.9402 3.91562L18.7234 3.77965C16.6094 2.51931 14.0025 2.82295 12.0778 4.44516L12 4.51211L11.9219 4.44351ZM19.9933 9.88354C19.9355 9.38639 19.5126 9.00011 19 9.00011C18.448 9.00011 18 9.44811 18 10.0001V12.0001H16L15.8835 12.0068C15.3863 12.0646 15 12.4875 15 13.0001C15 13.5521 15.448 14.0001 16 14.0001H18V16.0001L18.0068 16.1167C18.0646 16.6138 18.4875 17.0001 19 17.0001C19.552 17.0001 20 16.5521 20 16.0001V14.0001H22L22.1166 13.9934C22.6137 13.9356 23 13.5127 23 13.0001C23 12.4481 22.552 12.0001 22 12.0001H20V10.0001L19.9933 9.88354Z" fill="currentColor"/>
              </svg>
            </div>
          </button>
          
          {/* Taggstar Overlay - only show if isGoingFast */}
          {product.isGoingFast && (
            <div 
              className="product-tile__taggstar"
              ref={taggstarRef}
              aria-live="polite"
            >
              Going fast! {product.soldCount} sold
            </div>
          )}
        </div>
      </div>

      {/* Product Information Section */}
      <div className="product-tile__info">
        {/* Price Component */}
        <Price 
          price={product.price}
          wasPrice={product.wasPrice}
          savePrice={savePrice}
        />
        
        {/* Product Title */}
        <h3 className="product-tile__title">{product.title}</h3>
        
        {/* Star Rating - only show if rating exists */}
        {product.rating && (
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        )}
        
        {/* Pre-order Badge */}
        {product.isPreOrder && (
          <div className="product-tile__pre-order">Pre-order</div>
        )}
      </div>
    </article>
  );
}

export default ProductTile; 