import { Component } from '@angular/core';
import { NavController,MenuController } from 'ionic-angular';
import { Home2Page } from '../home2/home2';
import { User } from '../../models/user';
import { SignupPage } from '../signup/signup';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
user: User;
loginError: string;
constructor(public navCtrl: NavController, private authService: AuthService, private menu:MenuController) {
  this.user = new User ('', '', '');
  
}
goToSignup(params){
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

    this.authService.login(this.user.email, this.user.password)
    .then(
    () => this.navCtrl.setRoot(Home2Page),
    error => this.loginError = error.message
    );
    }
  }