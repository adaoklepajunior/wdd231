// sellers.js
import { fetchRecords, saveRecord } from './record_offer.js';
import { showRecordModal, setupModalCloseEvents } from './modal.js';
import { setupShoppingListModal, updateCartCount } from './shopping-list-modal.js';

// DOM Elements
const recordForm = document.getElementById('recordForm');
const retailerRecords = document.getElementById('retailerRecords');
const successModal = document.getElementById('successModal');
const currentYearElement = document.getElementById('currentYear');

setupModalCloseEvents(successModal);

// Load seller's products
async function loadRetailerRecords() {
    try {
        const records = await fetchRecords();
        const storeName = "";

        const storeRecords = records.filter(record => record.store === storeName);

        if (storeRecords.length === 0) {
            retailerRecords.innerHTML = '<p>Login to see more details.</p>';
        } else {
            retailerRecords.innerHTML = storeRecords.map(record => `
                <div class="record-item">
                    <h3>${record.name}</h3>
                    <p><strong>Price:</strong> $${record.price.toFixed(2)}</p>
                    <p><strong>Category:</strong> ${record.category}</p>
                    <p><strong>Last Updated:</strong> ${record.lastUpdated || 'N/A'}</p>
                    <button class="edit-btn" data-id="${record.id}">Edit</button>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading products:', error);
        retailerRecords.innerHTML = '<p>An error happened. Please try again.</p>';
    }
}

// Form submit handler
recordForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newRecord = {
        id: Date.now(),
        name: document.getElementById('recordName').value,
        price: parseFloat(document.getElementById('recordPrice').value),
        store: document.getElementById('recordStore').value,
        category: document.getElementById('recordCategory').value,
        image: document.getElementById('recordImage').value,
        description: document.getElementById('recordDescription').value,
        featured: document.getElementById('recordFeatured').checked,
        lastUpdated: new Date().toISOString().split('T')[0]
    };

    try {
        await saveRecord(newRecord);
        showRecordModal(successModal, 'Success!', `${newRecord.name} has been added to your records.`);
        recordForm.reset();
        loadRetailerRecords();
    } catch (error) {
        console.error('Error saving record:', error);
        showRecordModal(successModal, 'Error', 'Record not added. Please try again.');
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', () =>{
  loadRetailerRecords();
  setupShoppingListModal();
  updateCartCount();
})