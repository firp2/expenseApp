import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { ProfilePage } from '../profile/profile';
import { User } from '../../models/user';
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  user: User;
  signupError: string;
  constructor(public navCtrl: NavController,private authService:AuthService) {
    this.user = new User ('', '', '');
  }
  signup() {
    this.authService.signup(this.user.email,
    this.user.password)
    .then(
    () => {
    this.authService.updateProfile(this.user.name,
    '').then(
    () => this.navCtrl.setRoot(ProfilePage),
    error => this.signupError = error.message
    );
    },
    error => this.signupError = error.message
  );
  }
}
