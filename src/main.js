import "./style.css";
import { addItemsCount, addProductCard } from "./utils";

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

const renderItems = (itemsList) => {
  itemsContainer.innerHTML = "";
  addItemsCount(itemsList, "#items-count");
  itemsList.forEach((item) => addProductCard(item, itemsContainer));
};

filterSelect.addEventListener("change", (event) => {
  const value = event.target.value;
  let sortedItems = [...items];

  if (value === "name") {
    sortedItems.sort((a, b) => a.name.localeCompare(b.name));
  } else if (value === "unit_price") {
    sortedItems.sort((a, b) => a.unit_price - b.unit_price);
  }

  renderItems(sortedItems);
});

renderItems(items);
