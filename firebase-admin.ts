import * as admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    console.log("Initializing Firebase Admin");
    console.log("Project ID:", process.env.FIREBASE_PROJECT_ID);
    console.log("Client Email:", process.env.FIREBASE_CLIENT_EMAIL);
    console.log("Private Key:", process.env.FIREBASE_PRIVATE_KEY);

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  } catch (error: any) {
    console.log("Firebase admin initialization error", error.stack);
  }
}

export { admin };
export const adminDb = admin.firestore();
