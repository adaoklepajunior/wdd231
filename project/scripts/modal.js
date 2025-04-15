import { fetchRecords } from './record_offer.js';
import { addToShoppingList } from './storage.js';

const modal = document.getElementById('recordModal');
const modalRecordName = document.getElementById('modalRecordName');
const modalRecordDetails = document.getElementById('modalRecordDetails');

export async function showRecordModal(recordId) {
  const records = await fetchRecords();
  const record = records.find(p => p.id === recordId);
  if (!record) return;

  modalRecordName.textContent = record.name;
  modalRecordDetails.innerHTML = `
    <img src="images/${record.image}" alt="${record.name}" loading="lazy">
    <p><strong>Price:</strong> $${record.price.toFixed(2)}</p>
    <p><strong>Store:</strong> ${record.store}</p>
    <p><strong>Category:</strong> ${record.category}</p>
    <p><strong>Description:</strong> ${record.description}</p>
    <button class="add-to-list" data-id="${record.id}">Add to Shopping List</button>
  `;

  modal.style.display = 'block';

  document.querySelector('.add-to-list').addEventListener('click', () => {
    addToShoppingList(recordId);
  });
}

// Close modal
export function setupModalCloseEvents() {
  const closeModal = document.querySelector('.close-modal');

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}