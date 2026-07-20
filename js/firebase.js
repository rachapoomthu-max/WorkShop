import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB1m5GHlKvqAf0WYh3jHTgxRu_J2aEGX4k",
  authDomain: "e-com-6b74f.firebaseapp.com",
  projectId: "e-com-6b74f",
  storageBucket: "e-com-6b74f.firebasestorage.app",
  messagingSenderId: "516523845053",
  appId: "1:516523845053:web:792d38bf400bec51e05ed4",
  measurementId: "G-H90Y6C54Y5",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
