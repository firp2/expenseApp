import { Component, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PersonalCenterPage } from '../pages/personal-center/personal-center';
import { SetUpPage } from '../pages/set-up/set-up';
import { InstructionsPage } from '../pages/instructions/instructions';
import { ValidationPage } from '../pages/validation/validation';
import { FruitsAndVegetablesPage } from '../pages/fruits-and-vegetables/fruits-and-vegetables';
import { FoodIntroducedPage } from '../pages/food-introduced/food-introduced';
import { DrinkPage } from '../pages/drink/drink';
import { CommunityPage } from '../pages/community/community';
import { PhotoIntroducePage } from '../pages/photo-introduce/photo-introduce';
import { TheRecipePage } from '../pages/the-recipe/the-recipe';
import { ReducedFatBreakfastPage } from '../pages/reduced-fat-breakfast/reduced-fat-breakfast';
import { BananaPage } from '../pages/banana/banana';
import { SearchContrastPage } from '../pages/search-contrast/search-contrast';
import { FoodRecognitionPage } from '../pages/food-recognition/food-recognition';
import { TheStapleFoodPage } from '../pages/the-staple-food/the-staple-food';
import { SubmitExpensePage } from '../pages/submit-expense/submit-expense';
import { ViewExpensesPage } from '../pages/view-expenses/view-expenses';
import { TranslateService } from '@ngx-translate/core';

import { Home2Page } from '../pages/home2/home2';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { Storage } from '@ionic/storage';
import { ProfilePage } from '../pages/profile/profile';
import { AuthService } from '../providers/auth-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { HealthDashboardPage } from '../pages/healthDashboard/healthdashboard';
// import { OrderPipe } from 'ngx-order-pipe';
import { DailyChartsPage } from '../pages/daily-charts/daily-charts';




@Component({
  templateUrl: 'app.html',
 
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = LoginPage;
    displayName: string;
    photoURL: string;
  googlePlus: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    translate: TranslateService, private storage: Storage, private auth: AuthService, 
    public menu:MenuController, public afAuth: AngularFireAuth,) 
    {
    this.rootPage = LoginPage;
    this.afAuth.authState.subscribe(auth => {
      if (!auth)
      {
        console.log("go to login page")
        this.rootPage = LoginPage;
      }
      else
      {
        console.log("go to home page")
        this.rootPage = Home2Page;
      }
        
    });

    

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.auth.afAuth.authState
      .subscribe(
        user => {
          if (user) {
            this.rootPage = Home2Page;
            this.displayName = user.displayName;
            this.photoURL = user.photoURL;
            console.log('URL from user ' + this.photoURL);
            if (this.photoURL && this.photoURL.length > 0) {
              this.auth.getDownloadUrl(this.photoURL).then(
              (url) => {
              console.log('Retrieved image ' + url);
              if(url){
                this.photoURL = url;
              }else{
                this.photoURL = "assets/img/profileDefault.png";
              console.log("default=" +this.photoURL)
              }
              }, (err) => {
                this.photoURL = "assets/img/profileDefault.png";
              console.log("default=" +this.photoURL)
              });
              }
          } else {
            this.rootPage = LoginPage;
          }
        },
        () => {
          this.rootPage = LoginPage;
        }
      );
      // Or to get a key/value pair
    this.storage.get('lang').then((val) => {
      if(val){
        console.log('testing: ', val);
        translate.setDefaultLang(val)
      }
      else{
        translate.setDefaultLang('en')
    }
      
    });
    });
  }

  
  goToPersonalCenter(params){
    if (!params) params = {};
    this.navCtrl.setRoot(PersonalCenterPage);
  }goToSetUp(params){    
    if (!params) params = {};
    this.navCtrl.setRoot(SetUpPage);
  }goToInstructions(params){
    if (!params) params = {};
    this.navCtrl.setRoot(InstructionsPage);
  }goToValidation(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ValidationPage);
  }goToHome2(params){
    if (!params) params = {};
    this.navCtrl.setRoot(Home2Page);
  }goToFruitsAndVegetables(params){
    if (!params) params = {};
    this.navCtrl.setRoot(FruitsAndVegetablesPage);
  }goToFoodIntroduced(params){
    if (!params) params = {};
    this.navCtrl.setRoot(FoodIntroducedPage);
  }goToDrink(params){
    if (!params) params = {};
    this.navCtrl.setRoot(DrinkPage);
  }goToCommunity(params){
    if (!params) params = {};
    this.navCtrl.setRoot(CommunityPage);
  }goToPhotoIntroduce(params){
    if (!params) params = {};
    this.navCtrl.setRoot(PhotoIntroducePage);
  }goToTheRecipe(params){
    if (!params) params = {};
    this.navCtrl.setRoot(TheRecipePage);
  }goToReducedFatBreakfast(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ReducedFatBreakfastPage);
  }goToBanana(params){
    if (!params) params = {};
    this.navCtrl.setRoot(BananaPage);
  }goToSearchContrast(params){
    if (!params) params = {};
    this.navCtrl.setRoot(SearchContrastPage);
  }goToFoodRecognition(params){
    if (!params) params = {};
    this.navCtrl.setRoot(FoodRecognitionPage);
  }goToTheStapleFood(params){
    if (!params) params = {};
    this.navCtrl.setRoot(TheStapleFoodPage);
  } goToSubmitExpense(params){
    if (!params) params = {};
    this.navCtrl.setRoot(SubmitExpensePage);
  }goToLogin(params){
    if (!params) params = {};
    this.navCtrl.push(LoginPage);
  }goToSignup(params){
    if (!params) params = {};
    this.navCtrl.push(SignupPage);
  }
goToViewExpenses(params){
    if (!params) params = {};
    this.navCtrl.push(ViewExpensesPage);
  }
  goToProfile(params){
    if (!params) params = {};
    this.navCtrl.push(ProfilePage);
  }
  goToHealthDashboard(params){
    if (!params) params = {};
    this.navCtrl.push(HealthDashboardPage);
  }
  goToDailyCharts(params){
    if (!params) params = {};
    this.navCtrl.push(DailyChartsPage);
  }
  



}

@Pipe({
  name: 'groupBy',
})
export class GroupByPipe implements PipeTransform {
  transform(value: any, groupByKey: string) {
    console.log(value);
    const events: any[] = [];
    const groupedElements: any = {};

    value.forEach((obj: any) => {
      if (!(obj[groupByKey] in groupedElements)) {
        groupedElements[obj[groupByKey]] = [];
      }
      groupedElements[obj[groupByKey]].push(obj);
    });

    for (let prop in groupedElements) {
      if (groupedElements.hasOwnProperty(prop)) {
        events.push({
          key: prop,
          list: groupedElements[prop]
        });
      }
    }

    return events;
  }
}
