# Product Data Management

This directory contains Excel files that store product information for each category.

## Excel Files

The following Excel files are used to manage product data:

1. **IR Pellets.xlsx** - Immediate Release pellets
2. **SR,CR,PR Pellets.xlsx** - Sustained/Controlled/Prolonged Release pellets
3. **EC,DR Pellets.xlsx** - Enteric-Coated/Delayed Release pellets
4. **Granules.xlsx** - Pharmaceutical granules
5. **Inert Core Pellets.xlsx** - Core pellets for layering

## How to Update Products

### Step 1: Edit Excel Files
Open any Excel file and edit the product data. Each file has:
- **First row**: Column headers (e.g., Product Name, Strength, Description)
- **Subsequent rows**: Product data

You can:
- Add new rows for new products
- Edit existing product information
- Remove rows to delete products
- Add or modify columns (headers will automatically display on the website)

### Step 2: Save and Commit to GitHub
After editing:
```bash
git add data/
git commit -m "Update product data"
git push
```

### Step 3: Automatic Deployment
Once pushed to GitHub:
- GitHub Actions will automatically run
- The website will rebuild with your updated data
- Changes will be live on GitHub Pages within minutes

## Excel File Structure

### Recommended Columns
While you can use any column headers, here are recommended ones:

**For Pellets (IR, SR/CR/PR, EC/DR):**
- Product Name
- Strength
- Description
- Mesh Size / Particle Size
- Release Profile (for SR/CR/PR)
- Coating Type (for EC/DR)
- Status

**For Granules:**
- Product Name
- Strength
- Description
- Particle Size
- Composition
- Status

**For Inert Core Pellets:**
- Product Name
- Size Range
- Description
- Composition
- Sphericity
- Status

## Generating Template Files

If you need to regenerate the template Excel files with sample data:

```bash
npm run generate-templates
```

This will create all 5 Excel files with sample product data.

## Important Notes

1. **First Row is Headers**: The first row in each Excel sheet defines the column names
2. **All Columns Display**: All columns in your Excel file will be displayed on the website
3. **UTF-8 Support**: You can use special characters and multiple languages
4. **Automatic Updates**: No code changes needed - just edit Excel and push to GitHub
5. **Keep Backups**: Always keep backup copies of your Excel files before making major changes

## Troubleshooting

If products aren't displaying:
1. Check that the Excel file name matches exactly (case-sensitive, with proper commas)
2. Ensure the first row contains column headers
3. Verify the file is in the `data/` directory
4. Check the GitHub Actions build logs for errors
