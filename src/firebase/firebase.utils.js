import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyA2bV2OwTOzkNfcyWc1EBlJuabvgKFiUDg',
  authDomain: 'clothing-store-db-208c2.firebaseapp.com',
  projectId: 'clothing-store-db-208c2',
  storageBucket: 'clothing-store-db-208c2.appspot.com',
  messagingSenderId: '368359101591',
  appId: '1:368359101591:web:2eeb76b54689ec84bf45d2',
  measurementId: 'G-QPGC087VBP'
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
