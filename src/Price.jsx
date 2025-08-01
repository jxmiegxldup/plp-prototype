import React from 'react';
import './Price.css';

// Helper function to format price with 2 decimal places if needed
function formatPrice(price) {
  if (price === null || price === undefined) return '';
  return Number.isInteger(price) ? `£${price}` : `£${price.toFixed(2)}`;
}

function CurrentPrice({ price }) {
  return (
    <div className="price__current">
      <div className="price__value">{formatPrice(price)}</div>
    </div>
  );
}

function SavePrice({ saveAmount }) {
  return (
    <div className="price__save">
      <div className="price__save-label">Save {formatPrice(saveAmount)}</div>
    </div>
  );
}

function WasPrice({ wasPrice }) {
  return (
    <div className="price__was">
      Was {formatPrice(wasPrice)}
    </div>
  );
}

function Price({ price, wasPrice, savePrice, showSave = true, showWas = true }) {
  return (
    <div className="price">
      <CurrentPrice price={price} />
      {showSave && savePrice > 0 && (
        <SavePrice saveAmount={savePrice} />
      )}
      {showWas && wasPrice && wasPrice > price && (
        <WasPrice wasPrice={wasPrice} />
      )}
    </div>
  );
}

export default Price;
export { CurrentPrice, SavePrice, WasPrice }; 