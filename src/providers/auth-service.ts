import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import { LoginPage } from '../pages/login/login';
import { GooglePlus } from '@ionic-native/google-plus';
import { Platform } from 'ionic-angular';

@Injectable()
export class AuthService {
private user: firebase.User;
    gplus: any;
    fireauth = firebase.auth();
  userProfile: any = null;
  name:string = null;

  
constructor(public afAuth: AngularFireAuth,public googlePlus: GooglePlus,public platform : Platform) {

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
    return this.user.updateProfile({
    displayName: displayName,
    photoURL: photoURL
    });
    }
    }

   //Google Login 
    // googleLogin() {
    //     var provider = new firebase.auth.GoogleAuthProvider();

    //     provider.addScope('https://www.googleapis.com/auth/plus.login');
        
    //     firebase.auth().signInWithRedirect(provider);
        
    //     firebase.auth().getRedirectResult().then(function(authData) {
    //         console.log(authData);
    //     }).catch(function(error) {
    //         console.log(error);
    //     });
    // }

 signInWithGoogle() {
		console.log('Sign in with google');
		return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
}

 private oauthSignIn(provider: AuthProvider) {
	if (!(<any>window).cordova) {
		return this.afAuth.auth.signInWithPopup(provider);
	} else {
		return this.afAuth.auth.signInWithRedirect(provider)
		.then(() => {
			return this.afAuth.auth.getRedirectResult().then( result => {
				// This gives you a Google Access Token.
				// You can use it to access the Google API.
				let token = result.credential.providerId;
				// The signed-in user info.
				let user = result.user;
				console.log(token, user);
			}).catch(function(error) {
				// Handle Errors here.
				alert(error.message);
			});
		});
	}
}
    
 

  }

  
  
     


    
	
	
