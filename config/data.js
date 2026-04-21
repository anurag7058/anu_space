// ─── Mock Data (no database needed) ──────────────────────────────────────────

const users = [
  {
    id: 1,
    name: 'Demo User',
    email: 'user@myshop.com',
    password: 'password123',
  },
];

const products = [
  {
    id: 1,
    name: 'Air Max Sneakers',
    price: 2999,
    originalPrice: 3999,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    badge: 'Hot',
    rating: 4.5,
    reviews: 128,
    description: 'Premium comfort sneakers with air cushion technology for all-day wear.',
  },
  {
    id: 2,
    name: 'Wireless Headphones',
    price: 1499,
    originalPrice: 1999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    badge: 'Sale',
    rating: 4.8,
    reviews: 256,
    description: 'Crystal clear audio with 30-hour battery life and noise cancellation.',
  },
  {
    id: 3,
    name: 'Classic Denim Jacket',
    price: 1799,
    originalPrice: 2499,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&q=80',
    badge: 'New',
    rating: 4.3,
    reviews: 89,
    description: 'Timeless denim jacket with a modern slim fit. Perfect for any occasion.',
  },
  {
    id: 4,
    name: 'Smart Watch Pro',
    price: 3499,
    originalPrice: 4999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
    badge: 'Trending',
    rating: 4.7,
    reviews: 312,
    description: 'Feature-packed smartwatch with health tracking, GPS, and 7-day battery.',
  },
];

const categories = [
  { name: 'Electronics', icon: '💻', count: 2 },
  { name: 'Clothing',    icon: '👕', count: 1 },
  { name: 'Footwear',    icon: '👟', count: 1 },
];

module.exports = { users, products, categories };
