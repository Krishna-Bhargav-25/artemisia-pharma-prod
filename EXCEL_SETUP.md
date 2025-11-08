# Excel-Based Product Management Setup

This document explains how the Excel-based product management system works and how to use it.

## 🎯 Overview

Your website now reads product data from Excel files stored in the `data/` directory. When you update these Excel files and push to GitHub, the website automatically rebuilds with the new data.

## 📁 Files Created

### Core Files
1. **utils/excelLoader.js** - Loads Excel data and converts to JSON
2. **scripts/createTemplates.js** - Generates sample Excel files
3. **views/partials/product-table.ejs** - Reusable table component
4. **data/README.md** - Instructions for managing Excel files

### Updated Files
- **server.js** - Now loads Excel data for all product pages
- **scripts/prerender.js** - Builds static site with Excel data
- **package.json** - Added xlsx dependency and generate-templates script
- All product pages (*.ejs) - Now display Excel data dynamically

## 🚀 Getting Started

### Step 1: Install Dependencies
```bash
npm install
```

This will install the `xlsx` package needed to read Excel files.

### Step 2: Generate Template Excel Files
```bash
npm run generate-templates
```

This creates 5 Excel files in the `data/` directory with sample product data:
- IR Pellets.xlsx
- SR,CR,PR Pellets.xlsx
- EC,DR Pellets.xlsx
- Granules.xlsx
- Inert Core Pellets.xlsx

### Step 3: Edit Excel Files
Open any Excel file in Microsoft Excel, Google Sheets, or LibreOffice:
- **Row 1**: Column headers (Product Name, Strength, Description, etc.)
- **Row 2+**: Your product data

You can:
- Add/remove products (rows)
- Change product information
- Add/remove columns (they'll automatically appear on the website)

### Step 4: Test Locally
```bash
npm run dev
```

Visit http://localhost:3000/products and navigate to any category to see your data.

### Step 5: Deploy to GitHub Pages

#### Option A: Commit and Push
```bash
git add data/
git add utils/ scripts/ views/ server.js package.json
git commit -m "Add Excel-based product management"
git push
```

#### Option B: Build Locally First
```bash
npm run build
git add .
git commit -m "Add Excel-based product management with built static site"
git push
```

## 📊 Excel File Format

### Example Structure

| Product Name | Strength | Description | Mesh Size | Status |
|--------------|----------|-------------|-----------|---------|
| Omeprazole IR Pellets | 20mg | Immediate release pellets | 16-20 | Available |
| Esomeprazole IR Pellets | 40mg | GERD treatment | 18-25 | Available |

### Column Guidelines
- **First row MUST be headers**
- Use clear, descriptive header names
- All columns will be displayed on the website
- You can use any number of columns
- Unicode characters are supported

## 🔄 Workflow

```
1. Edit Excel file in data/ directory
   ↓
2. Save the Excel file
   ↓
3. git add data/
   ↓
4. git commit -m "Update products"
   ↓
5. git push
   ↓
6. GitHub Actions builds site
   ↓
7. Updated products appear on website
```

## 🛠️ Technical Details

### How It Works

1. **Excel Storage**: Product data is stored in `.xlsx` files in the `data/` directory
2. **Runtime Loading**: When the server starts, `excelLoader.js` reads Excel files and converts them to JSON
3. **Static Build**: During `npm run build`, the prerender script reads Excel data and bakes it into HTML
4. **Dynamic Tables**: The `product-table.ejs` partial dynamically generates tables from any Excel structure

### File Mappings

The system maps URLs to Excel files:

| URL | Excel File |
|-----|------------|
| /products/ir-pellets | IR Pellets.xlsx |
| /products/sr-cr-pr-pellets | SR,CR,PR Pellets.xlsx |
| /products/dr-ec-pellets | EC,DR Pellets.xlsx |
| /products/granules | Granules.xlsx |
| /products/inert-core-pellets | Inert Core Pellets.xlsx |

## 🎨 Customization

### Adding a New Product Category

1. Add the category to `utils/excelLoader.js`:
```javascript
const PRODUCT_FILES = {
  // ... existing files
  'new-category': 'New Category.xlsx'
};
```

2. Add metadata to the `getCategories()` function:
```javascript
{
  key: 'new-category',
  title: 'New Category',
  description: 'Description here',
  route: '/products/new-category'
}
```

3. Add route in `server.js`:
```javascript
app.get('/products/new-category', (req, res) => {
  const products = loadProductData('new-category');
  res.render('products/new-category', { title: 'New Category - Artemisia Pharma', products });
});
```

4. Create EJS template at `views/products/new-category.ejs`

5. Update `scripts/prerender.js` to include the new page

### Customizing the Table Display

Edit `views/partials/product-table.ejs` to change how products are displayed.

## 🐛 Troubleshooting

### Products Not Showing?
1. Check Excel file name matches exactly (case-sensitive)
2. Verify first row has column headers
3. Ensure file is in `data/` directory
4. Check console for error messages
5. Try regenerating templates: `npm run generate-templates`

### Build Failing?
1. Ensure all dependencies are installed: `npm install`
2. Check that `data/` directory exists
3. Verify Excel files are valid (open them in Excel to test)
4. Check GitHub Actions logs for specific errors

### Excel File Won't Open?
The generated files are valid `.xlsx` files. If they won't open:
1. Try a different program (Excel, Google Sheets, LibreOffice)
2. Regenerate templates: `npm run generate-templates`
3. Check file permissions

## 📝 Best Practices

1. **Backup First**: Always keep backup copies before major changes
2. **Consistent Naming**: Use the same column names across similar products
3. **Test Locally**: Run `npm run dev` to test before pushing
4. **Small Commits**: Commit changes frequently with clear messages
5. **Version Control**: Excel files are binary, so commit messages are important

## 🔐 Security Note

Excel files are committed to your GitHub repository and are publicly visible. Do not include:
- Proprietary formulations
- Pricing information (unless public)
- Internal codes or identifiers
- Customer information

## 📞 Support

If you encounter issues:
1. Check the console output for error messages
2. Review the `data/README.md` file
3. Verify all file names match exactly
4. Ensure the `data/` directory is committed to Git
