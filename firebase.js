import { initializeApp } from "firebase/app";
import { 
  createUserWithEmailAndPassword, 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { 
  collection, 
  getFirestore, 
  addDoc 
} from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';


const firebaseConfig = {
  apiKey: "AIzaSyBDut2lLXmyCf6kccW-YRevWSqUx__vxNI",
  authDomain: "chefstream-9035e.firebaseapp.com",
  projectId: "chefstream-9035e",
  storageBucket: "chefstream-9035e.firebasestorage.app",
  messagingSenderId: "465514684696",
  appId: "1:465514684696:web:026d8ee3afd68662b63e6d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// SIGNUP
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

  } catch (error) {
    console.error(error);
    toast.error(
        error.code
        .split('/')[1]
        .replace(/-/g, ' ')
    );
  }
};

// LOGIN
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    toast.error(
        error.code
        .split('/')[1]
        .replace(/-/g, ' ')
    );
  }
};

// LOGOUT
const logout = () => signOut(auth);

export { auth, db, login, signup, logout };
