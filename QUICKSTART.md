# Quick Start Guide - Excel Product Management

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
Open Command Prompt or Git Bash (not PowerShell) and run:
```bash
cd C:\Users\Krishna\Projects\Artemisia-pharma-website
npm install
```

### Step 2: Generate Sample Excel Files
```bash
npm run generate-templates
```

This creates 5 Excel files in the `data/` folder:
- ✅ IR Pellets.xlsx
- ✅ SR,CR,PR Pellets.xlsx
- ✅ EC,DR Pellets.xlsx
- ✅ Granules.xlsx
- ✅ Inert Core Pellets.xlsx

### Step 3: Edit Your Products
1. Open `data/IR Pellets.xlsx` in Excel
2. You'll see sample products - replace them with your actual products
3. Keep the first row as headers
4. Add/remove rows as needed
5. Save the file

### Step 4: Test Locally
```bash
npm run dev
```

Open http://localhost:3000/products/ir-pellets in your browser. You should see your products!

### Step 5: Push to GitHub
```bash
git add .
git commit -m "Add Excel-based product management with sample data"
git push
```

GitHub Actions will automatically build and deploy your site!

## 📝 Editing Products Daily

### To Update Products:
1. Open Excel file in `data/` folder
2. Edit products (add/remove/modify rows)
3. Save file
4. In terminal:
   ```bash
   git add data/
   git commit -m "Update products"
   git push
   ```
5. Wait 2-3 minutes for automatic deployment
6. Refresh your website to see changes

## 📋 Excel File Structure

### Format:
```
Row 1: Product Name | Strength | Description | Status
Row 2: Omeprazole   | 20mg     | IR pellets  | Available
Row 3: Esomeprazole | 40mg     | IR pellets  | Available
...
```

### Rules:
- ✅ First row MUST be headers
- ✅ Add any columns you want
- ✅ All columns will appear on website
- ✅ Use Excel, Google Sheets, or LibreOffice

## 🎯 What Each File Controls

| Excel File | Website Page |
|------------|--------------|
| IR Pellets.xlsx | /products/ir-pellets |
| SR,CR,PR Pellets.xlsx | /products/sr-cr-pr-pellets |
| EC,DR Pellets.xlsx | /products/dr-ec-pellets |
| Granules.xlsx | /products/granules |
| Inert Core Pellets.xlsx | /products/inert-core-pellets |

## ❓ Common Questions

**Q: Can I add more columns?**  
A: Yes! Just add a column in Excel. It will automatically appear on the website.

**Q: Can I use special characters?**  
A: Yes! Unicode is fully supported.

**Q: How long until changes appear?**  
A: 2-3 minutes after pushing to GitHub.

**Q: Can I work offline?**  
A: Yes! Edit Excel files offline, then push when you're online.

**Q: What if I make a mistake?**  
A: Use `git revert` to undo your last commit, or restore from a backup.

## 🆘 Troubleshooting

**Products not showing?**
1. Check file name matches exactly (with commas)
2. Ensure first row has headers
3. Verify file is in `data/` folder

**Can't run npm commands?**
- Use Command Prompt or Git Bash instead of PowerShell
- Or update PowerShell execution policy

**Build failing on GitHub?**
- Check GitHub Actions logs
- Ensure all Excel files are valid
- Make sure `npm install` worked locally

## 📚 More Documentation

- **EXCEL_SETUP.md** - Detailed guide with examples
- **IMPLEMENTATION_SUMMARY.md** - Technical architecture
- **data/README.md** - Excel file management guide

## 🎉 You're All Set!

Your Excel-based product management system is ready. Just edit Excel files and push to GitHub!

---

Need help? Check the documentation files or review the error messages in your terminal.
