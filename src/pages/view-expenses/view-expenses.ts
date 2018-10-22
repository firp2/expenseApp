import { Component,OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Expense }    from '../../models/expense';
import { ExpenseFbProvider } from'../../providers/expense-firebase';
import { ExpenseDetailPage } from '../expense-detail/expense-detail';
import { SubmitExpensePage } from '../submit-expense/submit-expense';

@Component({
  selector: 'page-view-expenses',
  templateUrl: 'view-expenses.html'
})

export class ViewExpensesPage implements OnInit {
  expenses: Expense[];

  constructor(public navCtrl: NavController, private expenseService: ExpenseFbProvider) {
  }
  
  goToExpenseDetail(params){

    if (!params) params = {};

this.navCtrl.push(ExpenseDetailPage, params);

}
  ngOnInit() {
    this.expenseService.getItems().subscribe(
      expenses => {      
        this.expenses = expenses;      
       
      });
  }
  
  toggleFav(item:Expense){
      if (item.favIcon == "heart-outline") 
        item.favIcon = "heart";
      else 
        item.favIcon = "heart-outline";
  }
  
  deleteItem(item:Expense){
    this.expenseService.removeItem(item);
  }

  goToSubmitExpense(params){
    if (!params) params = {};
    this.navCtrl.push(SubmitExpensePage, params);
  }
  
  
}