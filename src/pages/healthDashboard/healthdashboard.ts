import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';
import { RecommendedCal } from '../../models/recommendedCal';
import { MyApp } from '../../app/app.component';

@Component({
  selector: 'healthdashboard-page',
  templateUrl: 'healthdashboard.html'
})
export class HealthDashboardPage {

  recommendedCal : RecommendedCal;
// Doughnut
public doughnutChartLabels:string[] = ['Breakfast', 'Lunch', 'Dinner', 'Afternoon Tea','Snacks','Supper'];
public doughnutChartData:number[] = [350, 450, 100,60,50,190];
public doughnutChartType:string = 'doughnut';

// events

public chartHovered(e:any):void {
  console.log(e);
}


  constructor(public navCtrl: NavController, public ChartsModule : ChartsModule) {
   
    //this.doughnutChartData = new doughnutChartData();
    this.recommendedCal = MyApp.rCal;
      console.log("Recommended cal:" + this.recommendedCal.calories);
  }
  

}
