import { updateCartCount } from "./shopping-list-modal.js";

export function addToShoppingList(record) {
  const list = JSON.parse(localStorage.getItem('shoppingList')) || [];

  const exists = list.some(item => item.id === record.id);

  if (!exists) {
    list.push({
      id: record.id,
      name: record.name,
      price: record.price,
      // image: `./images/${product.image},`,
      image: record.image,
      store: record.store
    });
    localStorage.setItem('shoppingList', JSON.stringify(list));
    alert('Record added to your shopping list!');
  } else {
    alert('This record is already in your shopping list!');
  }
  updateCartCount();
}

export function getShoppingList() {
  return JSON.parse(localStorage.getItem('shoppingList')) || [];
}

export function removeFromShoppingList(recordId) {
  let list = getShoppingList();
  list = list.filter(item => item.id !== recordId);
  localStorage.setItem('shoppingList', JSON.stringify(list));
  updateCartCount();
}

export function clearShoppingList() {
  localStorage.removeItem('shoppingList');
  updateCartCount();
}

export function addToComparison(recordId) {
  let list = JSON.parse(localStorage.getItem('comparisonList')) || [];
  if (list.includes(recordId)) return;

  if (list.length >= 3) {
    alert('You can compare up to 3 records at a time.');
    return;
  }

  list.push(recordId);
  localStorage.setItem('comparisonList', JSON.stringify(list));
}