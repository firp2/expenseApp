import { Component } from '@angular/core';
import { NavController, MenuController, Platform } from 'ionic-angular';
import { Home2Page } from '../home2/home2';
import { User } from '../../models/user';
import { SignupPage } from '../signup/signup';
import { AuthService } from '../../providers/auth-service';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireAuth } from 'angularfire2/auth';
//import AuthProvider = firebase.auth.AuthProvider;
import * as firebase from 'firebase/app';
// import { Facebook } from '@ionic-native/facebook';
import { SocialSharing } from '@ionic-native/social-sharing';
import 'firebase/auth';
// import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AngularFireAuth]
})
export class LoginPage {
  user: User;
  loginError: string;
  displayName: any;
  email: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;

  fireauth = firebase.auth();
  userProfile: any = null;
  name: string = null;

  isLoggedIn: boolean = false;

  constructor(public navCtrl: NavController,
    private auth: AuthService,
    public googlePlus: GooglePlus,
    private menu: MenuController,
    public afAuth: AngularFireAuth,
    public platform: Platform,
    public socialSharing: SocialSharing,
    // public facebook: Facebook,
  ) {
    this.user = new User('', '', '');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userProfile = user;
        this.name = this.userProfile.displayName;
      } else {
        this.userProfile = null;
      }
    });

  }
  // Google SignIn
  loginGoogle() {

    this.googlePlus.login({})
      .then(res => {
        console.log(res);
        this.displayName = res.displayName;
        this.email = res.email;
        this.familyName = res.familyName;
        this.givenName = res.givenName;
        this.userId = res.userId;
        this.imageUrl = res.imageUrl;

        this.isLoggedIn = true;
      })
      .catch(err => console.error(err));

    console.log('Sign in with google');

  }

  // loginWithGoogle() {
  //   this.auth.signInWithGoogle();
  //     }


  //-------//
  goToSignup(params) {
    if (!params) params = {};
    this.navCtrl.push(SignupPage);
  }
  ionViewDidEnter() {
    this.menu.swipeEnable(false);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1');
  }

  login() {
    console.log("username: " + this.user.email);
    console.log("password: " + this.user.password);

    this.auth.login(this.user.email, this.user.password)
      .then(
        () => this.navCtrl.setRoot(Home2Page),
        error => this.loginError = error.message
      );
  }

  //Facebook Login
  // loginFacebook() {
  // if (this.platform.is('cordova')) {
  //   console.log("cordova before facebook login")
  //   return this.facebook.login(['email', 'public_profile']).then(res => {
  //     const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
  //    return firebase.auth().signInWithCredential(facebookCredential);
  //   })
  // }
  // else {
  //  console.log("not cordova")
  //  return this.afAuth.auth
  //     .signInWithPopup(new firebase.auth.FacebookAuthProvider())
  //     .then(res => console.log(res));
  // }
  //  }





  // async webGoogleLogin(): Promise<void> {
  //   try {
  //     const provider = new firebase.auth.GoogleAuthProvider();
  //     const credential = await this.afAuth.auth
  //       .signInWithPopup(provider)
  //       .then(data => {
  //         this.navCtrl.setRoot(Home2Page);
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }   }

  //   async nativeGoogleLogin(): Promise<void> {

  //     this.googlePlus.login({
  //       'webClientId' : '538663193611-38krnm1tkngcjmurcs0r6ghtrgde5124.apps.googleusercontent.com'
  //     })

  //       .then(res => {
  //         const firecreds = firebase.auth.GoogleAuthProvider.credential(res.idToken);
  //         this.fireauth.signInWithCredential(firecreds).then((res))


  //       })
  //       .catch(err => console.error(err));


  //     }

  /*
  return await this.afAuth.auth
          .signInWithCredential(
            firebase.auth.GoogleAuthProvider.credential(googlePlusUser.idToken)
          )
          .then(data => {
            this.nav.setRoot(HomePage);
          });
      } catch (err) {
        console.log(err);
      }
    }
  
  
  */






}