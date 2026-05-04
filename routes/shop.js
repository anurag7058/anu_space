const express = require('express');
const router  = express.Router();
const { products, categories } = require('../config/data');

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
  const { category, brand, minPrice, maxPrice, sort, badge } = req.query;

  let filtered = [...products];

  // Category filter
  if (category) filtered = filtered.filter(p => p.category === category);

  // Brand filter
  if (brand) filtered = filtered.filter(p => p.brand === brand);

  // Badge filter
  if (badge) filtered = filtered.filter(p => p.badge && p.badge.toLowerCase() === badge.toLowerCase());

  // Price range filter
  if (minPrice) filtered = filtered.filter(p => p.price >= parseInt(minPrice));
  if (maxPrice) filtered = filtered.filter(p => p.price <= parseInt(maxPrice));

  // Sorting
  if (sort === 'price_asc')    filtered.sort((a, b) => a.price - b.price);
  else if (sort === 'price_desc') filtered.sort((a, b) => b.price - a.price);
  else if (sort === 'rating')  filtered.sort((a, b) => b.rating - a.rating);
  else if (sort === 'newest')  filtered.sort((a, b) => b.id - a.id);
  // default: no sort (original order)

  // Build list of brands available (within current category filter if active)
  const brandPool = category ? products.filter(p => p.category === category) : products;
  const availableBrands = [...new Set(brandPool.map(p => p.brand))].sort();

  res.render('shop', {
    products: filtered,
    categories,
    selectedCategory: category || null,
    selectedBrand: brand || null,
    selectedMinPrice: minPrice || '',
    selectedMaxPrice: maxPrice || '',
    selectedSort: sort || '',
    selectedBadge: badge || '',
    availableBrands,
    user: req.session.user || null,
    cartCount: cartCount(req),
    page: 'shop',
  });
});

// ── Product Detail ────────────────────────────────────────────────────────────
router.get('/product/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.redirect('/shop');

  res.render('product', {
    product,
    related: products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4),
    user: req.session.user || null,
    cartCount: cartCount(req),
    page: 'shop',
  });
});

// ── Checkout ──────────────────────────────────────────────────────────────────
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
