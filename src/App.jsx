import './App.css';
import Button from './Button';
import { Link } from 'react-router-dom';
import BottomNav from './BottomNav';
import SiteHeader from './SiteHeader';
import PlpHeader from './PlpHeader';
import Modal from './Modal';
import RadioGroup from './RadioGroup';
import FilterAccordion from './components/FilterAccordion';
import FilterGroup from './components/FilterGroup';
import PriceRangeFilter from './components/PriceRangeFilter';
import { useState } from 'react';
import './PlpHeader.css';
import productsData from './data/products.json';
import { filterProducts } from './utils/filterProducts';

const FilterIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id=" 24 / Filter">
      <path id="Combined Shape" fillRule="evenodd" clipRule="evenodd" d="M13.5004 4.5C10.1865 4.5 7.50043 7.18607 7.50043 10.5C7.50043 13.8139 10.1865 16.5 13.5004 16.5C16.8144 16.5 19.5004 13.8139 19.5004 10.5C19.5004 7.18607 16.8144 4.5 13.5004 4.5ZM13.5004 7.5C15.1575 7.5 16.5004 8.84293 16.5004 10.5C16.5004 12.1571 15.1575 13.5 13.5004 13.5C11.8434 13.5 10.5004 12.1571 10.5004 10.5C10.5004 8.84293 11.8434 7.5 13.5004 7.5ZM21.0004 10.4999C21.0004 11.0179 20.9184 11.5205 20.7641 11.9999H31.5004L31.6754 11.9898C32.4214 11.9032 33.0004 11.2692 33.0004 10.4999C33.0004 9.67149 32.3289 8.99991 31.5004 8.99991H20.7641C20.9184 9.47935 21.0004 9.98197 21.0004 10.4999ZM4.50043 11.9999H6.23677C6.08249 11.5205 6.00043 11.0179 6.00043 10.4999C6.00043 9.98197 6.08249 9.47935 6.23677 8.99991H4.50043L4.3255 9.01001C3.57949 9.09665 2.99968 9.73066 2.99968 10.4999C2.99968 11.3283 3.672 11.9999 4.50043 11.9999ZM15.236 26.9999C15.0817 26.5205 14.9997 26.0179 14.9997 25.4999C14.9997 24.982 15.0817 24.4794 15.236 23.9999H4.49968L4.32475 24.01C3.57874 24.0967 2.99968 24.7307 2.99968 25.4999C2.99968 26.3283 3.67125 26.9999 4.49968 26.9999H15.236ZM29.7634 26.9999H31.4997L31.6746 26.9898C32.4206 26.9032 32.9997 26.2692 32.9997 25.4999C32.9997 24.6715 32.3281 23.9999 31.4997 23.9999H29.7634C29.9177 24.4794 29.9997 24.982 29.9997 25.4999C29.9997 26.0179 29.9177 26.5205 29.7634 26.9999ZM22.4997 19.5C19.1868 19.5 16.4997 22.1865 16.4997 25.5C16.4997 28.8135 19.1868 31.5 22.4997 31.5C25.8136 31.5 28.4997 28.8139 28.4997 25.5C28.4997 22.1861 25.8136 19.5 22.4997 19.5ZM22.4997 22.5C24.1568 22.5 25.4997 23.8429 25.4997 25.5C25.4997 27.1571 24.1568 28.5 22.4997 28.5C20.8435 28.5 19.4997 27.1565 19.4997 25.5C19.4997 23.8435 20.8435 22.5 22.4997 22.5Z" fill="currentColor"/>
    </g>
  </svg>
);

const SortIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id=" 24 / Sort">
      <path id="Combined Shape" fillRule="evenodd" clipRule="evenodd" d="M25.6801 15.9309C25.9726 16.2234 26.3566 16.3704 26.7406 16.3704C27.1246 16.3704 27.5086 16.2234 27.8011 15.9309C28.3876 15.3444 28.3876 14.3964 27.8011 13.8099L18.9301 4.9389C18.3451 4.3539 17.3956 4.3539 16.8091 4.9389L7.93965 13.8099C7.35315 14.3964 7.35315 15.3444 7.93965 15.9309C8.52465 16.5174 9.47415 16.5174 10.0606 15.9309L17.8696 8.1204L25.6801 15.9309ZM16.8099 32.4309C17.1024 32.7234 17.4864 32.8704 17.8704 32.8704C18.2544 32.8704 18.6384 32.7234 18.9309 32.4309L27.8019 23.5599C28.3869 22.9749 28.3869 22.0254 27.8019 21.4389C27.2154 20.8539 26.2659 20.8539 25.6809 21.4389L17.8704 29.2494L10.0599 21.4389C9.4749 20.8539 8.5254 20.8539 7.9389 21.4389C7.3539 22.0254 7.3539 22.9749 7.9389 23.5599L16.8099 32.4309Z" fill="currentColor"/>
    </g>
  </svg>
);

