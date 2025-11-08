const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, '..', 'data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Template data structure for products
const sampleProducts = {
  'IR Pellets': [
    {
      'Product Name': 'Omeprazole IR Pellets',
      'Strength': '20mg',
      'Description': 'Immediate release pellets for acid reduction',
      'Mesh Size': '16-20',
      'Status': 'Available'
    },
    {
      'Product Name': 'Esomeprazole IR Pellets',
      'Strength': '40mg',
      'Description': 'Immediate release pellets for GERD treatment',
      'Mesh Size': '18-25',
      'Status': 'Available'
    }
  ],
  'SR,CR,PR Pellets': [
    {
      'Product Name': 'Tramadol SR Pellets',
      'Strength': '100mg',
      'Description': 'Sustained release pellets for pain management',
      'Release Profile': '12 hours',
      'Status': 'Available'
    },
    {
      'Product Name': 'Metformin CR Pellets',
      'Strength': '500mg',
      'Description': 'Controlled release pellets for diabetes',
      'Release Profile': '24 hours',
      'Status': 'Available'
    }
  ],
  'EC,DR Pellets': [
    {
      'Product Name': 'Omeprazole EC Pellets',
      'Strength': '20mg',
      'Description': 'Enteric coated pellets for gastric protection',
      'Coating Type': 'Eudragit L30D-55',
      'Status': 'Available'
    },
    {
      'Product Name': 'Pantoprazole DR Pellets',
      'Strength': '40mg',
      'Description': 'Delayed release pellets for acid suppression',
      'Coating Type': 'Eudragit L100-55',
      'Status': 'Available'
    }
  ],
  'Granules': [
    {
      'Product Name': 'Paracetamol Granules',
      'Strength': '500mg',
      'Description': 'High-quality granules for analgesic formulations',
      'Particle Size': '200-400 microns',
      'Status': 'Available'
    },
    {
      'Product Name': 'Ibuprofen Granules',
      'Strength': '200mg',
      'Description': 'Anti-inflammatory granules',
      'Particle Size': '250-500 microns',
      'Status': 'Available'
    }
  ],
  'Inert Core Pellets': [
    {
      'Product Name': 'Sugar Spheres NF',
      'Size Range': '16-20 mesh',
      'Description': 'High-quality sugar spheres for coating',
      'Composition': 'Sucrose & Starch',
      'Status': 'Available'
    },
    {
      'Product Name': 'Microcrystalline Cellulose Spheres',
      'Size Range': '18-25 mesh',
      'Description': 'MCC pellets for drug layering',
      'Composition': '100% MCC',
      'Status': 'Available'
    }
  ]
};

// Create Excel files for each category
Object.entries(sampleProducts).forEach(([category, products]) => {
  const ws = xlsx.utils.json_to_sheet(products);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Products');
  
  const filePath = path.join(dataDir, `${category}.xlsx`);
  xlsx.writeFile(wb, filePath);
  console.log(`Created: ${filePath}`);
});

console.log('\nAll template Excel files created successfully!');
console.log('\nYou can now edit these files to add your actual product data.');
console.log('The files are located in the data/ directory.');
