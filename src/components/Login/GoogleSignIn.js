import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";


export const initializeLoginFramework = () =>{
    if(firebase.apps.length === 0 ){
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .then(res => {
        const {displayName,email,photoURL} = res.user;
        const SignnedInUser = {
            isSignedIn: true,
            name: displayName,
            email: email,
            photo: photoURL,
            success: true
          }
        return SignnedInUser;

      }).catch(function(error) {
        console.log(error);
        console.log(error.message);
      });
}