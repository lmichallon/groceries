"use strict";

import { renderItems, sortItems } from '../utils.js';

const mockProductsList = [
    { id: 1, name: "Pomme", available_quantity: 29, unit_price: 12.74 },
    { id: 2, name: "Banane", available_quantity: 172, unit_price: 14.73 },
    { id: 3, name: "Carotte", available_quantity: 171, unit_price: 15.84 },
    { id: 4, name: "Lait", available_quantity: 56, unit_price: 2.52 },
    { id: 5, name: "Pain", available_quantity: 81, unit_price: 14.41 },
    { id: 6, name: "Riz", available_quantity: 118, unit_price: 22.38 },
    { id: 7, name: "Pâtes", available_quantity: 124, unit_price: 9.7 },
    { id: 8, name: "Tomate", available_quantity: 104, unit_price: 3.59 },
    { id: 9, name: "Oignon", available_quantity: 94, unit_price: 4.31 },
    { id: 10, name: "Ail", available_quantity: 106, unit_price: 17.38 },
    { id: 11, name: "Poulet", available_quantity: 79, unit_price: 13.59 },
    { id: 12, name: "Boeuf", available_quantity: 86, unit_price: 8.25 },
    { id: 13, name: "Jambon", available_quantity: 132, unit_price: 4.51 },
    { id: 14, name: "Yaourt", available_quantity: 190, unit_price: 7.84 },
    { id: 15, name: "Fromage", available_quantity: 44, unit_price: 10.39 },
    { id: 16, name: "Beurre", available_quantity: 164, unit_price: 3.09 },
    { id: 17, name: "Œufs", available_quantity: 130, unit_price: 12.73 },
    { id: 18, name: "Farine", available_quantity: 71, unit_price: 19.87 },
    { id: 19, name: "Sucre", available_quantity: 64, unit_price: 12.59 },
    { id: 20, name: "Sel", available_quantity: 199, unit_price: 0.7 },
    { id: 21, name: "Poivre", available_quantity: 39, unit_price: 21.62 },
    { id: 22, name: "Thé", available_quantity: 161, unit_price: 10.56 }      
];

let itemsContainer;

beforeEach(() => {
  document.body.innerHTML = `
    <span id="items-count"></span>
    <div id="items-container"></div>
  `;

  itemsContainer = document.querySelector('#items-container');
  renderItems(mockProductsList, itemsContainer);
});

// Getting & displaying products test
test('Tous les produits sont bien affichés', () => {
  const items = itemsContainer.querySelectorAll("article");
  expect(items).toHaveLength(22);
});

// Counting products test
test('Le compteur de produits est correct', () => {
  const numberCounter = document.querySelector('#items-count');
  expect(numberCounter.textContent).toBe("22 produits");
});

// Alphabetic filtering products test
test('Le tri par ordre alphabétique fonctionne bien', () => {
  const sorted = sortItems(mockProductsList, 'name');
  renderItems(sorted, itemsContainer);

  const listArticles = itemsContainer.querySelectorAll("article");
  const listArticlesLength = listArticles.length; 
  const firstItemName = listArticles[0].querySelector('h3')?.textContent;
  const lastItemName = listArticles[listArticlesLength - 1].querySelector('h3')?.textContent;

  expect(firstItemName).toBe("Ail");
  expect(lastItemName).toBe("Yaourt");
});

// Price filtering products test
test('Le tri par prix fonctionne bien', () => {
  const sorted = sortItems(mockProductsList, 'unit_price');
  renderItems(sorted, itemsContainer);

  const listArticles = itemsContainer.querySelectorAll("article");
  const listArticlesLength = listArticles.length; 
  const firstItemName = listArticles[0].querySelector('h3')?.textContent;
  const lastItemName = listArticles[listArticlesLength - 1].querySelector('h3')?.textContent;

  expect(firstItemName).toBe("Sel");
  expect(lastItemName).toBe("Riz");
});