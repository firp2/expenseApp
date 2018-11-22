import { Component } from '@angular/core';
import { NavController,NavParams,Platform  } from 'ionic-angular';
import { Community } from '../../models/community';
import { SocialSharing } from '@ionic-native/social-sharing';
import { GooglePlus } from '@ionic-native/google-plus';
import { AuthProvider } from '../../providers/auth';
import { AuthService } from '../../providers/auth-service';
//import { Facebook } from '@ionic-native/facebook';


@Component({
  selector: 'page-photo-introduce',
  templateUrl: 'photo-introduce.html'
})
export class PhotoIntroducePage {
  displayCommunity : Community; 
  icon = "thumbs-up-outline"
  color = "dark"
  
  // public sendTo   : any;
  // public subject  : string = 'Message from Social Sharing App';
  // public notes  : string = 'Take your app development skills to the next level with Mastering Ionic - the definitive guide';
   //public picture    : string	= 'data:image/jpeg;base64';
  // public uri      : string	= "notes";
  picture:string;

  constructor(public navCtrl: NavController, 
    public navParams : NavParams,
    public platform : Platform, 
    public sharingVar: SocialSharing,
    // public facebook: Facebook, 
    public authService: AuthService
    ) {

    var username = navParams.get("username");
    var icon = navParams.get("icon");
    this.picture = navParams.get("picture");
    var notes = navParams.get("notes");
    this.displayCommunity = new Community (icon,username, this.picture,notes);
    console.log("Community"); 
    console.log(this.displayCommunity)
  }
  changeColor(params){
    if (!params) params = {};

    if(this.icon == "thumbs-up-outline")
    {
      this.icon = "thumbs-up"
      this.color = "danger"
    }
    else
    {
      this.icon  = "thumbs-up-outline" 
      this.color = "dark"
    }
  } 
  // shareViaFacebook()
  // {
  //   var self = this;
  //    this.platform.ready()
  //    .then(() =>
  //    {
      
  //          self.socialSharing.shareViaFacebook(this.notes, this.picture, this.uri)
  //          .then((data) =>
  //          {
  //             console.log('Shared via Facebook');
  //             console.log("shareViaFacebook: Success");
  //          })
  //          .catch((err) =>
  //          {
  //             console.log('Was not shared via Facebook'+ err);
  //             console.log("shareViaFacebook: failed");
  //          });

  //       })
  //     }
  

  whatsappShare(){
    console.log(this.picture);
    this.authService.getDownloadUrl(this.picture).then(
      (url) => {
      console.log('Retrieved image ' + url);
      
      
    this.sharingVar.shareViaWhatsApp("testing",url )
      .then(()=>{
        alert("Success");
      },
      ()=>{
         alert("failed")
      })
  })
}
}


