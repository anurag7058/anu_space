const API = "http://localhost:3001";

let products = [];
let cart = [];
let currentUser = null;

// INIT WITH FALLBACK
async function init() {
  try {
    const res = await fetch(`${API}/api/products`);
    products = await res.json();
  } catch (error) {
    // 🔥 Fallback products if backend is OFF
    products = [
      { id: 1, name: "Shoes", price: 2000 },
      { id: 2, name: "T-Shirt", price: 800 },
      { id: 3, name: "Watch", price: 1500 },
      { id: 4, name: "Headphones", price: 2500 },
      { id: 5, name: "Jeans", price: 1800 }
    ];
  }

  loadProducts();
}

// LOAD PRODUCTS
function loadProducts() {
  const el = document.getElementById("product-list");

  el.innerHTML = products.map(p => `
    <div>
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `).join("");
}

// ADD TO CART
function addToCart(id) {
  const existing = cart.find(i => i.id === id);

  if (existing) {
    existing.qty++;
  } else {
    const p = products.find(x => x.id === id);
    cart.push({ ...p, qty: 1 });
  }

  alert("Added to cart 🛒");
}

// PLACE ORDER → GO TO PAYMENT
function placeOrder() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById("payment-amount").textContent = total;

  showPage("payment");
}

// PAYMENT TOGGLE (ONLY UPI)
document.addEventListener("change", (e) => {
  if (e.target.name === "payment") {
    if (e.target.value === "upi") {
      document.getElementById("upi-box").classList.remove("hidden");
    } else {
      document.getElementById("upi-box").classList.add("hidden");
    }
  }
});

// CONFIRM PAYMENT
async function confirmPayment() {
  const method = document.querySelector("input[name='payment']:checked").value;

  // UPI VALIDATION
  if (method === "upi") {
    const upi = document.getElementById("upi-id").value.trim();
    if (!upi || !upi.includes("@")) {
      alert("Enter valid UPI ID");
      return;
    }
  }

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  try {
    await fetch(`${API}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: 1,
        items: cart,
        total,
        method
      })
    });
  } catch {
    console.log("Backend offline — demo mode");
  }

  alert(`Order placed via ${method.toUpperCase()} ✅`);

  cart = [];
}

// PAGE NAVIGATION
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// START APP
init();