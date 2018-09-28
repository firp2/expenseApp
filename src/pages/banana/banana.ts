import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { List } from '../../models/list';

@Component({
  selector: 'page-banana',
  templateUrl: 'banana.html'
})
export class BananaPage {
  icon = "heart-outline"
  icon1 = "share-outline"
  color = "dark"
  color1 = "dark"
  displayItem: List;
  constructor(public navCtrl: NavController, public navParams : NavParams) {
    var type = navParams.get("type");
    var name = navParams.get("name");
    var picture = navParams.get("picture");
    var steps = navParams.get("steps");
    var ingredients = navParams.get("ingredients");
    var notes = navParams.get("notes");
    
    this.displayItem = new List (type,name, picture,steps,ingredients,notes);
    console.log(this.displayItem);
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
 
  changeColor1(params){
    if (!params) params = {};
    if(this.icon1 == "share-outline")
    {
      this.icon1 = "share"
      this.color1 = "danger"
    }
    else
    {
      this.icon1  = "share-outline" 
      this.color1 = "dark"
    }
  } 
}
