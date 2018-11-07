import { Component,OnInit, Pipe, PipeTransform} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Expense }    from '../../models/expense';
import { ExpenseFbProvider } from'../../providers/expense-firebase';
import { ExpenseDetailPage } from '../expense-detail/expense-detail';
import { SubmitExpensePage } from '../submit-expense/submit-expense';
import { getLocaleDateFormat } from '@angular/common';
import { List } from '../../models/list';
import { ListFbProvider } from '../../providers/list-firebase';
import { OrderPipe } from 'ngx-order-pipe';
import { DailyChartsPage } from '../daily-charts/daily-charts';



@Component({
  selector: 'page-view-expenses',
  templateUrl: 'view-expenses.html'

  
})

export class ViewExpensesPage implements OnInit {
  expenses: Expense[];
  expenseItem : any;
  thisDate : Date;
  lists: List[];
  items = [];


  constructor(public navCtrl: NavController, private expenseService: ExpenseFbProvider,private listService:ListFbProvider,private orderPipe: OrderPipe) {
   
  }
  
  goToExpenseDetail(params){
    if (!params) params = {};
this.navCtrl.push(ExpenseDetailPage, params);
}
  goToDailyCharts(params){
    if (!params) params = {};
this.navCtrl.push(DailyChartsPage, params);
}

ionViewCanEnter(): Promise<any>{
  return new Promise((resolve, reject) => {

    this.expenseService.getItems().subscribe(
      expenses => {      
        this.expenses = expenses;     
       console.log(expenses);
       resolve(true);
      })
    })
  
 }
  ngOnInit() {
    // this.expenseService.getItems().subscribe(
    //   expenses => {      
    //     this.expenses = expenses;      
    //    console.log(expenses);
    //   });
  }
  
  getItemsByDate(ev: any) { 
    // set val to the value of the searchbar
    let val = ev.target.value;
    console.log("search " + val);
    this.lists = this.listService.searchItems(val)
    //this.initIcon();
    
    }


  // toggleFav(item:Expense){
  //     if (item.favIcon == "heart-outline") 
  //       item.favIcon = "heart";
  //     else 
  //       item.favIcon = "heart-outline";
  // }
  
  deleteItem(item:Expense){
    this.expenseService.removeItem(item);
  }

  goToSubmitExpense(params){
    if (!params) params = {};
    this.navCtrl.push(SubmitExpensePage, params);
  }

 
}

