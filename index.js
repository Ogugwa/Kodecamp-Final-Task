import { initNavbar } from "./ReusableModules/navModule.js";
import {
  setupCartButtons,
  updateCartBadge,
} from "./ReusableModules/cartModule.js";

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  updateCartBadge();

  // Making API calls to fetch data for the features page
  const featureProduct = document.querySelector(".features-container");
  const apiUrl = "https://api.escuelajs.co/api/v1/products?offset=0&limit=3";

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((data) => {
      featureProduct.innerHTML = data
        .map(
          (product) => `
        <div class="features-card">
          <img src="${product.images[0]}" alt="${product.title}" />
          <h2>${product.title}</h2>
          <h3>$${product.price}</h3>
          <button class="add-to-cart"
            data-id="${product.id}" 
            data-title="${product.title}" 
            data-price="${product.price}" 
            data-image="${product.images[0]}">
            <a href="./pages/add-to-cart/add.html">Add to Cart</a>
          </button>
        </div>
      `
        )
        .join("");

      // Use reusable cart function
      setupCartButtons(".add-to-cart", "./pages/add-to-cart/add.html");
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});
