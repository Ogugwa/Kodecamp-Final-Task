import { initNavbar } from "../../ReusableModules/navModule.js";

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();

  // Making API calls for the product page
  const apiUrl = "https://api.escuelajs.co/api/v1/products";

  // Const for container to display fetched data
  const productListContainer = document.getElementById("product-list");

  // Making the get request
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      productListContainer.innerHTML = data
        .map(
          (product) => `
        <div class="product" >
          <img src="${product.images[0]}" alt="${product.title}" />
          <h2>${product.title}</h2>
          <p>${product.description}</p>
          <h3>$${product.price}</h3>
         <button class="add-to-cart"
              data-id="${product.id}"
              data-title="${product.title}"
              data-price="${product.price}"
              data-image="${product.images[0]}">
              <a href="../add-to-cart/add.html">Add to Cart</a>
            </button>
        </div>
      `
        )
        .join("");
      // Use reusable cart function
      setupCartButtons(".add-to-cart", "../add-to-cart/add.html");
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});
