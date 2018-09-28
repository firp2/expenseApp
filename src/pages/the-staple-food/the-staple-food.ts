import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Food } from '../../models/food';
import { FoodFbProvider } from '../../providers/food-firebase';
import { FoodIntroducedPage } from '../food-introduced/food-introduced';

@Component({
  selector: 'page-the-staple-food',
  templateUrl: 'the-staple-food.html'
})
export class TheStapleFoodPage {
 // initIcon(): any {
  //   throw new Error("Method not implemented.");
  // }
  private type;
  foods: Food[];

  ngOnInit() {
    this.foodService.getItemsByStatus(this.type)
    .subscribe(foods => {
    this.foods = foods;
    //this.initIcon(); // Init icons after getting foods
    });
    }

  constructor(public navCtrl: NavController,private foodService:FoodFbProvider, private navParams: NavParams) {
    this.type = this.navParams.get("type");
  }

  goToFoodIntroduced(params){
    if (!params) params = {};
    console.log(params);
    this.navCtrl.push(FoodIntroducedPage, params);
  }
  
  getItems(ev: any) {
    // set val to the value of the searchbar
    let val = ev.target.value;
    console.log("search " + val);
    this.foods = this.foodService.searchItems(val)
    //this.initIcon();
    }
  
}
