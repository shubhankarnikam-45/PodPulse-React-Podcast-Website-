// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import { getAuth } from "firebase/auth";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC6_IP8KJ0_HoPSRvfE8ewmcT5BFBO8kc4",
//   authDomain: "podcast-app-react-rec.firebaseapp.com",
//   projectId: "podcast-app-react-rec",
//   storageBucket: "podcast-app-react-rec.appspot.com",
//   messagingSenderId: "612131373029",
//   appId: "1:612131373029:web:e788fc87ba5ff7b070390c",
//   measurementId: "G-JP4M5GCV85",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const db = getFirestore(app);
// const storage = getStorage(app);
// const auth = getAuth(app);

// export { auth, db, storage };




//new firebase file

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore , Timestamp} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// import firebase from "firebase/compat/app";
// import 'firebase/firestore'; // Import Firestore if you're using it
// const { getAuth } = require('firebase-admin/auth');
// const { initializeApp } = require('firebase-admin/app');
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6dd0ftbfN_sZbYwVjuf3ZkdH-5RzCJDI",
  authDomain: "podcast-website-react.firebaseapp.com",
  projectId: "podcast-website-react",
  storageBucket: "podcast-website-react.appspot.com",
  messagingSenderId: "627010605655",
  appId: "1:627010605655:web:d3ff1e6d67a04a66f78912",
  measurementId: "G-LRVE6M8DK2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, db, storage , Timestamp};