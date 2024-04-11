import prisma from './client';

async function deleteAllData() {
    try {
      // Delete all records in ...
    } 
    catch (error) {
      console.error('Error deleting data:', error);
    } 
    finally {
      await $disconnect();
    }
}
  
deleteAllData();