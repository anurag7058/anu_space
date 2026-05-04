// ── MyShop Main JS ──────────────────────────────────────────────────────────

// Toast notification
function showToast(msg, icon = '✅') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'my-toast fade-in';
  toast.innerHTML = `<span class="icon">${icon}</span><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// Update cart badge
function updateCartBadge(count) {
  document.querySelectorAll('.cart-count-badge').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'inline-flex' : 'none';
  });
}

// Add to cart
document.addEventListener('click', async function (e) {
  const btn = e.target.closest('.btn-add-cart, .btn-add-detail');
  if (!btn) return;

  const productId = btn.dataset.id;
  if (!productId) return;

  const originalText = btn.textContent;
  btn.textContent = 'Added! ✓';
  btn.classList.add('added');
  btn.disabled = true;

  try {
    const res = await fetch('/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId })
    });
    const data = await res.json();
    if (data.success) {
      updateCartBadge(data.cartCount);
      showToast('Item added to cart!');
    }
  } catch (err) {
    console.error(err);
  }

  setTimeout(() => {
    btn.textContent = originalText;
    btn.classList.remove('added');
    btn.disabled = false;
  }, 1800);
});

// Cart page: quantity update
async function updateQty(productId, change) {
  const display = document.getElementById(`qty-${productId}`);
  if (!display) return;
  let qty = parseInt(display.textContent) + change;
  if (qty < 0) qty = 0;

  const res = await fetch('/cart/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, quantity: qty })
  });
  const data = await res.json();
  if (data.success) {
    if (qty === 0) {
      location.reload();
    } else {
      display.textContent = qty;
      updateCartBadge(data.cartCount);
      recalcCart();
    }
  }
}

// Cart page: remove item
async function removeItem(productId) {
  const res = await fetch('/cart/remove', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId })
  });
  const data = await res.json();
  if (data.success) {
    const row = document.getElementById(`cart-row-${productId}`);
    if (row) {
      row.style.transition = 'opacity 0.3s, transform 0.3s';
      row.style.opacity = '0';
      row.style.transform = 'translateX(20px)';
      setTimeout(() => { row.remove(); recalcCart(); }, 300);
    }
    updateCartBadge(data.cartCount);
    showToast('Item removed', '🗑️');
  }
}

// Recalculate cart totals client-side
function recalcCart() {
  let subtotal = 0;
  document.querySelectorAll('[data-price]').forEach(row => {
    const price = parseFloat(row.dataset.price);
    const qtyEl = row.querySelector('.qty-display');
    const qty = qtyEl ? parseInt(qtyEl.textContent) : 0;
    const lineEl = row.querySelector('.line-total');
    if (lineEl) lineEl.textContent = '₹' + (price * qty).toLocaleString('en-IN');
    subtotal += price * qty;
  });

  const subtotalEl = document.getElementById('summary-subtotal');
  const totalEl = document.getElementById('summary-total');
  const delivery = subtotal > 0 ? 99 : 0;

  if (subtotalEl) subtotalEl.textContent = '₹' + subtotal.toLocaleString('en-IN');
  if (totalEl) totalEl.textContent = '₹' + (subtotal + delivery).toLocaleString('en-IN');

  const deliveryEl = document.getElementById('summary-delivery');
  if (deliveryEl) deliveryEl.textContent = subtotal > 0 ? '₹99' : '₹0';

  // empty state
  const cartRows = document.querySelectorAll('[data-price]').length;
  const emptyMsg = document.getElementById('empty-cart-msg');
  const checkoutBtn = document.getElementById('checkout-btn');
  if (emptyMsg) emptyMsg.style.display = cartRows === 0 ? 'block' : 'none';
  if (checkoutBtn) checkoutBtn.style.display = cartRows === 0 ? 'none' : 'block';
}

// Stagger animation on product cards
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.product-card');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease, box-shadow 0.28s, border-color 0.28s';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 60 * i);
  });

  // Sticky navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar && (navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)');
    } else {
      navbar && (navbar.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)');
    }
  });
});


