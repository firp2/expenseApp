import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Community } from '../../models/community';
import { CommunityFbProvider } from '../../providers/community-firebase';

@Component({
selector: 'page-share',
templateUrl: 'share.html'
})
export class SharePage implements OnInit {
private community: Community;
private imgSrc;
private username;
constructor(public navCtrl: NavController, private authService: AuthService, private navParams: NavParams,
   private camera: Camera, private communityService:CommunityFbProvider)
{
  let displayName = navParams.get('username');
  let picture = navParams.get('picture');
  let notes = navParams.get('notes');
  this.authService.getCurrentUserObserver().subscribe(user => {
    if (user) {
      this.community = new Community(user.photoURL,displayName,picture,notes);
      //this.community.picture = picture;
      console.log(user);
     this.community.username = user.displayName;
    }
  });

  }

  ngOnInit() {

      
  if (this.community.picture && this.community.picture.length > 0) {
  this.authService.getDownloadUrl(this.community.picture).then(
  (url) => {
  console.log('Retrieved image ' + url);
  this.imgSrc = url;
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

  getFromCamera() {
  // DATA_URL can be very memory intensive and cause app crashes or out of memory errors.
  // Thus scale the picture to 150x150
  let options = {
   quality: 50,
  targetWidth: 700,
  targetHeight: 700,
  destinationType: this.camera.DestinationType.DATA_URL,
  sourceType: this.camera.PictureSourceType.CAMERA,
  encodingType: this.camera.EncodingType.PNG
  }
  this.camera.getPicture(options).then((imageData) => {
  this.imgSrc = 'data:image/jpeg;base64,' + imageData;
  }, (err) => {
  // Handle error
  });
  }

  getFromAlbum() {
    let options = {
    quality: 100,
    targetWidth: 700,
    targetHeight: 700,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    encodingType: this.camera.EncodingType.PNG
    }
    this.camera.getPicture(options).then((imageData) => {
    this.imgSrc = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    // Handle error
    });
    }
    updateProfile() {
      // this.community = new Community(this.community.username,this.community.picture,this.community.notes);
    if (this.community.picture == undefined) {
      var a = new Date ();
      let picture = a.toISOString();//this.community.username.replace(/[^a-zA-Z0-9]/g, '_');
   
    this.community.picture =picture;
    }
    //this.authService.updateProfile(this.user.name, this.user.photoURL);
   
    
    if (this.imgSrc && this.imgSrc.startsWith('data:')) {
    // Remove 'data:image/png;base64,'
    let base64Image = this.imgSrc.split(',')[1];
    var self = this;
    this.authService.saveImage(base64Image, this.community.picture, { contentType: 'image/jpeg' }).then(function (snapshot) {
    alert('Upload success');
    
    self.communityService.addItem(self.community)
    //this.authService.updateProfile(this.user.name, this.user.photoURL);
    
    
    }, function (error) {
    alert('error ' + error.message);
    });
    }
    }
    
  }
    