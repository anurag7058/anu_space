# 🛍️ MyShop — E-Commerce Website

A clean, full-stack e-commerce web app built with **Node.js**, **Express**, and **EJS** templating. No database required — perfect for learning or a portfolio project.

---

## 📁 Project Structure

```
MyShop/
├── config/
│   └── data.js          # Products, users, categories (mock data)
├── public/
│   ├── css/
│   │   └── style.css    # All styles
│   └── js/
│       └── main.js      # Frontend JS (cart, toasts, animations)
├── routes/
│   ├── shop.js          # Home, shop, product detail routes
│   ├── cart.js          # Cart CRUD routes
│   └── auth.js          # Login / logout routes
├── views/
│   ├── partials/
│   │   ├── header.ejs   # Navbar, head tags
│   │   └── footer.ejs   # Footer, scripts
│   ├── home.ejs
│   ├── shop.ejs
│   ├── product.ejs
│   ├── cart.ejs
│   ├── checkout.ejs
│   └── login.ejs
├── server.js            # Express app entry point
├── package.json
└── .gitignore
```

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/myshop.git
cd myshop
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the app
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

### 4. Open in browser
```
http://localhost:3000
```

---

## 🔑 Demo Login

| Field    | Value               |
|----------|---------------------|
| Email    | user@myshop.com     |
| Password | password123         |

---

## 🛠️ Tech Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Backend   | Node.js + Express       |
| Templating| EJS                     |
| Styling   | Custom CSS + Bootstrap 5|
| Session   | express-session         |
| Data      | In-memory (no database) |

---

## ✨ Features

- 🏠 Home page with hero, categories & featured products
- 🛍️ Shop page with category filters
- 📦 Product detail page
- 🛒 Cart with quantity update & remove
- 🔐 Login / logout with session
- 📱 Fully responsive (mobile-friendly)
- 🍞 Toast notifications
- ✅ Order confirmation page

---

## 📦 Dependencies

```json
{
  "express": "^4.18.2",
  "express-session": "^1.17.3",
  "ejs": "^3.1.9"
}
```

Install dev dependency for auto-reload:
```bash
npm install --save-dev nodemon
```
