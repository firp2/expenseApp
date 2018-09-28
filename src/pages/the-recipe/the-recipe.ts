import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ReducedFatBreakfastPage } from '../reduced-fat-breakfast/reduced-fat-breakfast';

@Component({
  selector: 'page-the-recipe',
  templateUrl: 'the-recipe.html'
})
export class TheRecipePage {

  constructor(public navCtrl: NavController) {
  }
  goToReducedFatBreakfast(params){
    if (!params) params = {};
    this.navCtrl.push(ReducedFatBreakfastPage,{"type": params});
  }
}
