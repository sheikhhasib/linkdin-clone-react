import * as firebase from "firebase/app";
import "firebase/auth";


export const createSignInWithEmailAndPassword = (name, email, password) => {
    console.log(name,email,password);
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res =>{
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        updateUserName(name);
        // return newUserInfo;
        console.log(newUserInfo);
      })
      .catch((error) => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
      });
}

export const signInwithEmailAndPassword = (email,password) =>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res =>{
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        return newUserInfo;
      })
      .catch((error) => {
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
      });
}

const updateUserName = name =>{
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name,
    }).then(() =>{
      console.log('user name updated successfully');
    }).catch(function(error) {
      console.log(error);
    });
  }