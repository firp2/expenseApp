import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';


@Component({
  selector: 'page-barcode-scanner',
  templateUrl: 'barcode-scanner.html'
})
export class BarcodeScannerPage {

    options: BarcodeScannerOptions;
    encodeText:string='';
    encodedData:any={};
    scannedData:any={};


  constructor(public navCtrl: NavController, public scanner:BarcodeScanner) {

  }
  scan(){
      this.options= {
          prompt: 'Scan your barcode'
      }
      this.scanner.scan(this.options).then((data) => {
        this.scannedData = data;
      }, (err) => {
      console.log('Error : ', err);   
      })
  }

  encode(){
      this.scanner.encode(this.scanner.Encode.TEXT_TYPE, this.encodeText).then((data) => {
          this.encodedData = data;
      
      }, (err) => {
        console.log('Error : ', err); 

      })
  }
  
}