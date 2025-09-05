// Cart functionality using localStorage

// Storage key
const CART_KEY = "cart";

// Helpers
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find((p) => String(p.id) === String(product.id));
  if (existing) {
    existing.quantity += product.quantity || 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: Number(product.price) || 0,
      image: product.image || "",
      quantity: product.quantity || 1,
    });
  }
  saveCart(cart);
}

function removeFromCart(id) {
  const cart = getCart().filter((p) => String(p.id) !== String(id));
  saveCart(cart);
}

function updateQuantity(id, qty) {
  const cart = getCart();
  const item = cart.find((p) => String(p.id) === String(id));
  if (item) {
    item.quantity = Math.max(1, parseInt(qty || 1, 10));
    saveCart(cart);
  }
}

function clearCart() {
  saveCart([]);
}

function getTotals() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const count = cart.reduce((sum, p) => sum + p.quantity, 0);
  return { subtotal, count };
}

function formatMoney(n) {
  // Keep dollars since your API returns USD
  return (Number(n) || 0).toFixed(2);
}

// Navbar badge (optional)
// Add <span id="cart-count" class="badge">0</span> near your nav cart icon if you want
function updateCartBadge() {
  const el = document.getElementById("cart-count");
  if (!el) return;
  const { count } = getTotals();
  el.textContent = count;
}

// Renders the cart on the cart page
function renderCart() {
  const container = document.getElementById("cart-container");
  const subtotalEl = document.getElementById("subtotal");
  const countEl = document.getElementById("item-count");
  const clearBtn = document.getElementById("clear-cart");

  if (!container) return; // not on cart page

  const cart = getCart();
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `
      <p>Your cart is empty.</p>
      <a href="../shop-page/shop.html" class="btn btn-primary">Go to Shop</a>
    `;
  } else {
    cart.forEach((item) => {
      const lineTotal = item.price * item.quantity;

      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="thumb" />
        <div class="info">
          <h3 class="title">${item.title}</h3>
          <div class="price">$${formatMoney(item.price)}</div>
        </div>
        <div class="qty">
          <input type="number" min="1" value="${
            item.quantity
          }" aria-label="Quantity for ${item.title}" />
        </div>
        <div class="line-total">$${formatMoney(lineTotal)}</div>
        <button class="remove" aria-label="Remove ${
          item.title
        }">&times;</button>
      `;

      // Quantity change
      row.querySelector("input").addEventListener("change", (e) => {
        updateQuantity(item.id, e.target.value);
        renderCart(); // re-render to update totals/line
      });

      // Remove
      row.querySelector(".remove").addEventListener("click", () => {
        removeFromCart(item.id);
        renderCart();
      });

      container.appendChild(row);
    });
  }

  // Totals
  const { subtotal, count } = getTotals();
  if (subtotalEl) subtotalEl.textContent = formatMoney(subtotal);
  if (countEl) countEl.textContent = count;

  // Clear cart
  if (clearBtn) {
    clearBtn.onclick = () => {
      clearCart();
      renderCart();
    };
  }

  updateCartBadge();
}

// Expose minimal API globally for other scripts
window.Cart = {
  addToCart,
  renderCart,
  updateCartBadge,
  getCart,
  clearCart,
};

// Auto-render on pages that have a cart container
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartBadge();
});
