import { fetchRecords } from './record_offer.js';
import { showRecordModal, setupModalCloseEvents } from './modal.js';
import { setupShoppingListModal, updateCartCount } from './shopping-list-modal.js';

async function displayFeaturedRecords() {
  const allRecords = await fetchRecords();
  const featured = allRecords.filter(p => p.featured);

  const randomDeals = [];
  while (randomDeals.length < 3 && featured.length > 0) {
    const index = Math.floor(Math.random() * featured.length);
    randomDeals.push(featured.splice(index, 1)[0]);
  }

  const container = document.getElementById('featuredRecords');
  if (randomDeals.length === 0) {
    container.innerHTML = '<p>Album not available at the moment.</p>';
    return;
  }

  container.innerHTML = randomDeals.map(record => `
    <div class="record-card" data-id="${record.id}">
      <img src="images/${record.image}" alt="${record.name}" loading="lazy">
      <div class="product-info">
        <h4>${record.name}</h4>
        <p class="price">$${record.price.toFixed(2)}</p>
        <p class="store">${record.store}</p>
        <button class="view-details">View Details</button>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.record-card').forEach(card => {
    card.addEventListener('click', e => {
      if (!e.target.classList.contains('view-details')) return;
      const id = parseInt(card.dataset.id);
      showRecordModal(id);
    });
  });
}

document.addEventListener('DOMContentLoaded', () =>{
  displayFeaturedRecords();
  setupModalCloseEvents();
  setupShoppingListModal();
  updateCartCount();
});