import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BananaPage } from '../banana/banana';
import { ListFbProvider } from '../../providers/list-firebase';
import { List } from '../../models/list';
// import { FoodFbProvider } from'../../providers/food-firebase';
// import { Food } from '../../models/food';

@Component({
  selector: 'page-reduced-fat-breakfast',
  templateUrl: 'reduced-fat-breakfast.html'
})
export class ReducedFatBreakfastPage {
  // initIcon(): any {
  //   throw new Error("Method not implemented.");
  // }
  lists: List[];
  private type;
  ngOnInit() {
    this.listService.getItemsByStatus(this.type)
    .subscribe(lists => {
    this.lists = lists;
    //this.initIcon(); // Init icons after getting foods
    });
    }
  constructor(public navCtrl: NavController,private listService:ListFbProvider, private navParams: NavParams) {
    this.type = this.navParams.get("type");
  }
  getItems(ev: any) { 
    // set val to the value of the searchbar
    let val = ev.target.value;
    console.log("search " + val);
    this.lists = this.listService.searchItems(val)
    //this.initIcon();
    }

  goToBanana(params){
    if (!params) params = {};
    this.navCtrl.push(BananaPage,params);
  }
}

