export const addItemsCount = (items, domTarget) => {
  document.querySelector(domTarget).innerHTML = `${items.length} produits`;
};

export const addProductCard = (item, domTarget) => {
  const card = document.createElement("article");
  card.className =
    "col-span-3 bg-white border-grey-300 p-4 rounded-lg shadow-lg";

  const name = document.createElement("h3");
  name.textContent = item.name;
  name.className = "text-lg font-semibold text-gray-800";

  const price = document.createElement("p");
  price.textContent = `${item.unit_price} €`;
  price.className = "text-gray-600 mt-2";

  const quantity = document.createElement("p");
  quantity.textContent = `Quantité en stock : ${item.available_quantity}`;
  quantity.className = "text-gray-600 mt-2";

  const cta = document.createElement("button");
  cta.textContent = "Ajouter au panier";
  cta.setAttribute("id", "add-to-cart-button");
  cta.className =
    "py-1 px-4 mt-2 bg-purple-700 text-white rounded-sm cursor-pointer";

  cta.addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart.some((cartItem) => cartItem.name === item.name)) {
      cart.push({ ...item, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  });

  card.appendChild(name);
  card.appendChild(quantity);
  card.appendChild(price);
  card.appendChild(cta);

  domTarget.appendChild(card);
};

export const renderItems = (itemsList,itemsContainer) => {
  itemsContainer.innerHTML = "";
  addItemsCount(itemsList, "#items-count");
  itemsList.forEach((item) => addProductCard(item, itemsContainer));
};

export const sortItems = (items, criteria) => {
  const sorted = [...items];
  if (criteria === 'name') {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  } 
  else if (criteria === 'unit_price') {
    sorted.sort((a, b) => a.unit_price - b.unit_price);
  }
  return sorted;
};