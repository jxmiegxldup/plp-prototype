import React, { useState } from 'react';
import Breadcrumb from './Breadcrumb';
import { TabList, TabPanels } from './Tabs';

function PLPHeading() {
  return (
    <h1 className="plp-heading__title">Dresses</h1>
  );
}

export default function PlpHeader({ sortOption = 'recommended', products = [] }) {
  const [activeTab, setActiveTab] = useState('shop');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="plp-header">
      <div className="plp-header-white-section">
        <div className="plp-breadcrumb-container">
          <Breadcrumb />
        </div>
        <div className="plp-heading-tabs-container">
          <div className="plp-heading-container">
            <PLPHeading />
          </div>
          <div className="plp-tabs-container">
            <TabList activeTab={activeTab} onTabClick={handleTabClick} />
          </div>
        </div>
      </div>
      <TabPanels activeTab={activeTab} sortOption={sortOption} products={products} />
    </div>
  );
} 