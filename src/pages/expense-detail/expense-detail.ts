import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Expense }    from '../../models/expense';

@Component({
  selector: 'page-expense-detail',
  templateUrl: 'expense-detail.html'
})
export class ExpenseDetailPage {
  expense: Expense;

  constructor(public navCtrl: NavController, private navParams: NavParams) {
     let date = navParams.get('date');

     let foodName = navParams.get('foodName');

     let category = navParams.get('category');

     let amount = navParams.get('amount');

     let calorie = navParams.get('calorie');
      
     let note = navParams.get('note');

   

    


    this.expense = new Expense (date,category , foodName,calorie, amount,note);
  }
  
}
