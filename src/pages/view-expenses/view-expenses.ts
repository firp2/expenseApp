import { Component,OnInit, Pipe, PipeTransform} from '@angular/core';
import { NavController, NavParams, Item } from 'ionic-angular';
import { Expense }    from '../../models/expense';
import { ExpenseFbProvider } from'../../providers/expense-firebase';
import { ExpenseDetailPage } from '../expense-detail/expense-detail';
import { SubmitExpensePage } from '../submit-expense/submit-expense';
import { getLocaleDateFormat } from '@angular/common';
import { List } from '../../models/list';
import { ListFbProvider } from '../../providers/list-firebase';
import { OrderPipe } from 'ngx-order-pipe';
import { DailyChartsPage } from '../daily-charts/daily-charts';
import { AngularFireDatabase } from 'angularfire2/database';
import { RecommendedCal } from '../../models/recommendedCal';
import { Observable, } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';
import { MyApp } from '../../app/app.component';



@Component({
  selector: 'page-view-expenses',
  templateUrl: 'view-expenses.html'

  
})

export class ViewExpensesPage implements OnInit {
  expenses: Expense[];
  expense: Expense;
  expenseItem : any;
  thisDate : Date;
  lists: List[];
  items = [];
  recommendedCal: RecommendedCal;
  recCal:any;
  category:Expense[];
  recCaloriesList: any[];
  categories: string[];
  tick:boolean;
  cross:boolean;
  calories:string[];

  constructor(public navCtrl: NavController, private expenseService: ExpenseFbProvider,private listService:ListFbProvider,
    private orderPipe: OrderPipe,private db: AngularFireDatabase,private navParams: NavParams) {
      this.categories = ['Breakfast', 'Lunch', 'Dinner', 'Afternoon Tea','Snacks','Supper'];
      this.recommendedCal = MyApp.rCal;
      console.log("Recommended Calories:" + this.recommendedCal.calories);
      
    this.expense = new Expense (new Date().toISOString(),this.categories[""],"", 0,0, '','');
      
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
    filterItems(ev: any) {
      this.expenseItem();
      let val = ev.target.value;
  
      if (val && val.trim() !== '') {
        this.items = this.items.filter(function(item) {
          return item.toLowerCase().includes(val.toLowerCase());
        });
      }
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

