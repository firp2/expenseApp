import { Component,Injectable } from '@angular/core';
import { NavController, MenuController, Platform} from 'ionic-angular';
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
import { UserFbProvider } from '../../providers/user-firebase';
// import { NativeStorage } from '@ionic-native/native-storage';
import { AuthProvider } from '../../providers/auth';
import { UserFb } from '../../models/userFB';

@Injectable()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AngularFireAuth]
})
export class LoginPage {
  user: User;
  userFb:UserFb;
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
    public authProvider: AuthProvider
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
  
  // // Google SignIn
  // loginGoogle() {
  //   this.googlePlus.login({})
  //     .then(res => {
  //       console.log(res);
  //       this.displayName = res.displayName;
  //       this.email = res.email;
  //       this.familyName = res.familyName;
  //       this.givenName = res.givenName;
  //       this.userId = res.userId;
  //       this.imageUrl = res.imageUrl;

  //       this.isLoggedIn = true;
  //     })
  //     .catch(err => console.error(err));

  //   console.log('Sign in with google');

  // }

// googleLogin(){
//   this.auth.googlePlus.login({})
//   .then(res => console.log(res))
//   .catch(err => console.error(err));
// }
  // loginWithGoogle() {
  //   this.auth.signInWithGoogle();
  //     }
 
    
  //-------//
  goToSignup(params){
    if (!params) params = {};
    this.navCtrl.push(SignupPage);
  }
  
  ionViewDidEnter() {
    this.menu.swipeEnable(false);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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
 


 //Google Login

  googleLogin(): void {
    this.authProvider.googleLogin(); 
  }

moveToHome(res){
  console.log('res',res);
  this.navCtrl.setRoot(Home2Page,{res:res});
}


}