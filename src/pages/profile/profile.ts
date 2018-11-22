import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { User } from '../../models/user';
import { AuthService } from '../../providers/auth-service';
import { UserFb } from '../../models/userFB';
import { UserFbProvider } from '../../providers/user-firebase';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit {

    private user: User;
    userFb: UserFb;
    private imgSrc;
    bmiValue: number;
    constructor(public navCtrl: NavController, private authService: AuthService, private userFbService: UserFbProvider) {
    this.user = new User('', '', '');
    this.userFb = new UserFb ('','','',0,'',0,0,'',0);
    }
    
    ngOnInit() {
    this.authService.getCurrentUserObserver().subscribe(user => {
    if (user) {
      console.log("user details: ");
      console.log(user);
         //We need to go to userFB to get more info
   this.userFbService.getItemsByStatus(user.email).subscribe(
    (user) => {
      this.userFb = <UserFb>user[0];
      this.userFb.bmi = this.bmiValue;
      console.log("this.userFb:");
      console.log(JSON.stringify(this.userFb));
    });
    this.user = new User(user.email, '', user.displayName);
    this.user.photoURL = user.photoURL;
    
    if (this.user.photoURL && this.user.photoURL.length > 0) {
    this.authService.getDownloadUrl(this.user.photoURL).then(
    (url) => {
    console.log('Retrieved image ' + url);
    if(url){
    this.imgSrc = url;
    }else{
    this.imgSrc = "assets/img/profileDefault.png";
    console.log("default=" +this.imgSrc)
    }

 

    }, (err) => {
      this.imgSrc = "assets/img/profileDefault.png";
    console.log("default=" +this.imgSrc)
    });
    }
    }
    else {
    this.user = new User('You are not logged in', 'You are not logged in', '');
    }
    });
    }
    ionViewDidEnter() {
    this.ngOnInit(); // Update current user's profile
    }
    goToEditProfile() {
    this.navCtrl.push(EditProfilePage, this.user);
    }
    }
  

