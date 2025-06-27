// FirestoreService.js

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    serverTimestamp,
  } from "firebase/firestore";
  
  import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
  } from "firebase/storage";
  
  import { initializeApp } from "firebase/app";
  import { getAnalytics } from "firebase/analytics";
  
  // --- Firebase config ---
  const firebaseConfig = {
    apiKey: "AIzaSyBwTqT7jCQid2AhR2__5AU8LRb9Z-SX_I8",
    authDomain: "reclaimit-b82a0.firebaseapp.com",
    projectId: "reclaimit-b82a0",
    storageBucket: "reclaimit-b82a0.appspot.com",
    messagingSenderId: "65748355401",
    appId: "1:65748355401:web:4f164fd90691b4eeadb298",
    measurementId: "G-R1NWHYB57H"
  };
  
  // --- Initialize Firebase ---
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);
  const storage = getStorage(app);
  
  class FirestoreService {
    constructor() {
      this.collectionRef = collection(db, "foundItems");
    }
  
    // CREATE: Add a new found item with image
    async addFoundItem(data, imageFile) {
      const docRef = await addDoc(this.collectionRef, {
        ...data,
        status: "open",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
  
      // Upload image to storage
      if (imageFile) {
        const storageRef = ref(storage, `items/${docRef.id}`);
        await uploadBytes(storageRef, imageFile);
        const imageUrl = await getDownloadURL(storageRef);
        await updateDoc(docRef, { imageUrl });
      }
  
      return docRef.id;
    }
  
    // READ: Get all open found items (optional filter by location)
    async getFoundItems(location = "") {
      let q = query(this.collectionRef, where("status", "==", "open"), orderBy("createdAt", "desc"));
      if (location.trim() !== "") {
        q = query(
          this.collectionRef,
          where("status", "==", "open"),
          where("location", "==", location),
          orderBy("createdAt", "desc")
        );
      }
  
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }
  
    // READ: Get one item by ID
    async getItemById(id) {
      const docSnap = await getDoc(doc(db, "foundItems", id));
      return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
    }
  
    // UPDATE: Mark item as claimed or update info
    async updateItem(id, updates) {
      updates.updatedAt = serverTimestamp();
      await updateDoc(doc(db, "foundItems", id), updates);
    }
  
    // DELETE: Delete item and its image
    async deleteItem(id) {
      const docRef = doc(db, "foundItems", id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return;
  
      const data = docSnap.data();
      if (data.imageUrl) {
        const imageRef = ref(storage, `items/${id}`);
        await deleteObject(imageRef);
      }
  
      await deleteDoc(docRef);
    }
  }
  
  export default new FirestoreService();
  