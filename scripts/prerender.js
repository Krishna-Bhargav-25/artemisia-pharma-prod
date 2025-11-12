/*
  Static prerender for Netlify (and GitHub Pages)
  - Converts EJS views → dist/
  - Auto-generates pages from Excel files in /data/
  - Dynamically builds category list for /products/
*/

const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const ejs = require('ejs');
// const { loadProductData } = require('../utils/excelLoader');

const root = path.join(__dirname, '..');
const viewsDir = path.join(root, 'views');
const distDir = path.join(root, 'dist');
const publicDir = path.join(root, 'public');
const docsDir = path.join(root, 'docs');
const dataDir = path.join(root, 'data');

// Base path (use '/' for Netlify)
const basePath = '/';
const FORM_ENDPOINT = process.env.FORM_ENDPOINT || '';
const VERSION = process.env.BUILD_VERSION || String(Date.now());

/* -----------------------------
   🧩 Step 1: Auto-detect Excel files
------------------------------ */
/* const excelFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.xlsx'));

const categories = excelFiles.map(file => {
  const name = file.replace(/\.xlsx$/, '');
  const slug = name.toLowerCase().replace(/[\s,]+/g, '-'); // e.g. "IC Pellets" → "ic-pellets"
  return { name, slug };
});
*/
const { loadProductData, getCategories } = require('../utils/excelLoader');

// Load proper metadata-based categories
const categories = getCategories();

/* -----------------------------
   🧩 Step 2: Build page list dynamically
------------------------------ */
const productPages = categories.map(cat => ({
  view: `products/${cat.slug}`,
  out: `products/${cat.slug}/index.html`,
  data: {
    title: `${cat.name} - Artemisia Pharma`,
    products: loadProductData(cat.slug),
  },
}));

const pages = [
  { view: 'index', out: 'index.html', data: { title: 'Artemisia Pharma' } },
  { view: 'about', out: 'about/index.html', data: { title: 'About Us - Artemisia Pharma' } },
  { view: 'products/index', out: 'products/index.html', data: { title: 'Products - Artemisia Pharma', categories } },
  { view: 'products/ir-pellets', out: 'products/ir-pellets/index.html', data: { title: 'IR Pellets - Artemisia Pharma', products: loadProductData('ir-pellets') } },
  { view: 'products/sr-cr-pr-pellets', out: 'products/sr-cr-pr-pellets/index.html', data: { title: 'SR/CR/PR Pellets - Artemisia Pharma', products: loadProductData('sr-cr-pr-pellets') } },
  { view: 'products/dr-ec-pellets', out: 'products/dr-ec-pellets/index.html', data: { title: 'EC/DR Pellets - Artemisia Pharma', products: loadProductData('dr-ec-pellets') } },
  { view: 'products/granules', out: 'products/granules/index.html', data: { title: 'Granules - Artemisia Pharma', products: loadProductData('granules') } },

  // ✅ New Combinations category prerender
  { view: 'products/combinations', out: 'products/combinations/index.html', data: { title: 'Combinations - Artemisia Pharma', products: loadProductData('combinations') } },

  { view: 'contact', out: 'contact/index.html', data: { title: 'Contact Us - Artemisia Pharma', sent: null, error: null } },
  { view: 'thank-you', out: 'thank-you/index.html', data: { title: 'Thank You – Artemisia Pharma' } },
];

/* -----------------------------
   🧩 Step 3: Rewriter for assets and forms
------------------------------ */
function rewriteForPages(html) {
  let out = html
    .replace(/href=\"\/styles\.css\"/g, `href=\"${basePath}styles.css?v=${VERSION}\"`)
    .replace(/src=\"\/app\.js\"/g, `src=\"${basePath}app.js?v=${VERSION}\"`)
    .replace(/src=\"\/logo\.(png|jpg|jpeg|svg)\"/g, `src=\"${basePath}logo.$1?v=${VERSION}\"`);

  if (FORM_ENDPOINT) {
    out = out.replace(
      /<form([^>]*?)method=\"POST\"([^>]*?)action=\"[^\"]*\"/i,
      `<form$1method="POST"$2action="${FORM_ENDPOINT}"`
    );
  } else {
    out = out.replace(
      /<form([^>]*?)method=\"POST\"([^>]*?)action=\"[^\"]*\"/i,
      `<form$1method="POST"$2action="#" onsubmit="alert('This form is disabled on the static site.'); return false;"`
    );
  }

  return out;
}

/* -----------------------------
   🧩 Step 4: Utility - copy static files
------------------------------ */
async function copyDir(src, dest) {
  await fsp.mkdir(dest, { recursive: true });
  for (const entry of await fsp.readdir(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) await copyDir(s, d);
    else await fsp.copyFile(s, d);
  }
}

/* -----------------------------
   🧩 Step 5: Main prerender execution
------------------------------ */
(async () => {
  await fsp.rm(distDir, { force: true, recursive: true });
  await fsp.mkdir(distDir, { recursive: true });

  // Copy static assets
  if (fs.existsSync(publicDir)) {
    await copyDir(publicDir, distDir);
  }

  // Render EJS views
  for (const p of pages) {
    const outPath = path.join(distDir, p.out);
    await fsp.mkdir(path.dirname(outPath), { recursive: true });
    const file = path.join(viewsDir, `${p.view}.ejs`);
    if (!fs.existsSync(file)) {
      console.warn(`⚠️ Skipped missing view: ${file}`);
      continue;
    }
    const html = await ejs.renderFile(file, p.data, { views: [viewsDir] });
    const rewritten = rewriteForPages(html);
    await fsp.writeFile(outPath, rewritten, 'utf8');
  }

  // Copy to docs/ for GitHub Pages compatibility
  await fsp.rm(docsDir, { force: true, recursive: true });
  await fsp.mkdir(docsDir, { recursive: true });
  await copyDir(distDir, docsDir);
  await fsp.writeFile(path.join(docsDir, '.nojekyll'), '');
  console.log('✅ Static site generated successfully.');
})();

