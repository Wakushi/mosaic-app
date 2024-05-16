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


export const getArtworksByClientAddress = async (clientAddress: string): Promise<Artwork[]> => {
  try {
    const snapshot = await adminDb.collection('artworks').where('clientAddress', '==', clientAddress).get();
    const artworks: Artwork[] = [];
    snapshot.forEach((doc) => {
      artworks.push({ id: doc.id, ...doc.data() } as Artwork);
    });
    return artworks;
  } catch (error) {
    console.error('Error getting artworks:', error);
    throw new Error('Failed to get artworks');
  }
};

export const isUserRegistered = async (clientAddress: string) => {
  try {
    const snapshot = await adminDb.collection('users').where('clientAddress', '==', clientAddress).get();
    return snapshot.empty;
  } catch (error) {
    console.error('Error checking user registration:', error);
    throw new Error('Failed to check user registration');
  }
};
