import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FoodIntroducedPage } from '../food-introduced/food-introduced';
import { FoodFbProvider } from'../../providers/food-firebase';
import { Food } from '../../models/food';
@Component({
  selector: 'page-fruits-and-vegetables',
  templateUrl: 'fruits-and-vegetables.html'
})
export class FruitsAndVegetablesPage {
  // initIcon(): any {
  //   throw new Error("Method not implemented.");
  // }
  foods: Food[];
  ngOnInit() {
    this.foodService.getItems()
    .subscribe(foods => {
    this.foods = foods;
    //this.initIcon(); // Init icons after getting foods
    });
    }
  constructor(public navCtrl: NavController,private foodService:FoodFbProvider, private navParams: NavParams) {
    //navParams.get()
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

