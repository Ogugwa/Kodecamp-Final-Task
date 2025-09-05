// ReusableModules/cartModule.js

// ===== Show Notification =====
export function showNotification(message) {
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
