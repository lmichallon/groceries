import "./style.css";
import { addItemsCount, addProductCard, renderItems, sortItems } from "./utils";

const fetchItems = async () => {
  try {
    const response = await fetch("/mock/items.json");

    return await response.json();
  } catch (error) {
    return { error };
  }
};

let items = await fetchItems();
const itemsContainer = document.querySelector("#items-container");
const filterSelect = document.querySelector("#filter-select");

filterSelect.addEventListener("change", (event) => {
  const value = event.target.value;
  const sortedItems = sortItems(items, value);
  renderItems(sortedItems, itemsContainer);
});

renderItems(items, itemsContainer);
