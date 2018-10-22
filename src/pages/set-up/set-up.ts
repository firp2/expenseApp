import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { InstructionsPage } from '../instructions/instructions';
import { ValidationPage } from '../validation/validation';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../../pages/login/login';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-set-up',
  templateUrl: 'set-up.html'
})
export class SetUpPage {
loginError: string;
displayName: any;
email: any;
familyName: any;
givenName: any;
userId: any;
imageUrl: any;

isLoggedIn:boolean = false;
lang:string;
selectedLang:string

users: any;

  constructor(public navCtrl: NavController, public translate: TranslateService,private storage: Storage, public auth: AuthService,public googlePlus: GooglePlus,
    public platform: Platform,public afAuth: AngularFireAuth) {
    this.lang= translate.getDefaultLang();

    /*
    facebook.getLoginStatus()
    .then(res => {
      console.log(res.status);
      if(res.status === "connect") {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log(e));
*/
  }
  goToInstructions(params){
    if (!params) params = {};
    this.navCtrl.push(InstructionsPage);
  }goToValidation(params){
    if (!params) params = {};
    this.navCtrl.push(ValidationPage);
 }
 logout(){
   //console.log("TESTING")    
   this.auth.logout();  
   this.navCtrl.setRoot(LoginPage);
  } 
  changeLang() {
console.log("lang:" + this.lang)
    this.translate.setDefaultLang(this.lang);
    this.storage.set('lang', this.lang);
  
  }
 
  signOut(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }, function(error) {
    console.log(error);
  });
  }
/*
  Fblogout() {
    this.facebook.logout()
      .then(_res => this.isLoggedIn = false)
      .catch(e => console.log('Error logout from Facebook', e));
  }*/
}

