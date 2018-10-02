import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { FruitsAndVegetablesPage } from '../fruits-and-vegetables/fruits-and-vegetables';
import { FoodIntroducedPage } from '../food-introduced/food-introduced';
import { DrinkPage } from '../drink/drink';
import { CommunityPage } from '../community/community';
import { PhotoIntroducePage } from '../photo-introduce/photo-introduce';
import { TheRecipePage } from '../the-recipe/the-recipe';
import { ReducedFatBreakfastPage } from '../reduced-fat-breakfast/reduced-fat-breakfast';
import { BananaPage } from '../banana/banana';
import { SearchContrastPage } from '../search-contrast/search-contrast';
import { TheStapleFoodPage } from '../the-staple-food/the-staple-food';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import {BarcodeScannerPage} from '../barcode-scanner/barcode-scanner';

@Component({
  selector: 'page-home2',
  templateUrl: 'home2.html'
})
export class Home2Page {
  foods: any;
  foodService: any;

  constructor(public navCtrl: NavController,public ga: GoogleAnalytics, private menu:MenuController) {
    //this.ga.startTrackerWithId('UA-101858534-1')
    this.ga.startTrackerWithId('UA-124914826-1')
    .then(() => {
      console.log('Google analytics is ready now');
      this.ga.trackView('home');
    })
    .catch(e => console.log('Error starting GoogleAnalytics', e));

  }
  ionViewDidEnter() {
    this.menu.swipeEnable(true);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1');
  }
  goToFruitsAndVegetables(params){
    if (!params) params = {};
    this.navCtrl.push(FruitsAndVegetablesPage, {"type" : params});
  }goToFoodIntroduced(params){
    if (!params) params = {};
    this.navCtrl.push(FoodIntroducedPage);
  }goToDrink(params){
    if (!params) params = {};
    this.navCtrl.push(DrinkPage);
  }goToCommunity(params){
    if (!params) params = {};
    this.navCtrl.push(CommunityPage);
  }goToPhotoIntroduce(params){
    if (!params) params = {};
    this.navCtrl.push(PhotoIntroducePage);
  }goToTheRecipe(params){
    if (!params) params = {};
    this.navCtrl.push(TheRecipePage);
  }goToReducedFatBreakfast(params){
    if (!params) params = {};
    this.navCtrl.push(ReducedFatBreakfastPage);
  }goToBanana(params){
    if (!params) params = {};
    this.navCtrl.push(BananaPage);
  }goToSearchContrast(params){
    if (!params) params = {};
    this.navCtrl.push(SearchContrastPage);
  }goToTheStapleFood(params){
    if (!params) params = {};
    this.navCtrl.push(TheStapleFoodPage, {"type": params});
  }goToBarcodeScanner(params){
    if (!params) params = {};
    this.navCtrl.push(BarcodeScannerPage);
  }
 
}
