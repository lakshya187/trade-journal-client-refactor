import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBHyHMzvI_K_d2OnUIeKm1ys70UA7QVzuQ",
  authDomain: "trade-journal-ad965.firebaseapp.com",
  projectId: "trade-journal-ad965",
  storageBucket: "trade-journal-ad965.appspot.com",
  messagingSenderId: "524842109130",
  appId: "1:524842109130:web:4904c7bbb00b8e0eb50c33",
  measurementId: "G-C81QV5Y317",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

// appId: "1:155634988332:web:aa4f935769820a60ba6889",
// measurementId: "G-ZQ8XYLX0G4"
