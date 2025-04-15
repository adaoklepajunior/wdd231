import { fetchRecords } from './record_offer.js';
import { showRecordModal, setupModalCloseEvents } from './modal.js';
import { addToComparison } from './storage.js';
import { setupShoppingListModal, updateCartCount } from './shopping-list-modal.js';

const container = document.getElementById('allRecords');
const categoryFilter = document.getElementById('categoryFilter');
const storeFilter = document.getElementById('storeFilter');
const sortBy = document.getElementById('sortBy');
const search = new URLSearchParams(window.location.search).get('search') || '';

async function displayAllRecords() {
  let records = await fetchRecords();

  // Filters
  if (search) {
    records = records.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (categoryFilter.value)
    records = records.filter(p => p.category === categoryFilter.value);

  if (storeFilter.value)
    records = records.filter(p => p.store === storeFilter.value);

  switch (sortBy.value) {
    case 'price-asc': records.sort((a, b) => a.price - b.price); break;
    case 'price-desc': records.sort((a, b) => b.price - a.price); break;
    case 'name-asc': records.sort((a, b) => a.name.localeCompare(b.name)); break;
    case 'name-desc': records.sort((a, b) => b.name.localeCompare(a.name)); break;
  }

  if (!records.length) {
    container.innerHTML = '<p>No records found.</p>';
    return;
  }

  container.innerHTML = records.map(p => `
    <div class="record-card" data-id="${p.id}">
      <img src="images/${p.image}" alt="${p.name}" loading="lazy">
      <h3>${p.name}</h3>
      <p class="price">$${p.price.toFixed(2)}</p>
      <p class="store">${p.store}</p>
      <p class="category">${p.category}</p>
      <button class="view-details">View Details</button>
      <button class="compare-btn" data-id="${p.id}">Compare</button>
    </div>
  `).join('');

  document.querySelectorAll('.view-details').forEach(btn =>
    btn.addEventListener('click', e =>
      showRecordModal(parseInt(e.target.closest('.record-card').dataset.id))
    )
  );

  document.querySelectorAll('.compare-btn').forEach(btn =>
    btn.addEventListener('click', e =>
      addToComparison(parseInt(e.target.dataset.id))
    )
  );
}

categoryFilter.addEventListener('change', displayAllRecords);
storeFilter.addEventListener('change', displayAllRecords);
sortBy.addEventListener('change', displayAllRecords);

document.addEventListener('DOMContentLoaded', () =>{
    displayAllRecords();
    setupModalCloseEvents();
    setupShoppingListModal();
    updateCartCount();
  });