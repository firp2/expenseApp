import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InstructionsPage } from '../instructions/instructions';
import { ValidationPage } from '../validation/validation';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../../pages/login/login';

@Component({
  selector: 'page-set-up',
  templateUrl: 'set-up.html'
})
export class SetUpPage {
  lang:string;
  selectedLang:string
  constructor(public navCtrl: NavController, public translate: TranslateService,private storage: Storage, private auth: AuthService) {
    this.lang= translate.getDefaultLang();
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
  

}
