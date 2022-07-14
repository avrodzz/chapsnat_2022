// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDNznZt9zyyFl-v2S0kvgW9D-RoVzfQACI",
//   authDomain: "chapsnat-d9d54.firebaseapp.com",
//   projectId: "chapsnat-d9d54",
//   storageBucket: "chapsnat-d9d54.appspot.com",
//   messagingSenderId: "819316977374",
//   appId: "1:819316977374:web:dc30249c01b64289df5c4f",
//   measurementId: "G-H2P56M1XLG"
// };

// Your web app's Firebase configuration - Class Config
const firebaseConfig = {
  apiKey: "AIzaSyC7CQwBSzjC_tlEiMd2Mc8Sh9Fb_Cwc1p8",
  authDomain: "chapsnat-3f4f7.firebaseapp.com",
  projectId: "chapsnat-3f4f7",
  storageBucket: "chapsnat-3f4f7.appspot.com",
  messagingSenderId: "239440555368",
  appId: "1:239440555368:web:d7d431a3733e778d273add",
  measurementId: "G-W4Y70B8JL2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default db