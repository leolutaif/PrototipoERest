// src/firebase-config.js
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDHZd8Mw7qC2lhf1DKdGx0QOjU2pzwRpBM",
    authDomain: "e-restituicao.firebaseapp.com",
    projectId: "e-restituicao",
    storageBucket: "e-restituicao.appspot.com",
    messagingSenderId: "869561750714",
    appId: "1:869561750714:web:d9b5357bf5975358129e83"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, ref, uploadBytes, getDownloadURL };
