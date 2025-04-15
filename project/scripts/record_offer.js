export async function fetchRecords() {
    try {
      const response = await fetch('data/records.json');
      if (!response.ok) throw new Error('Network error');
      return await response.json();
    } catch (err) {
      console.error('Error fetching records:', err);
      return [];
    }
  }
  
  export async function saveRecord(newRecord) {
    try {
        console.log('Saving record:', newRecord);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return true;
    } catch (error) {
        console.error('Error saving record:', error);
        throw error;
    }
  }