import { adminDb } from '@/firebase-admin'; 
import { Client } from '@/types/client'; 

export const addClient = async (clientData: Client): Promise<void> => {
  try {
    await adminDb.collection('users').add(clientData);
    console.log('Client added successfully');
  } catch (error) {
    console.error('Error adding client:', error);
    throw new Error('Failed to add client');
  }
};