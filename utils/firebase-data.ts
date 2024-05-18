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

export const isUserRegistered = async (clientAddress: string) => {
  try {
    const snapshot = await adminDb
      .collection("users")
      .where("address", "==", clientAddress)
      .get();
    return !snapshot.empty;
  } catch (error) {
    console.error("Error checking user registration:", error);
    throw new Error("Failed to check user registration");
  }
};

export const isUserAdmin = async (clientAddress: string): Promise<boolean> => {
  try {
    const snapshot = await adminDb
      .collection("users")
      .where("address", "==", clientAddress)
      .limit(1)
      .get();
    if (snapshot.empty) {
      return false;
    }

    const userData = snapshot.docs[0].data();
    return userData.role === "admin";
  } catch (error) {
    console.error("Error checking user role:", error);
    throw new Error("Failed to check user role");
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
  hashArtwork: string
): Promise<void> => {
  try {
    await adminDb.collection("hash").add({
      clientAddress,
      title,
      hashReport,
      hashArtwork,
      createdAt: Date.now(),
    });
    console.log("Hash data added successfully");
  } catch (error) {
    console.error("Error adding hash data:", error);
    throw new Error("Failed to add hash data");
  }
};