function App() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState('recommended');
  const [activeFilters, setActiveFilters] = useState({
    price: [],
    brand: [],
    color: [],
    size: [],
    material: [],
    rating: []
  });

  const sortOptions = [
    { id: 'recommended', label: 'Recommended' },
    { id: 'on-sale', label: 'On sale' },
    { id: 'price-high-low', label: 'Price (High to Low)' },
    { id: 'price-low-high', label: 'Price (Low to High)' },
    { id: 'rating-high-low', label: 'Rating (High to Low)' }
  ];

  // Get filtered and sorted products
  const filteredProducts = filterProducts(productsData, activeFilters);

  // Function to get products filtered by all filters except the specified one
  const getProductsForFilter = (excludeFilter) => {
    const filtersForCalculation = { ...activeFilters };
    if (excludeFilter) {
      filtersForCalculation[excludeFilter] = [];
    }
    return filterProducts(productsData, filtersForCalculation);
  };

  // Extract unique values from products for filter options
  const getUniqueValues = (field, products) => {
    const values = new Set();
    products.forEach(product => {
      if (field === 'sizes') {
        product.sizes?.forEach(size => values.add(size));
      } else {
        values.add(product[field]);
      }
    });
    return Array.from(values).sort();
  };

  // Get price range from products
  const getPriceRange = () => {
    const prices = productsData.map(p => p.price).filter(p => p !== null && p !== undefined);
    return {
      min: Math.min(...prices, 0),
      max: Math.max(...prices, 500)
    };
  };

  const priceRange = getPriceRange();

  // Dynamic filter options based on current filter state
  const getFilterOptions = (filterType) => {
    const productsForFilter = getProductsForFilter(filterType);
    console.log(`Getting ${filterType} options from ${productsForFilter.length} products`);
    
    switch (filterType) {
      case 'brand':
        const brands = getUniqueValues('brand', productsForFilter).map(brand => ({ value: brand, label: brand }));
        console.log('Brand options:', brands);
        return brands;
      case 'color':
        const colors = getUniqueValues('color', productsForFilter).map(color => ({ value: color, label: color }));
        console.log('Color options:', colors);
        return colors;
      case 'size':
        const sizes = getUniqueValues('sizes', productsForFilter).map(size => ({ value: size, label: size }));
        console.log('Size options:', sizes);
        return sizes;
      case 'material':
        const materials = getUniqueValues('material', productsForFilter).map(material => ({ value: material, label: material }));
        console.log('Material options:', materials);
        return materials;
      case 'rating':
        return [
          { value: 5, label: '5 stars' },
          { value: 4, label: '4+ stars' },
          { value: 3, label: '3+ stars' }
        ];
      default:
        return [];
    }
  };

  const handleOpenFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleOpenSortModal = () => {
    setIsSortModalOpen(true);
  };

  const handleCloseSortModal = () => {
    setIsSortModalOpen(false);
  };

  const handleFilterApply = () => {
    console.log('Applying filters:', activeFilters);
    setIsFilterModalOpen(false);
  };

  const handleFilterReset = () => {
    setActiveFilters({
      price: [],
      brand: [],
      color: [],
      size: [],
      material: [],
      rating: []
    });
    console.log('Filter reset');
  };

  const handleSortOptionChange = (optionId) => {
    setSelectedSortOption(optionId);
    console.log('Sort changed to:', optionId);
    // Close modal immediately after selection
    setIsSortModalOpen(false);
  };

  // Get price range from products
  const handleFilterChange = (filterType, value) => {
    console.log('Filter change:', filterType, value);
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <div className="plp-root">
      {/* Header */}
      <SiteHeader />

      {/* Top Section */}
      <PlpHeader sortOption={selectedSortOption} products={filteredProducts} />

      {/* Sort/Filter Button Group and Bottom Nav Container */}
      <div className="plp-bottom-bar">
        <div className="sort-filter-group">
          <Button variant="primary" iconAfter={<SortIcon />} onClick={handleOpenSortModal}>Sort</Button>
          <div className="sort-filter-divider" />
          <Button variant="primary" iconAfter={<FilterIcon />} onClick={handleOpenFilterModal}>Filter</Button>
        </div>
        <BottomNav />
      </div>

      {/* Filter Modal */}
      <Modal
        isOpen={isFilterModalOpen}
        onClose={handleCloseFilterModal}
        title="Filter"
        primaryButtonText="Apply"
        secondaryButtonText="Reset"
        onPrimaryClick={handleFilterApply}
        onSecondaryClick={handleFilterReset}
      >
        <div>
          {/* Price Range Filter */}
          <FilterAccordion title="Price">
            <PriceRangeFilter
              selectedRanges={activeFilters.price}
              onRangeChange={(ranges) => handleFilterChange('price', ranges)}
              products={getProductsForFilter('price')}
            />
          </FilterAccordion>

          {/* Brand Filter */}
          <FilterAccordion title="Brand">
            <FilterGroup
              options={getFilterOptions('brand')}
              selectedValues={activeFilters.brand}
              onSelectionChange={(values) => handleFilterChange('brand', values)}
              itemsPerRow={3}
              products={getProductsForFilter('brand')}
              filterField="brand"
            />
          </FilterAccordion>

          {/* Color Filter */}
          <FilterAccordion title="Color">
            <FilterGroup
              options={getFilterOptions('color')}
              selectedValues={activeFilters.color}
              onSelectionChange={(values) => handleFilterChange('color', values)}
              itemsPerRow={4}
              products={getProductsForFilter('color')}
              filterField="color"
            />
          </FilterAccordion>

          {/* Size Filter */}
          <FilterAccordion title="Size">
            <FilterGroup
              options={getFilterOptions('size')}
              selectedValues={activeFilters.size}
              onSelectionChange={(values) => handleFilterChange('size', values)}
              itemsPerRow={4}
              products={getProductsForFilter('size')}
              filterField="sizes"
            />
          </FilterAccordion>

          {/* Material Filter */}
          <FilterAccordion title="Material">
            <FilterGroup
              options={getFilterOptions('material')}
              selectedValues={activeFilters.material}
              onSelectionChange={(values) => handleFilterChange('material', values)}
              itemsPerRow={3}
              products={getProductsForFilter('material')}
              filterField="material"
            />
          </FilterAccordion>

          {/* Rating Filter */}
          <FilterAccordion title="Rating">
            <FilterGroup
              options={getFilterOptions('rating')}
              selectedValues={activeFilters.rating}
              onSelectionChange={(values) => handleFilterChange('rating', values)}
              itemsPerRow={3}
              showAllButton={false}
              products={getProductsForFilter('rating')}
              filterField="rating"
            />
          </FilterAccordion>
        </div>
      </Modal>

      {/* Sort Modal */}
      <Modal
        isOpen={isSortModalOpen}
        onClose={handleCloseSortModal}
        title="Sort"
        showFooter={false}
      >
        <RadioGroup
          options={sortOptions}
          selectedValue={selectedSortOption}
          onValueChange={handleSortOptionChange}
          name="sort-options"
        />
      </Modal>

      {/* Footer */}
      <footer className="plp-footer">
        <div>© 2024 BrandName</div>
      </footer>
    </div>
  );
}

export default App;
