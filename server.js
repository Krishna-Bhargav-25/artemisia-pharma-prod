require('dotenv').config();
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const { loadProductData, getCategories } = require('./utils/excelLoader');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Artemisia Pharma' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Us - Artemisia Pharma' });
});

app.get('/products', (req, res) => {
  const categories = getCategories();
  res.render('products/index', { title: 'Products - Artemisia Pharma', categories });
});
app.get('/products/ir-pellets', (req, res) => {
  const products = loadProductData('ir-pellets');
  res.render('products/ir-pellets', { title: 'IR Pellets - Artemisia Pharma', products });
});
app.get('/products/sr-cr-pr-pellets', (req, res) => {
  const products = loadProductData('sr-cr-pr-pellets');
  res.render('products/sr-cr-pr-pellets', { title: 'SR/CR/PR Pellets - Artemisia Pharma', products });
});
app.get('/products/dr-ec-pellets', (req, res) => {
  const products = loadProductData('dr-ec-pellets');
  res.render('products/dr-ec-pellets', { title: 'EC/DR Pellets - Artemisia Pharma', products });
});
app.get('/products/inert-core-pellets', (req, res) => {
  res.render('products/inert-core-pellets', { title: 'Inert Core Pellets - Artemisia Pharma' });
});
app.get('/products/granules', (req, res) => {
  const products = loadProductData('granules');
  res.render('products/granules', { title: 'Granules - Artemisia Pharma', products });
});
app.get('/products/inert-core-pellets', (req, res) => {
  const products = loadProductData('inert-core-pellets');
  res.render('products/inert-core-pellets', { title: 'Inert Core Pellets - Artemisia Pharma', products });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us - Artemisia Pharma', sent: null, error: null });
});

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Boolean(process.env.SMTP_SECURE === 'true'),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `Website Contact <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.COMPANY_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      replyTo: email,
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`,
    });

    console.log('Email sent:', info.messageId);
    res.render('contact', { title: 'Contact Us - Artemisia Pharma', sent: true, error: null });
  } catch (err) {
    console.error('Email error:', err);
    res.render('contact', { title: 'Contact Us - Artemisia Pharma', sent: false, error: 'Failed to send message. Please try again later.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
