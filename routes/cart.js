const express  = require('express');
const router   = express.Router();
const { products } = require('../config/data');

// Helper: get cart item count from session
function cartCount(req) {
  const cart = req.session.cart || [];
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

// ── View Cart ─────────────────────────────────────────────────────────────────
router.get('/cart', (req, res) => {
  const cart = req.session.cart || [];

  const cartItems = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return { ...product, quantity: item.quantity };
  });

  const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  res.render('cart', {
    cartItems,
    total,
    user: req.session.user || null,
    cartCount: cartCount(req),
    page: 'cart',
  });
});

// ── Add to Cart ───────────────────────────────────────────────────────────────
router.post('/cart/add', (req, res) => {
  const productId = parseInt(req.body.productId);
  if (!req.session.cart) req.session.cart = [];

  const existing = req.session.cart.find((i) => i.productId === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    req.session.cart.push({ productId, quantity: 1 });
  }

  res.json({ success: true, cartCount: cartCount(req) });
});

// ── Update Cart Quantity ──────────────────────────────────────────────────────
router.post('/cart/update', (req, res) => {
  const { productId, quantity } = req.body;
  if (!req.session.cart) req.session.cart = [];

  const item = req.session.cart.find((i) => i.productId === parseInt(productId));
  if (item) {
    if (parseInt(quantity) <= 0) {
      req.session.cart = req.session.cart.filter(
        (i) => i.productId !== parseInt(productId)
      );
    } else {
      item.quantity = parseInt(quantity);
    }
  }

  res.json({ success: true, cartCount: cartCount(req) });
});

// ── Remove from Cart ──────────────────────────────────────────────────────────
router.post('/cart/remove', (req, res) => {
  const productId = parseInt(req.body.productId);
  req.session.cart = (req.session.cart || []).filter(
    (i) => i.productId !== productId
  );
  res.json({ success: true, cartCount: cartCount(req) });
});

module.exports = router;
