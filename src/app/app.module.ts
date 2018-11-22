import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler,IonicPageModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CartPage } from '../pages/cart/cart';
import { CloudPage } from '../pages/cloud/cloud';
import { Home2Page } from '../pages/home2/home2';
import { SearchContrastPage } from '../pages/search-contrast/search-contrast';
import { FoodRecognitionPage } from '../pages/food-recognition/food-recognition';
import { FruitsAndVegetablesPage } from '../pages/fruits-and-vegetables/fruits-and-vegetables';
import { DrinkPage } from '../pages/drink/drink';
import { TheStapleFoodPage } from '../pages/the-staple-food/the-staple-food';
import { FoodIntroducedPage } from '../pages/food-introduced/food-introduced';
import { CommunityPage } from '../pages/community/community';
import { TheRecipePage } from '../pages/the-recipe/the-recipe';
import { PhotoIntroducePage } from '../pages/photo-introduce/photo-introduce';
import { BananaPage } from '../pages/banana/banana';
import { ReducedFatBreakfastPage } from '../pages/reduced-fat-breakfast/reduced-fat-breakfast';
import { MyPicturePage } from '../pages/my-picture/my-picture';
import { PersonalCenterPage } from '../pages/personal-center/personal-center';
import { SetUpPage } from '../pages/set-up/set-up';
import { ValidationPage } from '../pages/validation/validation';
import { InstructionsPage } from '../pages/instructions/instructions';
import { SubmitExpensePage } from '../pages/submit-expense/submit-expense';
import { SharePage } from '../pages/share/share';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from'angularfire2/database';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { AuthService } from '../providers/auth-service';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ProfilePage } from '../pages/profile/profile';
import { FoodFbProvider } from'../providers/food-firebase';
import { CommunityFbProvider } from'../providers/community-firebase';
import { ListFbProvider } from '../providers/list-firebase';
import { ExpenseFbProvider } from '../providers/expense-firebase';
import { ViewExpensesPage } from '../pages/view-expenses/view-expenses';
import { ExpenseDetailPage } from '../pages/expense-detail/expense-detail';
import { IonicStorageModule } from '@ionic/storage';
import {AngularFireStorageModule} from 'angularfire2/storage';
import { EditProfilePage } from '../pages/edit-profile/edit-profile'
import { Camera } from '@ionic-native/camera';
import { getPhotoPipe } from '../pipes/getPhoto';
import { UserFbProvider } from '../providers/user-firebase';
import { getNamePipe } from '../pipes/getName';
import { Http ,HttpModule } from '@angular/http';
import { environment } from '../environment';
import { GoogleCloudVisionServiceProvider } from '../providers/google-cloud-vision-service/google-cloud-vision-service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { GooglePlus } from '@ionic-native/google-plus';
import { SocialSharing } from '@ionic-native/social-sharing';

import { AngularFireAuth } from 'angularfire2/auth';
import { HealthDashboardPage } from '../pages/healthDashboard/healthdashboard';
import { ChartsModule } from 'ng2-charts';
import { OrderPipe, OrderModule } from 'ngx-order-pipe';
import { GroupByPipe } from './app.component';
//import { NativeStorage } from '@ionic-native/native-storage';
import { UserFb } from '../models/userFB';
import { DailyChartsPage } from '../pages/daily-charts/daily-charts';
import { AuthProvider } from '../providers/auth';
import { ProductFbProvider } from '../providers/product-firebase';
import { ChartService } from '../providers/chart-service';
import { EatWherePage } from '../pages/eat-where/eat-where';
import { GoogleMaps } from '@ionic-native/google-maps';





  // Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBgRs35DXJt4tt8kcHMqPEBEwW5loJlghA",
  authDomain: "food-madp.firebaseapp.com",
  databaseURL: "https://food-madp.firebaseio.com",
  projectId: "food-madp",
  storageBucket: "food-madp.appspot.com",
  messagingSenderId: "538663193611"
};

export function setTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
 }
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CartPage,
    CloudPage,
    Home2Page,
    SearchContrastPage,
    FoodRecognitionPage,
    FruitsAndVegetablesPage,
    DrinkPage,
    TheStapleFoodPage,
    FoodIntroducedPage,
    CommunityPage,
    TheRecipePage,
    PhotoIntroducePage,
    BananaPage,
    ReducedFatBreakfastPage,
    MyPicturePage,
    PersonalCenterPage,
    SetUpPage,
    ValidationPage,
    InstructionsPage,
    SubmitExpensePage,
    LoginPage,
    SignupPage,
    ViewExpensesPage,
    ProfilePage,
    ExpenseDetailPage,
    EditProfilePage,
    SharePage,
    getPhotoPipe,
    getNamePipe,
    HealthDashboardPage,
    DailyChartsPage,
    GroupByPipe,
    EatWherePage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    HttpModule,
    ChartsModule,
    OrderModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
    IonicPageModule.forChild(LoginPage),
    TranslateModule.forRoot({
    loader: {
    provide: TranslateLoader,
    useFactory: (setTranslateLoader),
    deps: [HttpClient]
 }
})
  ],
  exports: [
      getPhotoPipe,
      getNamePipe
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CartPage,
    CloudPage,
    Home2Page,
    SearchContrastPage,
    FoodRecognitionPage,
    FruitsAndVegetablesPage,
    DrinkPage,
    TheStapleFoodPage,
    FoodIntroducedPage,
    CommunityPage,
    TheRecipePage,
    PhotoIntroducePage,
    BananaPage,
    ReducedFatBreakfastPage,
    MyPicturePage,
    PersonalCenterPage,
    SetUpPage,
    ValidationPage,
    InstructionsPage,
    SubmitExpensePage,
    LoginPage,
    SignupPage,
    ViewExpensesPage,
    ProfilePage,
    ExpenseDetailPage,
    EditProfilePage,
    SharePage,
    HealthDashboardPage,
    DailyChartsPage,
    EatWherePage
  ],
  providers: [
    StatusBar,
    FoodFbProvider,
    CommunityFbProvider,
    ListFbProvider,
    SplashScreen,
    AuthService,
    Camera,
    ExpenseFbProvider,
    UserFbProvider,
    ProductFbProvider,
    BarcodeScanner,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  GoogleAnalytics,
  SocialSharing,
  GooglePlus,
  AngularFireAuth,
  //Facebook,
    GoogleCloudVisionServiceProvider,
    //NativeStorage
    OrderPipe,
    AuthProvider,
    ChartService
  ]
})
export class AppModule {}