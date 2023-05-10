


import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { 
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection, 
  getDocs
} from "firebase/firestore";

import userImgIcon from "../../assets/img/icons/user.png";


const firebaseConfig = {
  apiKey: "AIzaSyBmJ51QUF0_Ye6CuEvgyVW-jcsSB0G_a4A",
  authDomain: "free-bank-40f39.firebaseapp.com",
  projectId: "free-bank-40f39",
  storageBucket: "free-bank-40f39.appspot.com",
  messagingSenderId: "26739509620",
  appId: "1:26739509620:web:c86dc4af40f445bb108421",
  measurementId: "G-T1DW83WXRB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);




export const createUserDocumentFromAuth = async (userAuth, additionalInformation ) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const { displayName, email} = userAuth;
    const createdAt = new Date();
    const balance = "100";
    const balance_history = [{ type: 'income', value: 100}];
    const userImg = userImgIcon;

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        balance,
        userImg,
        balance_history,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user ', error.message );
    }
  }
  // console.log(userDocRef);
  console.log(userSnapshot);
  return userDocRef;
};


export const getDb = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // const displayName = docSnap.data().displayName;
    // return displayName
    const response = docSnap.data();
    return response;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}


export const updateDb = async (uid, update) => {
  const docRef = doc(db, "users", uid);
  
  await updateDoc(docRef, update);
}


export const getAllUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  const users = [];

  querySnapshot.forEach((doc) => {
    // console.log(doc.data());
    const user = doc.data();
    users.push(user);
    
  });
  return users;
}







export const createAuthUserWithEmailAndPassword = async (email, password) => {

  return await createUserWithEmailAndPassword(auth, email, password);
}





