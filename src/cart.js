import "./style.css";
import { renderCart } from "./cart-utils";

const cartItemsContainer = document.querySelector("#cart-items");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

cartItemsContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const index = event.target.dataset.index;
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart(cart, cartItemsContainer);
  }
});

cartItemsContainer.addEventListener("input", (event) => {
  if (event.target.classList.contains("quantity-input")) {
    const index = event.target.dataset.index;
    cart[index].quantity = parseInt(event.target.value) || 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart(cart, cartItemsContainer);
  }
});

renderCart(cart, cartItemsContainer);