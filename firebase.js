// firebase.js

import {
  initializeApp
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  serverTimestamp
}
from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {

  apiKey: "AIzaSyDg0vFZwgUnb1Cjer7w-wb95_YjG8MDw54",

  authDomain: "q3-suv-wave.firebaseapp.com",

  projectId: "q3-suv-wave",

  storageBucket: "q3-suv-wave.firebasestorage.app",

  messagingSenderId: "785277358729",

  appId: "1:785277358729:web:e326909768b69606452c58"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {
  db,
  collection,
  addDoc,
  doc,
  setDoc,
  serverTimestamp
};
