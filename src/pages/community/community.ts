import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PhotoIntroducePage } from '../photo-introduce/photo-introduce';
import { CommunityFbProvider } from'../../providers/community-firebase';
import { Community } from '../../models/community';
import { SharePage } from '../share/share';
import { AuthService } from '../../providers/auth-service';
//import { }
@Component({
  selector: 'page-community',
  templateUrl: 'community.html'
})

  export class CommunityPage {
    // initIcon(): any {
  //   throw new Error("Method not implemented.");
  // }
  community: Community[];
  ngOnInit() {
    this.communityService.getItems()
    .subscribe(community => {
    this.community = community;

    // this.authService.getDownloadUrl(this.user.photoURL).then(
    //   (url) => {
    //   console.log('Retrieved image ' + url);
    //   if(url){
    //   this.imgSrc = url;
    //   }else{
    //   this.imgSrc = "assets/img/profileDefault.png";
    //   console.log("default=" +this.imgSrc)
    //   }
    //   }, (err) => {
    //     this.imgSrc = "assets/img/profileDefault.png";
    //   console.log("default=" +this.imgSrc)
    //   });

    //this.initIcon(); // Init icons after getting communitys

    console.log(JSON.stringify(community))
    });
    }
  icon = "heart-outline"
  color = "dark"
  constructor(public navCtrl: NavController ,private communityService: CommunityFbProvider, private authService: AuthService) {
    }
  goToPhotoIntroduce(params){
    if (!params) params = {};
    this.navCtrl.push(PhotoIntroducePage,params);
  }
  goToShare(params){
    if (!params) params = {};
    console.log("TEST")
    this.navCtrl.push(SharePage);
  }
  
  changeColor(params){
    if (!params) params = {};

    if(this.icon == "heart-outline")
    {
      this.icon = "heart"
      this.color = "danger"
    }
    else
    {
      this.icon  = "heart-outline" 
      this.color = "dark"
    }
  } 

}
