// ReusableModules/cartModule.js

// I am putting the styling of the notification and cart icon together here for readabiliy

function injectStyles() {
  const style = document.createElement("style");
  style.id = "cart-icon-styles";
  style.textContent = `
      /* Notification */
      .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #333;
        color: #fff;
        padding: 1rem;
        border-radius: 8px;
        opacity: 0;
        transform: translateY(100%);
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 10000;
      }
      .notification.show {
        opacity: 1;
        transform: translateY(0);
      }

      /* Cart badge */
      .cart-badge {
        background: red;
        color: white;
        border-radius: 50%;
        font-size: 0.75rem;
        padding: 0.2rem 0.5rem;
        position: absolute;
        top: -8px;
        right: -8px;
      }
      .cart-container {
        position: relative;
        display: inline-block;
      }
    `;
  document.head.appendChild(style);
}

// ===== Show Notification =====
export function showNotification(message) {
  injectStyles();

  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => notification.classList.add("show"), 100);

  setTimeout(() => {
    notification.classList.remove("show");
    notification.addEventListener("transitionend", () => {
      notification.remove();
    });
  }, 2000);
}

// ===== Add to Cart =====
export function addToCart(product, redirectUrl = null) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));

  showNotification(`${product.title} has been added to cart!`);

  if (redirectUrl) {
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 1200);
  }
}

// ===== Update cart badge =====
export function updateCartBadge() {
  injectStyles();

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.length;

  let cartIcon = document.querySelector(".cart-icon");
  if (!cartIcon) return; // If no cart icon in nav, skip

  // Ensure container exists
  if (!cartIcon.classList.contains("cart-container")) {
    const wrapper = document.createElement("span");
    wrapper.classList.add("cart-container");
    cartIcon.parentNode.insertBefore(wrapper, cartIcon);
    wrapper.appendChild(cartIcon);
  }

  // Badge element
  let badge = document.querySelector(".cart-badge");
  if (!badge) {
    badge = document.createElement("span");
    badge.classList.add("cart-badge");
    document.querySelector(".cart-container").appendChild(badge);
  }

  badge.textContent = count > 0 ? count : "";
}
// ===== Attach Listeners to Buttons =====
export function setupCartButtons(buttonSelector, redirectUrl = null) {
  const buttons = document.querySelectorAll(buttonSelector);

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const product = {
        id: button.getAttribute("data-id"),
        title: button.getAttribute("data-title"),
        price: button.getAttribute("data-price"),
        image: button.getAttribute("data-image"),
      };

      addToCart(product, redirectUrl);
    });
  });
}
