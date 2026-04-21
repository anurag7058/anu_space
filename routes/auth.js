const express = require('express');
const router  = express.Router();
const { users } = require('../config/data');

// Helper: get cart item count from session
function cartCount(req) {
  const cart = req.session.cart || [];
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

// ── Login Page ────────────────────────────────────────────────────────────────
router.get('/login', (req, res) => {
  if (req.session.user) return res.redirect('/');
  res.render('login', {
    error: null,
    user: null,
    cartCount: cartCount(req),
    page: 'login',
  });
});

// ── Login Submit ──────────────────────────────────────────────────────────────
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    req.session.user = { id: user.id, name: user.name, email: user.email };
    return res.redirect('/');
  }

  res.render('login', {
    error: 'Invalid email or password. Try user@myshop.com / password123',
    user: null,
    cartCount: cartCount(req),
    page: 'login',
  });
});

// ── Logout ────────────────────────────────────────────────────────────────────
router.get('/logout', (req, res) => {
  req.session.user = null;
  res.redirect('/');
});

module.exports = router;
