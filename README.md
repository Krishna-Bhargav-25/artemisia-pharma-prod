🌿 Artemisia Pharma Website

A modern, lightweight Node + Express + EJS website for Artemisia Pharma Lifelines, built for easy updates, smooth performance, and elegant presentation.
The site showcases pharma product data, supports automated builds (via Netlify), and includes contact email integration with spam protection.

🚀 Features

Dynamic product catalog

Reads Excel files from the /data folder and generates static HTML pages using EJS templates.

Supports categories like Inert Core Pellets, API Pellets, and others automatically.

Auto-Build + Deployment (Netlify)

The site rebuilds automatically whenever new commits are pushed to GitHub.

Static HTML generated from data ensures fast and secure delivery.

Responsive, Animated UI

Clean design using blue-green brand palette.

Subtle reveal animations for a premium, professional look.

Obfuscated email footer

Displays an “Email Us” call-to-action that’s clickable but spam-bot resistant.

Contact Form (with fallback)

Netlify Forms (optional) or third-party alternatives like Formspree or EmailJS supported.

Accessibility-Friendly

Respects prefers-reduced-motion for users sensitive to animation.

WCAG-compliant color contrast.

🧩 Project Structure
Artemisia-Pharma/
├── data/                     # Excel files with product data
│   ├── inert_core_pellets.xlsx
│   ├── api_pellets.xlsx
│   └── ...
├── public/
│   ├── logo.png              # Company logo
│   ├── styles.css            # Main theme & animations
│   ├── app.js                # Client-side JS (reveal, etc.)
│   └── ...
├── views/
│   ├── partials/             # Header, footer, shared UI
│   ├── products/             # Product category EJS templates
│   ├── index.ejs
│   ├── about.ejs
│   ├── contact.ejs
│   └── portfolio.ejs
├── scripts/
│   ├── prerender.js          # Converts Excel → static HTML
│   └── xcelloader.js         # Excel parsing & data handling
├── netlify.toml              # Build configuration
├── server.js                 # Express app entry point
├── package.json
└── README.md

⚙️ Setup Instructions
1. Clone the repo
git clone https://github.com/<your-org>/artemisia-pharma.git
cd artemisia-pharma

2. Install dependencies
npm install

3. (Optional) Configure environment variables

Copy .env.example → .env and update:

COMPANY_EMAIL=corporate.artemisia@arpharmalifelines.com
SMTP_HOST=smtp.yourprovider.com
SMTP_USER=your-email-user
SMTP_PASS=your-password


SMTP setup is only needed if you plan to send form submissions directly via email rather than Netlify Forms or a third-party service.

💡 Development

Run locally with:

npm run dev


This uses nodemon for live reloads and starts the Express app at:

👉 http://localhost:8888

🏗️ Build Process (Static Generation)

Before deploying to Netlify, the site is pre-rendered using:

node scripts/prerender.js


This:

Reads product Excel files from /data

Generates category pages under /dist

Copies static assets and templates

🌍 Deployment (Netlify)
Build Command
[build]
  command = "node scripts/prerender.js"
  publish = "dist"

Environment Variables

NODE_VERSION = 18

FORM_ENDPOINT (optional if using third-party)

Auto Deploy

Connect the GitHub repo in Netlify → Site Settings → Build & Deploy → Continuous Deployment.
Each push to the main branch will automatically trigger a new build.

📬 Contact Form Setup
Option 1: Netlify Forms (built-in)

Add data-netlify="true" in the <form> tag on /contact.

Netlify will automatically collect submissions in the dashboard.

Option 2: Formspree (free alternative)

Replace your <form> action with:

<form action="https://formspree.io/f/your-id" method="POST">

Option 3: EmailJS (JS-only)

Integrate EmailJS
 using client-side JS to send form data directly to your mailbox.

📂 Data Updates

Each Excel file in /data represents a product category.

Column names correspond to table headers in the site.

After adding or updating a file, commit and push — Netlify auto-builds the static HTML.

If a file is missing or empty, the site shows a graceful message:

“Currently, no data exists for this category.”

🎨 Customization

Theme colors: adjust in public/styles.css under the :root variables.

Logo: replace public/logo.png.

Footer email: update obfuscation script in views/partials/footer.ejs.

🧪 Testing

Run a local build test:

npm run build


Check that /dist contains the generated .html pages and assets.

🛠️ Maintenance Tips

Always verify Excel files have valid headers and non-empty data.

Use semantic naming for product files (api_pellets.xlsx, microgranules.xlsx).

Commit only .xlsx, .js, .ejs, .css, and config files — do not commit /dist/.

For accessibility checks, use Chrome’s Lighthouse tool.

📄 License

© 2025 Artemisia Pharma Lifelines.
All rights reserved. Redistribution or unauthorized reuse is prohibited.
