import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { GoogleCloudVisionServiceProvider } from '../../providers/google-cloud-vision-service/google-cloud-vision-service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {FoodFbProvider} from "../../providers/food-firebase"
import {Food} from "../../models/food"

@Component({
  selector: 'page-food-recognition',
  templateUrl: 'food-recognition.html'
})
export class FoodRecognitionPage {

  items: AngularFireList<any[]>;

  displayItems =[];
  displayFoods=[];
  constructor(
    private camera: Camera,
    private vision: GoogleCloudVisionServiceProvider,
    private db: AngularFireDatabase,
    private alert: AlertController,
    private foodService: FoodFbProvider) 
    {
      console.log("Enter into food")
      this.items = db.list('foodimagescanner');
  } 
  saveResults(imageData, results) {
    this.items.push([{ imageData: imageData, results: results}]) //this line is to save to database --> foodimagescanner
    this.displayItems.push({imageData: imageData, results: results}) // is to display
    //loop thorugh the results?
    results[0].labelAnnotations.forEach(foodlabel => {
      this.foodService.getItemsByName(foodlabel)
      .subscribe(foods => {
      this.displayFoods.push(foods);
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

  // remove(item: any) : void {
  //   array.splice(index, 1);
  //   this.vision.remove(item);
  //   //this.db.list('items').remove(item.key);
  // }

  takePhoto() {
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

  
}
