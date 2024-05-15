import { adminDb } from '@/firebase-admin'; 
import { Client } from '@/types/client'; 
import { Artwork } from '@/types/artwork';

export const addClient = async (clientData: Client): Promise<void> => {
  try {
    await adminDb.collection('users').add(clientData);
    console.log('Client added successfully');
  } catch (error) {
    console.error('Error adding client:', error);
    throw new Error('Failed to add client');
  }
};

export const addArtwork = async (artworkData: Omit<Artwork, 'id'>): Promise<void> => {
	try {
	  await adminDb.collection('artworks').add(artworkData);
	  console.log('Artwork added successfully');
	} catch (error) {
	  console.error('Error adding artwork:', error);
	  throw new Error('Failed to add artwork');
	}
  };