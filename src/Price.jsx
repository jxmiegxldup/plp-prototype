import React from 'react';
import './Price.css';

function CurrentPrice({ price }) {
  return (
    <div className="price__current">
      <div className="price__value">£{price}</div>
    </div>
  );
}

function SavePrice({ saveAmount }) {
  return (
    <div className="price__save">
      <div className="price__save-label">Save £{saveAmount}</div>
    </div>
  );
}

function WasPrice({ wasPrice }) {
  return (
    <div className="price__was">
      Was £{wasPrice}
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