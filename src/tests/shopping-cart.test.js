"use strict";

import { renderCart } from '../cart-utils.js';

let cart, tableBody;

beforeEach(() => {
  document.body.innerHTML = `
   <table>
        <tbody id="cart-items"></tbody>
    </table>
    <div>
        Total : <span id="total-price">0</span> €
    </div>
  `;

    cart = [
        { name: "Lait", available_quantity: 56, unit_price: 2.52, quantity: 1 },
        { name: "Tomate", available_quantity: 104, unit_price: 3.59, quantity: 1 },
        { name: "Beurre", available_quantity: 164, unit_price: 3.09, quantity: 3 },
        { name: "Oignon", available_quantity: 94, unit_price: 4.31, quantity: 1 },
    ];

    localStorage.setItem('cart', JSON.stringify(cart));

    tableBody = document.querySelector('#cart-items');
    renderCart(cart, tableBody);

    tableBody.addEventListener("input", (event) => {
        if (event.target.classList.contains("quantity-input")) {
          const index = event.target.dataset.index;
          cart[index].quantity = parseInt(event.target.value) || 1;
          localStorage.setItem("cart", JSON.stringify(cart));
          renderCart(cart, tableBody);
        }
    });

    tableBody.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
          const index = event.target.dataset.index;
          cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
          renderCart(cart, tableBody);
        }
    });
});


// Displaying localStorage products in table test
test('Tous les produits sont bien affichés', () => {
    const tableBody = document.querySelector('#cart-items');
    const tableItems = tableBody.querySelectorAll('tr');
    expect(tableItems).toHaveLength(4);
});

// Calculating total price test
test("Le prix total est bien calculé et affiché", () => {
    const expectedTotal =
      2.52 * 1 + // Lait
      3.59 * 1 + // Tomate
      3.09 * 3 + // Beurre
      4.31 * 1;  // Oignon
  
    const totalDisplayed = document.querySelector('#total-price').textContent;
    expect(totalDisplayed).toBe(expectedTotal.toFixed(2));
});

// Updating total price after product's quantity modification test
test("Le prix total est mis à jour après modification de la quantité", () => {
    const setQuantity = (index, value) => {
        const input = document.querySelectorAll('.quantity-input')[index];
        input.value = String(value);
        input.dispatchEvent(new Event('input', { bubbles: true }));
    };

    setQuantity(0, 3);   // Lait
    setQuantity(2, 2);   // Beurre
  
    const expectedTotal =
      2.52 * 3 +
      3.59 * 1 + 
      3.09 * 2 +
      4.31 * 1;
  
    const totalDisplayed = document.querySelector('#total-price').textContent;
    expect(totalDisplayed).toBe(expectedTotal.toFixed(2));
});

// Deleting product from shopping list test
test("Un produit est supprimé au clic sur son bouton", () => {
    const deleteButton = document.querySelector('button[data-index="1"]');  // Tomate
    deleteButton.click();
  
    const tableItems = document.querySelectorAll("#cart-items tr");
  
    expect(tableItems).toHaveLength(3);
  
    const names = Array.from(tableItems).map(row => row.querySelector("td").textContent);
    expect(names).not.toContain("Tomate");
});