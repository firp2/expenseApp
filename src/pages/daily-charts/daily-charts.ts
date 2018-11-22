import { Component ,ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, NavParams, Option } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';
import { RecommendedCal } from '../../models/recommendedCal';
import { AngularFireDatabase, AngularFireList, listChanges } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ViewExpensesPage } from '../view-expenses/view-expenses';
import { Expense } from '../../models/expense';
import { ExpenseFbProvider } from '../../providers/expense-firebase';
import { UserFbProvider } from '../../providers/user-firebase';
import { UserFb } from '../../models/userFB';
import { MyApp, GroupByPipe } from '../../app/app.component';
import { Chart } from 'chart.js';

import { ChartService} from '../../providers/chart-service';
import firebase, { database } from 'firebase';
import { List } from '../../models/list';
import { ExpenseDetailPage } from '../expense-detail/expense-detail';
import { Food } from '../../models/food';


@Component({
  selector: 'page-daily-charts',
  templateUrl: 'daily-charts.html'
})
export class DailyChartsPage {
 recommendedCal : RecommendedCal;
 expense: Expense;
chart : any; 
arraytoPassChart = [];
  // totalsRef: AngularFireList<any>;
  calorie:string[];
 

// Doughnut
// public doughnutChartLabels:string;
// public doughnutChartData: any;  
 


@ViewChild('lineCanvas') lineCanvas:ElementRef;
 

  
  constructor(public navCtrl: NavController,  private expenseService: ExpenseFbProvider,
    public ChartsModule : ChartsModule,private db: AngularFireDatabase,private navParams: NavParams,
    public userFbService:UserFbProvider,private chartService: ChartService) {
     
      //****************RCal ***************/
      this.recommendedCal = MyApp.rCal;
      console.log("Recommended cal:" + this.recommendedCal.calories);
      
     
      //****************End RCal ***************/

      /*
      expenseItem (pass from previosu page)
      {key: "2018-11-16" //Date selected
       list: Array(1) //Food from the date
       tCalories: 2001 //Total cal for the date
        tick: false, //within recommended
        cross: true//not good
      }
      */
 

  let date = navParams.get('key');
  let foodName = navParams.get('list');
  let tCalories = navParams.get('tCalories');
  
  let calorie = navParams.get('calories');


  let amount = navParams.get('amount'); 
  let dateOnly = navParams.get('dateOnly');
  let notes = navParams.get('notes');

 

  console.log("Calories: " + calorie);
  console.log("Total Calories: " + tCalories);
 
  
  
var percentage = (((tCalories)/this.recommendedCal.calories) * 100).toFixed(2); 
console.log("percentage: " + percentage);
 var missingCal = ((this.recommendedCal.calories) - tCalories);
console.log("missingCal: " + missingCal );

  
    this.db.list('/expenseItems')
    .valueChanges()
    .subscribe(res => {
      this.arraytoPassChart.push(tCalories);    //with tCalories works 
      this.arraytoPassChart.push(missingCal);    //with tCalories works 
      console.log(res)//should give you the array of percentage.  
      console.log("working?")
      this.makeChart();
      //do your post processing to your res here.
      
    })
    console.log("Calories: " + foodName);
  console.log("Calories: " + calorie);

 
}

// getItemsByStatus(status: string): Observable<any[]> {
//     return this.db.list('/expenseItems/', ref =>
//     ref.orderByChild('status').equalTo(status)).snapshotChanges().pipe(
//     map(changes =>
//     changes.map(c => ({ key: c.payload.key, ...c.payload.val()
//     }))));
//     }
        
  

  makeChart() {


 this.chart = new Chart(this.lineCanvas.nativeElement, {

  type: 'doughnut',
  data: {
    labels: ["Calories consumed for the day","Missing calories/Extra calories"], //replace with categories
    datasets: [
      {
        label: "Calories for the day",
        fill: false,
        lineTension: 1000,
        backgroundColor:  [
          'rgba(255,0,0,0.5)',
          'rgba(255,255,0,0.3)',
        ],
        borderColor: "rgba(75,192,192,1)",
        borderDash: [],
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointRadius: 1,
        pointHitRadius: 10,
        data: this.arraytoPassChart,// my data here, work when I type an array myself
        spanGaps: true,
      }
    ]
  }

});
  }



  goToDailyCharts(params){
    if (!params) params = {};
this.navCtrl.push(DailyChartsPage, params);
}
}
  



