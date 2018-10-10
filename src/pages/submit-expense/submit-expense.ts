import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Expense } from '../../models/expense';
import { NgForm } from '../../../node_modules/@angular/forms';
import { FoodFbProvider } from'../../providers/food-firebase';
import { ExpenseFbProvider } from'../../providers/expense-firebase';
import { Food } from '../../models/food';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { FoodRecognitionPage } from '../food-recognition/food-recognition';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { GoogleCloudVisionServiceProvider } from '../../providers/google-cloud-vision-service/google-cloud-vision-service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { TranslateService } from '@ngx-translate/core';


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
  showCamera: boolean;
  items: AngularFireList<any[]>;
  displayItems =[];
  displayFoods=[];
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

  constructor(public navCtrl: NavController, 
    public ga: GoogleAnalytics,
    private foodService:FoodFbProvider,
    private camera: Camera,
    private vision: GoogleCloudVisionServiceProvider,
    private db: AngularFireDatabase,
    private alert: AlertController,//to be continued 
    private expenseService:ExpenseFbProvider,
    public translate: TranslateService) 
    {
      console.log("Enter into food")
      this.items = db.list('foodimagescanner');
    //var lang = this.translate.getDefaultLang();
    var lang= translate.getDefaultLang();
    if(lang == 'cn')
    {
      this.showCamera = false;
    }
    else if(lang == 'en'){
      this.showCamera = true;
    }
    this.categories = ['breakfast', 'lunch', 'dinner', 'afternoonTea','snacks','nightSnack'];
    this.ga.startTrackerWithId('UA-124914826-1')
      .then(() => {
        console.log('Google analytics is ready now');
        this.ga.trackView('submit');
      })
      .catch(e => console.log('Error starting GoogleAnalytics', e));


    this.expense = new Expense (new Date().toISOString(),this.categories[0],"", "",0, '','');


  }

  saveResults(imageData, results) {
    this.items.push([{ imageData: imageData, results: results}]) //this line is to save to database --> foodimagescanner
    this.displayItems.push({imageData: imageData, results: results}) // is to display
    //loop thorugh the results?
    //console.log("before going into labels")
    results[0].labelAnnotations.forEach(foodlabel => {
      console.log("foodlabel object:"+ JSON.stringify(foodlabel))
      this.foodService.getItemsByName(foodlabel.description)
      .subscribe(foods => {
        console.log("foodlabel object:"+ JSON.stringify(foods))
        if(foods.length>0){
         this.displayFoods.push(foods[0]); 
        }
      
      //this.initIcon(); // Init icons after getting foods
      });
    });
   
       return(_ => { })
      // return(err => { this.showAlert(err) });
  }

  showAlert(message) {
    let alert = this.alert.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }


  takePhoto() {
    this.displayItems=[];
    this.displayFoods=[];
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 500,
      targetWidth: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.vision.getLabels(imageData).subscribe((result) => {
        this.saveResults(imageData, result.json().responses);
      }, err => {
        this.showAlert(err);
      });
    }, err => {
      this.showAlert(err);
    });
  }




get testing() { return JSON.stringify(this.expense); }

getFood(food: Food) {
  console.log("Food chosen:")
  console.log(food)
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
