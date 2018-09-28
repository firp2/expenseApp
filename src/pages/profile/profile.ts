import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { User } from '../../models/user';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit {

    private user: User;
    private imgSrc;
    constructor(public navCtrl: NavController, private authService: AuthService) {
    this.user = new User('', '', '');
    }
    ngOnInit() {
    this.authService.getCurrentUserObserver().subscribe(user => {
    if (user) {
      console.log(user);
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
  

