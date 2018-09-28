import { Component } from '@angular/core';
import { NavController,NavParams  } from 'ionic-angular';
import { Community } from '../../models/community';

@Component({
  selector: 'page-photo-introduce',
  templateUrl: 'photo-introduce.html'
})
export class PhotoIntroducePage {
  displayCommunity : Community; 
  icon = "thumbs-up-outline"
  color = "dark"
  
  constructor(public navCtrl: NavController, public navParams : NavParams ) {

    var username = navParams.get("username");
    var icon = navParams.get("icon");
    var picture = navParams.get("picture");
    var notes = navParams.get("notes");
    this.displayCommunity = new Community (icon,username, picture,notes);
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
}
