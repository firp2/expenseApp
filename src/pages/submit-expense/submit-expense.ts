import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Expense } from '../../models/expense';
import { NgForm } from '../../../node_modules/@angular/forms';
import { FoodFbProvider } from'../../providers/food-firebase';
import { ExpenseFbProvider } from'../../providers/expense-firebase';
import { Food } from '../../models/food';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { FoodRecognitionPage } from '../food-recognition/food-recognition';

@Component({
  selector: 'page-submit-expense',
  templateUrl: 'submit-expense.html'
})
export class SubmitExpensePage {
  categories: string[];
  expense: Expense;
  submitted = false;
  showList=false;
  foods: Food[];
 // selectedFood : Food;
  ngOnInit() {
   this.getAll();
    }

    getAll(){
      this.foodService.getItems()
      .subscribe(foods => {
      this.foods = foods;
      //this.initIcon(); // Init icons after getting foods
      });
    }

  constructor(public navCtrl: NavController, public ga: GoogleAnalytics,private foodService:FoodFbProvider, private expenseService:ExpenseFbProvider) {
    //translate.setDefaultLang(this.lang);
  // this.lang= translate.getDefaultLang();
    this.categories = ['breakfast', 'lunch', 'dinner', 'afternoonTea','snacks','nightSnack'];
    this.ga.startTrackerWithId('UA-124914826-1')
      .then(() => {
        console.log('Google analytics is ready now');
        this.ga.trackView('submit');
      })
      .catch(e => console.log('Error starting GoogleAnalytics', e));


    this.expense = new Expense (new Date().toISOString(),this.categories[0],"", "",0, '','');


  }
get testing() { return JSON.stringify(this.expense); }

getFood(food: Food) {
  this.expense.calorie = food.calorie.toString();
  this.expense.foodName = food.name;
  //this.expense.nutrition = food
}

getItems(ev: any) {
  console.log(ev)
  let val = ev.target.value;
  if (val && val.trim() != '') {
  // set val to the value of the searchbar
  console.log("search " + val);
  this.foods = this.foodService.searchItems(val)
  //this.initIcon();
  this.showList = true;
} else {
  
  // hide the results when the query is empty
  this.showList = false;
}

}


onSubmit(form:NgForm) {
  this.submitted = true;

    if (form.valid && this.expense.amount > 0) {

  alert('Expense submitted:' 
    + "\n Date: " + this.expense.date
    + "\n Category: " + this.expense.category 
    + "\n Food Name: " + this.expense.foodName
    + "\n Calorie: " + this.expense.calorie
   // + "\n Nutrition: "  + this.expense.nutrition
    + "\n Amount: " + "$" + this.expense.amount
    + "\n Notes: " + this.expense.notes );

    this.expenseService.addItem(this.expense); 
}
}goToFoodRecognition(params){
  if (!params) params = {};
  this.navCtrl.push(FoodRecognitionPage);
}

}
