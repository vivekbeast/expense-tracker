// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore} from "firebase/firestore"


// const firebaseConfig = {
//   apiKey: "AIzaSyBXG_LVbDNzlVh6plDEYOYECi0TLh3v7jc",
//   authDomain: "expense-tracker-374f6.firebaseapp.com",
//   projectId: "expense-tracker-374f6",
//   storageBucket: "expense-tracker-374f6.appspot.com",
//   messagingSenderId: "890889791237",
//   appId: "1:890889791237:web:8e84b9800b2b851637796c"
// };
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};





// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);













// firebase login
// firebase init
// firebase deploy