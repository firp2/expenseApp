import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../models/user';
import { UserFb } from '../../models/userFB';
import { AuthService } from '../../providers/auth-service';
import { UserFbProvider } from '../../providers/user-firebase';
import { ProfilePage } from '../profile/profile';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  user: User;
  userFB: UserFb;
  signupError: string;
  height : number;
  weight: number;
  bmiValue: number;
  bmiMessage: string;
 

  constructor(public navCtrl: NavController,private authService:AuthService,private userFbProvider: UserFbProvider) {
    this.user = new User ('', '', '');
    this.userFB = new UserFb ('','','',0,'',0,0,'');
  }
  signup() {
    this.authService.signup(this.userFB.email,this.user.password)
    .then(
    () => {

this.userFbProvider.addItem(this.userFB)
      //call the user-firebase service
      //userService.add(user)
      
    this.authService.updateProfile(this.user.name,'').then(
    () => this.navCtrl.setRoot(ProfilePage),
    error => this.signupError = error.message
    );
    },
    error => this.signupError = error.message
  );
  return this.userFB
  }


calculateBMI() {
  if (this.userFB.weight > 0 && this.userFB.height > 0) {
    let finalBmi = this.userFB.weight / (this.userFB.height / 100 * this.userFB.height / 100);
    this.bmiValue = parseFloat(finalBmi.toFixed(2));
    this.setBMIMessage();
  }
}

// setBMIMessage will set the text message based on the value of BMI
private setBMIMessage() {
  if (this.bmiValue < 18.5) {
    this.bmiMessage = "Underweight"
  }

  if (this.bmiValue > 18.5 && this.bmiValue < 25) {
    this.bmiMessage = "Normal"
  }

  if (this.bmiValue > 25 && this.bmiValue < 30) {
    this.bmiMessage = "Overweight"
  }

  if (this.bmiValue > 30) {
    this.bmiMessage = "Obese"
  }
}

}
