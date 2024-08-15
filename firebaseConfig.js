import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "ENTER_YOUR_OWN_API_KEY",
  authDomain: "form-authentication-5cf22.firebaseapp.com",
  projectId: "form-authentication-5cf22",
  storageBucket: "form-authentication-5cf22.appspot.com",
  messagingSenderId: "701947966529",
  appId: "1:701947966529:web:a20c94a602d3ff040882c0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export { firebaseConfig };
