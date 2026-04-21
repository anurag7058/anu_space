const express = require('express');
const router  = express.Router();
const { products, categories } = require('../config/data');

// Helper: get cart item count from session
function cartCount(req) {
  const cart = req.session.cart || [];
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

// ── Home ──────────────────────────────────────────────────────────────────────
router.get('/', (req, res) => {
  res.render('home', {
    products,
    categories,
    user: req.session.user || null,
    cartCount: cartCount(req),
    page: 'home',
  });
});

// ── Shop / Product List ───────────────────────────────────────────────────────
router.get('/shop', (req, res) => {
  const { category } = req.query;
  const filtered = category
    ? products.filter((p) => p.category === category)
    : products;

  res.render('shop', {
    products: filtered,
    categories,
    selectedCategory: category || null,
    user: req.session.user || null,
    cartCount: cartCount(req),
    page: 'shop',
  });
});

// ── Product Detail ────────────────────────────────────────────────────────────
router.get('/product/:id', (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.redirect('/shop');

  res.render('product', {
    product,
    related: products.filter((p) => p.id !== product.id).slice(0, 3),
    user: req.session.user || null,
    cartCount: cartCount(req),
    page: 'shop',
  });
});

// ── Checkout (thank-you page) ─────────────────────────────────────────────────
router.get('/checkout', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  req.session.cart = [];
  res.render('checkout', {
    user: req.session.user,
    cartCount: 0,
    page: 'cart',
  });
});

module.exports = router;
