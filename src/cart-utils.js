"use strict";

export const renderCart = (cart, cartItemsContainer) => {
    cartItemsContainer.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
      const itemTotal = item.unit_price * item.quantity;
      total += itemTotal;
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="p-2">${item.name}</td>
        <td class="p-2">${item.unit_price} €</td>
        <td class="p-2 text-center">
          <input type="number" class="quantity-input border p-1 w-16 text-center" data-index="${index}" value="${
        item.quantity
      }" min="1">
        </td>
        <td class="p-2">${itemTotal.toFixed(2)} €</td>
        <td class="p-2 text-center">
          <button class="bg-purple-700 text-white px-3 py-1 rounded" data-index="${index}">Supprimer</button>
        </td>
      `;
      cartItemsContainer.appendChild(row);
    });
  
    const totalPriceElement = document.querySelector("#total-price");
    totalPriceElement.textContent = total.toFixed(2);
  };