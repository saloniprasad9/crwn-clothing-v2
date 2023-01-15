import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import { auth, signInWithGooglePopup , createUserDocumentFromAuth , signInWithGoogleRedirect  } from '../../utils/firebase/firebase.utils';

const SignIn = () => {
    useEffect( () => {
        const response =  getRedirectResult(auth);
        console.log(response);

        if(response){
            const userDocRef =  createUserDocumentFromAuth(response.user);
        }

    },[]);
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    

    return (
        <div>
            <h1>
                Sign In Page
            </h1>
            <button onClick={logGoogleUser}>
                Sign In With Google Popup 
            </button>
            <button onClick={signInWithGoogleRedirect}>
                Sign In With Google Redirect 
            </button>
        </div>
    );
}

export default SignIn;