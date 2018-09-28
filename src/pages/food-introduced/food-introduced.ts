import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Food} from "../../models/food"
@Component({
  selector: 'page-food-introduced',
  templateUrl: 'food-introduced.html'
})
export class FoodIntroducedPage {
   displayFood : Food; 
  constructor(public navCtrl: NavController, public navParams : NavParams ) {
  
    var  type = navParams.get("type");
    var name = navParams.get("name");
    var picture = navParams.get("picture");
    var  calorie = navParams.get("calorie");
    var protein = navParams.get("protein");
    var  fat = navParams.get("fat");
    var  carbohydrates = navParams.get("carbohydrates");
    var instructions = navParams.get("instructions");
    var notes = navParams.get("notes");
    this.displayFood = new Food (type,name, picture,calorie,protein,fat,carbohydrates,instructions,notes);
    console.log(this.displayFood);
  }
  
}
