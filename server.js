const express = require('express');
const session = require('express-session');
const path    = require('path');

const shopRoutes = require('./routes/shop');
const cartRoutes = require('./routes/cart');
const authRoutes = require('./routes/auth');

const app  = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'myshop-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/', shopRoutes);
app.use('/', cartRoutes);
app.use('/', authRoutes);

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🛍️  MyShop is running at http://localhost:${PORT}\n`);
});
