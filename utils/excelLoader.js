/**
 * utils/excelLoader.js
 * ----------------------------------------
 * Loads Excel files for each product category and converts them to JSON.
 * Handles missing or invalid files gracefully by returning an empty array.
 */

const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const dataDir = path.join(__dirname, '..', 'data');

/**
 * Product category to file mapping
 */
const PRODUCT_FILES = {
  'ir-pellets': 'IR Pellets.xlsx',
  'sr-cr-pr-pellets': 'SR,CR,PR Pellets.xlsx',
  'ec-dr-pellets': 'EC,DR Pellets.xlsx',
  'granules': 'Granules.xlsx',
  'combinations': 'Combinations.xlsx',
  'inert-core-pellets': 'Inert Core Pellets.xlsx',
};

/**
 * Load product data from Excel file
 * @param {string} category - Product category key
 * @returns {Array} Array of product objects or []
 */
function loadProductData(category) {
  const fileName = PRODUCT_FILES[category];

  if (!fileName) {
    console.warn(`⚠️ Unknown product category: ${category}`);
    return [];
  }

  const filePath = path.join(dataDir, fileName);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ Excel file missing for category "${category}": ${filePath}`);
    return [];
  }

  try {
    // Read Excel workbook
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];

    if (!sheetName) {
      console.warn(`⚠️ No sheets found in ${fileName}`);
      return [];
    }

    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    if (!data || data.length === 0) {
      console.warn(`ℹ️ No rows found in ${fileName}`);
      return [];
    }

    return data;
  } catch (error) {
    console.error(`❌ Error reading Excel file "${fileName}":`, error.message);
    return [];
  }
}

/**
 * Get all product categories with display metadata
 * Used for navigation and product listing pages
 */
function getCategories() {
  return [
    {
      key: 'ir-pellets',
      title: 'IR Pellets',
      description: 'Immediate Release',
      route: '/products/ir-pellets',
    },
    {
      key: 'sr-cr-pr-pellets',
      title: 'SR/CR/PR Pellets',
      description: 'Sustained/Controlled/Prolonged Release',
      route: '/products/sr-cr-pr-pellets',
    },
    {
      key: 'ec-dr-pellets',
      title: 'EC/DR Pellets',
      description: 'Enteric-Coated/Delayed Release',
      route: '/products/ec-dr-pellets',
    },
    {
      key: 'granules',
      title: 'Granules',
      description: 'High-quality pharmaceutical granules',
      route: '/products/granules',
    },
    {
      key: 'combinations',
      title: 'Combinations',
      description: 'Custom multi-layered pellet/granule formulations, blends and therapeutic combinations',
      route: '/products/combinations'
    },
    {
      key: 'inert-core-pellets',
      title: 'Inert Core Pellets',
      description: 'Neutral starter cores for layering APIs and coatings',
      route: '/products/inert-core-pellets',
    },
  ];
}

module.exports = {
  loadProductData,
  getCategories,
  PRODUCT_FILES,
};
