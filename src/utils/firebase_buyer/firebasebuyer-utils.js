import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';

import { doc, getDoc, setDoc, getFirestore } from 'firebase/firestore';

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBUSaaHRPS9qvdJqzkdMoRSr1khVXszYBY',
  authDomain: 'cbpmarketplace-4e846.firebaseapp.com',
  projectId: 'cbpmarketplace-4e846',
  storageBucket: 'cbpmarketplace-4e846.appspot.com',
  messagingSenderId: '973684326295',
  appId: '1:973684326295:web:4cf813e51571bd81d00ed2',
};

initializeApp(firebaseConfig);

export const auth = getAuth();

// export const signInWithGooglePopup_Buyer = ()=>signInWithPopup(auth,provider);

export const db = getFirestore();

export const createUserDocumentFromAuth_Buyer = async (
  userAuth,
  additionalInformation = {}
) => {
  const userDocRef = doc(db, 'users_Buyer', userAuth.uid);

  console.log(userAuth.id);

  const userSnapshot = await getDoc(userDocRef);

  console.log(userSnapshot);
  console.log(userSnapshot.exists()); // we are seeing whether data related to that ref is exists or not

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.error('there was an error', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword_Buyer = async (
  email,
  password
) => {
  if (!email || !password) return;

  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword_Buyer = async (
  email,
  password
) => {
  if (!email || !password) return;

  return signInWithEmailAndPassword(auth, email, password);
};
