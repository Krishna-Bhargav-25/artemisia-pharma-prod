# 🌿 Artemisia Pharma Website

A **modern, lightweight Node + Express + EJS** website for **Artemisia Pharma Lifelines**, built for easy updates, fast static builds, and elegant pharmaceutical presentation.

---

## 🚀 Features

- **Dynamic Product Catalog**
  - Reads Excel sheets from `/data/` and converts them to HTML pages.
  - Auto-generates product listings with names, concentrations, and details.

- **Automated Static Generation**
  - Prerendering script (`scripts/prerender.js`) builds all EJS templates into static HTML under `/dist/`.

- **Netlify-Ready**
  - Easy deployment using `netlify.toml` configuration.
  - Supports environment variables and form endpoints.

- **Responsive & Animated UI**
  - Clean blue-green color palette matching Artemisia branding.
  - Subtle scroll and reveal animations enhance user experience.

- **Secure Contact Email**
  - Obfuscated “Email Us” footer link (clickable `mailto:`) prevents spam scraping.

- **Accessibility & Performance**
  - WCAG color contrast.
  - Honors user settings like `prefers-reduced-motion`.

---

## 🧩 Folder Structure

```
Artemisia-Pharma/
├── data/                     # Excel product sheets
├── dist/                     # Generated static site (after build)
├── public/                   # Static assets (CSS, JS, images)
│   ├── styles.css
│   ├── app.js
│   └── logo.png
├── scripts/                  # Build and prerender scripts
│   ├── prerender.js
│   └── xcelloader.js
├── views/                    # EJS templates
│   ├── partials/             # Header, footer, layout
│   ├── products/
│   ├── index.ejs
│   ├── about.ejs
│   ├── contact.ejs
│   └── portfolio.ejs
├── netlify/
│   └── functions/            # Optional Netlify serverless functions
├── .env.example              # Example environment config
├── netlify.toml              # Build configuration
├── package.json
├── server.js                 # Express app entry point
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/<your-org>/artemisia-pharma.git
cd artemisia-pharma
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy `.env.example` → `.env` and fill:

```
COMPANY_EMAIL=corporate.artemisia@arpharmalifelines.com
SMTP_HOST=smtp.yourprovider.com
SMTP_USER=your-email-user
SMTP_PASS=your-password
```

*(Optional if not sending emails directly via SMTP)*

### 4. Run locally

```bash
npm run dev
```
Starts the Express development server at [http://localhost:8888](http://localhost:8888).

---

## 🏗️ Build & Deployment

### Build Command (Netlify or Manual)

```bash
node scripts/prerender.js
```
Generates static files into `/dist`.

### Netlify Configuration (`netlify.toml`)

```toml
[build]
  command = "node scripts/prerender.js"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"
  FORM_ENDPOINT = ""

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Deploy to Netlify

1. Connect repository on Netlify.
2. Set build command: `node scripts/prerender.js`
3. Publish directory: `dist`
4. Auto-deploys on each push to `main`.

---

## 📬 Contact Form Options

### ✅ Option 1: Netlify Forms (Built-in)
Add in `/contact.ejs`:

```html
<form name="contact" method="POST" data-netlify="true">
```

### ✅ Option 2: Formspree (Free Alternative)
```html
<form action="https://formspree.io/f/your-id" method="POST">
```

### ✅ Option 3: EmailJS (Client-Side)
Use EmailJS SDK for instant email sending without backend.

---

## 🎨 Customization

- **Logo**: Replace `public/logo.png`.
- **Colors**: Update CSS variables in `public/styles.css`.
- **Animations**: Controlled in `public/app.js`.
- **Footer Email**: Obfuscation logic inside `views/partials/footer.ejs`.

---

## 🧪 Testing

Test local build output:
```bash
npm run build
```
Verify `/dist` contains generated `.html` pages.

---

## 🛠️ Maintenance & Tips

- Keep product Excel headers consistent (e.g. `Name`, `Concentration`, `Description`).
- Always validate Excel data before pushing changes.
- Never commit `/dist/` folder to Git.
- Regularly test build locally before deploy.

---

## 📄 License

© 2025 **Artemisia Pharma Lifelines**.  
All rights reserved. Unauthorized reproduction or redistribution is prohibited.
