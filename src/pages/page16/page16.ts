import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Page20Page } from '../page20/page20';

@Component({
  selector: 'page-page16',
  templateUrl: 'page16.html'
})
export class Page16Page {

  constructor(public navCtrl: NavController) {
  }
  goToPage20(params){
    if (!params) params = {};
    this.navCtrl.push(Page20Page);
  }
}
