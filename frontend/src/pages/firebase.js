// firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database'; 
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase Storage

const firebaseConfig = {
    apiKey: "AIzaSyCATdObIuUkGL4d5VzvQbXyq5KSn5dQaLE",
    authDomain: "deep-78d9b.firebaseapp.com",
    projectId: "deep-78d9b",
    storageBucket: "deep-78d9b.appspot.com",
    messagingSenderId: "822884636450",
    appId: "1:822884636450:web:9b4fa262745b89ef99f77b"
  };
  

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const storage = getStorage(app); // Initialize Firebase Storage

export { database, storage };
