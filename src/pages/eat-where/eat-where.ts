import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    GoogleMapOptions,
    Marker
  } from '@ionic-native/google-maps';

@Component({
  selector: 'page-eat-where',
  templateUrl: 'eat-where.html'
})
export class EatWherePage {
    map: GoogleMap;

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap(){
    let mapOptions: GoogleMapOptions = {
        camera: {
           target: {
             lat: 1.3801,
             lng: 103.8490
           },
           zoom: 18,
           tilt: 30
         }
      };
  
      this.map = GoogleMaps.create('map', mapOptions);    
  }
  addMarker(){
    let marker: Marker = this.map.addMarkerSync({
        title: 'Ionic',
        icon: 'blue',
        animation: 'DROP',
        position: {
            lat: 1.3801,
            lng: 103.8490
        }
      });
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        alert('clicked');
      });

  }
  
}