import { adminDb } from "@/firebase-admin";
import { Client } from "@/types/client";
import { Artwork } from "@/types/artwork";

export const addClient = async (clientData: Client): Promise<void> => {
  try {
    await adminDb.collection("users").add(clientData);
    console.log("Client added successfully");
  } catch (error) {
    console.error("Error adding client:", error);
    throw new Error("Failed to add client");
  }
};

export const getUserByAddress = async (address: string) => {
  const userRef = adminDb.collection('users').where('address', '==', address);
  const snapshot = await userRef.get();

  if (snapshot.empty) {
    return null;
  }

  const user = snapshot.docs[0].data();
  return user;
};

export const addArtwork = async (
  artworkData: Omit<Artwork, "id">
): Promise<void> => {
  try {
    await adminDb.collection("artworks").add(artworkData);
    console.log("Artwork added successfully");
  } catch (error) {
    console.error("Error adding artwork:", error);
    throw new Error("Failed to add artwork");
  }
};

export const getArtworksByClientAddress = async (
  clientAddress: string
): Promise<Artwork[]> => {
  try {
    const snapshot = await adminDb
      .collection("artworks")
      .where("clientAddress", "==", clientAddress)
      .get();
    const artworks: Artwork[] = [];
    snapshot.forEach((doc) => {
      artworks.push({ id: doc.id, ...doc.data() } as Artwork);
    });
    return artworks;
  } catch (error) {
    console.error("Error getting artworks:", error);
    throw new Error("Failed to get artworks");
  }
};

export const getAllArtworks = async (): Promise<Artwork[]> => {
  try {
    const snapshot = await adminDb.collection("artworks").get();
    const artworks: Artwork[] = [];
    snapshot.forEach((doc) => {
      artworks.push({ id: doc.id, ...doc.data() } as Artwork);
    });
    return artworks;
  } catch (error) {
    console.error("Error getting all artworks:", error);
    throw new Error("Failed to get all artworks");
  }
};

export const addHashData = async (
  clientAddress: string,
  title: string,
  hashReport: string,
  hashArtwork: string,
  hashCertificate: string 
): Promise<void> => {
  try {
    await adminDb.collection("hash").add({
      clientAddress,
      title,
      hashReport,
      hashArtwork,
      hashCertificate, 
      createdAt: Date.now(),
    });
    console.log("Hash data added successfully");
  } catch (error) {
    console.error("Error adding hash data:", error);
    throw new Error("Failed to add hash data");
  }
};

export const getHashesByTitle = async (title: string): Promise<{ hashArtwork: string, hashReport: string, hashCertificate: string } | null> => {
  try {
    const snapshot = await adminDb.collection("hash").where("title", "==", title).limit(1).get();
    if (snapshot.empty) {
      return null;
    }
    const data = snapshot.docs[0].data();
    return {
      hashArtwork: data.hashArtwork,
      hashReport: data.hashReport,
      hashCertificate: data.hashCertificate, 
    };
  } catch (error) {
    console.error("Error getting hashes:", error);
    throw new Error("Failed to get hashes");
  }
};



export const updateArtworkStatus = async (title: string, status: string): Promise<void> => {
  try {
    const snapshot = await adminDb.collection('artworks').where('title', '==', title).limit(1).get();
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      await adminDb.collection('artworks').doc(doc.id).update({ status });
      console.log('Artwork status updated successfully');
    } else {
      console.error('Artwork not found');
      throw new Error('Artwork not found');
    }
  } catch (error) {
    console.error('Error updating artwork status:', error);
    throw new Error('Failed to update artwork status');
  }
};

export const updateArtworkTokenizationRequest = async (artworkTitle: string, tokenizationRequestId: string) => {
  try {
    const artworkRef = adminDb.collection('artworks').where('title', '==', artworkTitle).limit(1);
    const snapshot = await artworkRef.get();

    if (snapshot.empty) {
      throw new Error(`Artwork with title ${artworkTitle} not found`);
    }

    const artworkDoc = snapshot.docs[0];
    await artworkDoc.ref.update({ tokenizationRequestId });
    return true;
  } catch (error) {
    console.error("Error updating artwork:", error);
    throw new Error("Failed to update artwork");
  }
};