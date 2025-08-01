import React, { useState, useRef } from 'react';
import Button from './Button';
import ProductTile from './ProductTile';
import productsData from './data/products.json';
import { sortProducts } from './utils/sortProducts';

const iconSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M9.5 2C10.0523 2 10.5 2.44772 10.5 3C10.5 3.51284 10.114 3.93551 9.61662 3.99327L9.5 4H4V9.5C4 10.0128 3.61396 10.4355 3.11662 10.4933L3 10.5C2.48716 10.5 2.06449 10.114 2.00673 9.61662L2 9.5V2H9.5ZM3.99327 14.3834C3.93551 13.886 3.51284 13.5 3 13.5C2.44772 13.5 2 13.9477 2 14.5V22H9.5L9.61662 21.9933C10.114 21.9355 10.5 21.5128 10.5 21L10.4933 20.8834C10.4355 20.386 10.0128 20 9.5 20H4V14.5L3.99327 14.3834ZM21.9933 14.3834C21.9355 13.886 21.5128 13.5 21 13.5L20.8834 13.5067C20.386 13.5645 20 13.9872 20 14.5V20H14.5L14.3834 20.0067C13.886 20.0645 13.5 20.4872 13.5 21C13.5 21.5523 13.9477 22 14.5 22H22V14.5L21.9933 14.3834ZM22 9.5V2H14.5L14.3834 2.00673C13.886 2.06449 13.5 2.48716 13.5 3L13.5067 3.11662C13.5645 3.61396 13.9872 4 14.5 4H20V9.5L20.0067 9.61662C20.0645 10.114 20.4872 10.5 21 10.5C21.5523 10.5 22 10.0523 22 9.5Z" fill="currentColor"/>
  </svg>
);

function TabList({ activeTab, onTabClick }) {
  const tabRefs = useRef({});
  const tabs = ['shop', 'discover'];

  const handleKeyDown = (event, tabId) => {
    const currentIndex = tabs.indexOf(tabId);
    
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        const nextTab = tabs[(currentIndex + 1) % tabs.length];
        onTabClick(nextTab);
        tabRefs.current[nextTab]?.focus();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        const prevTab = tabs[(currentIndex - 1 + tabs.length) % tabs.length];
        onTabClick(prevTab);
        tabRefs.current[prevTab]?.focus();
        break;
      case 'Home':
        event.preventDefault();
        onTabClick(tabs[0]);
        tabRefs.current[tabs[0]]?.focus();
        break;
      case 'End':
        event.preventDefault();
        onTabClick(tabs[tabs.length - 1]);
        tabRefs.current[tabs[tabs.length - 1]]?.focus();
        break;
      default:
        break;
    }
  };

  return (
    <div className="tabs" role="tablist" aria-label="Product navigation tabs">
      <button 
        ref={(el) => tabRefs.current['shop'] = el}
        className={`tab ${activeTab === 'shop' ? 'tab--active' : ''}`}
        onClick={() => onTabClick('shop')}
        onKeyDown={(e) => handleKeyDown(e, 'shop')}
        role="tab"
        aria-selected={activeTab === 'shop'}
        aria-controls="shop-panel"
        id="shop-tab"
        tabIndex={activeTab === 'shop' ? 0 : -1}
      >
        Shop
      </button>
      <button 
        ref={(el) => tabRefs.current['discover'] = el}
        className={`tab ${activeTab === 'discover' ? 'tab--active' : ''}`}
        onClick={() => onTabClick('discover')}
        onKeyDown={(e) => handleKeyDown(e, 'discover')}
        role="tab"
        aria-selected={activeTab === 'discover'}
        aria-controls="discover-panel"
        id="discover-tab"
        tabIndex={activeTab === 'discover' ? 0 : -1}
      >
        Discover
      </button>
    </div>
  );
}

function TabPanels({ activeTab, sortOption = 'recommended', products = [] }) {
  // Use provided products or fall back to static data
  const productsToDisplay = products.length > 0 ? products : productsData;
  
  // Sort products based on the current sort option
  const sortedProducts = sortProducts(productsToDisplay, sortOption);

  return (
    <div className="tab-panels">
      <div
        id="shop-panel"
        role="tabpanel"
        aria-labelledby="shop-tab"
        className={`tab-panel ${activeTab === 'shop' ? 'tab-panel--active' : ''}`}
      >
        {/* Product Grid */}
        <main className="plp-products">
          {sortedProducts.map((product) => (
            <ProductTile key={product.id} product={product} />
          ))}
        </main>

        {/* Load More Button */}
        <div className="plp-load-more">
          <Button variant="secondary">Load More</Button>
        </div>
      </div>

      <div
        id="discover-panel"
        role="tabpanel"
        aria-labelledby="discover-tab"
        className={`tab-panel ${activeTab === 'discover' ? 'tab-panel--active' : ''}`}
      >
        {/* Empty discover content for now */}
        <div className="discover-content">
          <p>Discover content coming soon...</p>
        </div>
      </div>
    </div>
  );
}

export default function Tabs({ sortOption = 'recommended', products = [] }) {
  const [activeTab, setActiveTab] = useState('shop');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <>
      <TabList activeTab={activeTab} onTabClick={handleTabClick} />
      <TabPanels activeTab={activeTab} sortOption={sortOption} products={products} />
    </>
  );
}

export { TabList, TabPanels }; 