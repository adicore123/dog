import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCYf6t9qc86muGYy8oA0XYXqWhAyUvSd4c",
  authDomain: "polajoy-live-db-2026.firebaseapp.com",
  projectId: "polajoy-live-db-2026",
  storageBucket: "polajoy-live-db-2026.firebasestorage.app",
  messagingSenderId: "589501664383",
  appId: "1:589501664383:web:97d0d76cb51a3ef2f0034a",
  databaseURL: "https://polajoy-live-db-2026-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
