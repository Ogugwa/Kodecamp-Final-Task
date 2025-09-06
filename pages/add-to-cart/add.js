import { initNavbar } from "../../ReusableModules/navModule.js";

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();

  const cartContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Render cart items
  function renderCart() {
    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      cartTotal.textContent = "Total: $0";
      return;
    }

    cartContainer.innerHTML = cart
      .map(
        (item, index) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.title}" width="50" />
          <span>${item.title}</span>
          <span>$${item.price}</span>
          <button class="remove-item" data-index="${index}">Remove</button>
        </div>
      `
      )
      .join("");

    // Calculate total
    const total = cart.reduce((sum, item) => sum + Number(item.price), 0);
    cartTotal.textContent = `Total: $${total}`;
  }

  // Remove item from cart
  cartContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-item")) {
      const index = e.target.getAttribute("data-index");
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      updateCartBadge();
    }
  });

  renderCart();
});
