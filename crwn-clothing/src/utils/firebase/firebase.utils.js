import { initializeApp } from 'firebase/app';
import { getAuth , signInWithRedirect , signInWithPopup , GoogleAuthProvider , createUserWithEmailAndPassword} from 'firebase/auth';
import { getFirestore , doc , getDoc , setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD-OEP9SIWewnzIkJi59CjspSRvlOgo8Lg",
    authDomain: "crwn-clothing-db-a7a25.firebaseapp.com",
    projectId: "crwn-clothing-db-a7a25",
    storageBucket: "crwn-clothing-db-a7a25.appspot.com",
    messagingSenderId: "960879007910",
    appId: "1:960879007910:web:f34a9749d0980c77e03c67"
};
  

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>  signInWithPopup(auth,provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async(
    userAuth,
    additionalInformation = {}
    ) => {
    if(!userAuth)return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const { displayName , email } = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef , {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log("error creating a user" , error.message);
        }
    };

    return userDocRef;
};


export const createAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth , email , password);
}

