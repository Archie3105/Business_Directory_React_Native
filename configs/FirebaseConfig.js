// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,  } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCp_Z-nypQlKIEa462UntYvMN5ql2W2X_s",
  authDomain: "business-directory-e8410.firebaseapp.com",
  projectId: "business-directory-e8410",
  storageBucket: "business-directory-e8410.appspot.com",
  messagingSenderId: "766977647020",
  appId: "1:766977647020:web:74c8802d566bcb31081a09"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)


