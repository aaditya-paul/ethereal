import firebase from "firebase";
require("@firebase/firestore");
const firebaseConfig = {
  apiKey: "AIzaSyD64DxHgXgGJYg0YV9VXUKVYWhWC83Gyuc",
  authDomain: "brulee---the-pet-app-3e423.firebaseapp.com",
  projectId: "brulee---the-pet-app-3e423",
  storageBucket: "brulee---the-pet-app-3e423.appspot.com",
  messagingSenderId: "71410228140",
  appId: "1:71410228140:web:7fe1d993a1101c5e4bf809",
  measurementId: "G-GC2363X445",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export default firebase.firestore();
