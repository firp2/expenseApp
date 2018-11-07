import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { LoginPage } from '../pages/login/login';
import { GooglePlus } from '@ionic-native/google-plus';
import { Platform } from 'ionic-angular';
import { UserFb } from '../models/userFB';
import { UserFbProvider } from '../providers/user-firebase';


@Injectable()
export class AuthService {
private user: firebase.User;
    gplus: any;
    fireauth = firebase.auth();
  userProfile: any = null;
  name:string = null;
  userFB: UserFb;

  
constructor(public afAuth: AngularFireAuth,public googlePlus: GooglePlus,public platform : Platform,private userFbProvider: UserFbProvider) {

    firebase.auth().onAuthStateChanged( user => {
        if (user){
          this.userProfile = user;
          this.name = this.userProfile.displayName;
        } else { 
          this.userProfile = null; 
        }
      });

    afAuth.authState.subscribe(user => {
this.user = user;
if (user) {
console.log('Email ' + user.email);
console.log('Display ' +
user.displayName);
}
});
}
saveImage(imageData: string, imageUrl: string, contentType:{}) {
    var ref = firebase.storage().ref();
    var photoRef = ref.child(imageUrl);
    return photoRef.putString(imageData, 'base64', { contentType: 'image/jpeg' });
    }
    getDownloadUrl(imageUrl: string) {
    var ref = firebase.storage().ref();
    var photoRef = ref.child(imageUrl);
    return photoRef.getDownloadURL();
    }

getCurrentUserObserver() {
return this.afAuth.authState;
}

getCurrentUser() {
return firebase.auth().currentUser;
}

login(email: string, password: string) {
return this.afAuth.auth.signInWithEmailAndPassword(email,
password);
}

//normal logout
logout(){
    this.afAuth.auth.signOut();
    }

    signup(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email,
    password);
    }

    updateProfile(displayName:string, photoURL:string) {
    this.user = firebase.auth().currentUser;
    if (this.user) {
    console.log('Update profile of ' +
    this.user.email);
      //connect to user table and add the user data there
      

    return this.user.updateProfile({
    displayName: displayName,
    photoURL: photoURL
    });
    }
    }


  }