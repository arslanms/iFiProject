import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  public currentLocation;

  constructor(public navCtrl: NavController, public geolocation: Geolocation) {

  }

    ionViewDidLoad(){
    this.loadMap();
  }

    loadMap(){

    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.currentLocation = latLng;

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker();

    }, (err) => {
      console.log(err);
    });

  }

  addMarker(){

  let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
  });

  let content = "<h4>Information!</h4>";

  this.addInfoWindow(marker, content);

}

addInfoWindow(marker, content){

  let infoWindow = new google.maps.InfoWindow({
    content: content
  });

  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });

}

findTransit(){
   var request = {
     location: this.currentLocation,
     radius: '5000',
     types: ['pub']
   };

   var service = new google.maps.places.PlacesService(this.map);
   service.nearbySearch(request, (results, status) => {
     if (status == google.maps.places.PlacesServiceStatus.OK) {
       for (var i = 0; i < results.length; i++) {
         var place = results[i];
         console.log(place.geometry.location);
         let marker = new google.maps.Marker({
           map: this.map,
           position: place.geometry.location
         });
         let content = "<h4>Information!</h4>";

  		  this.addInfoWindow(marker, content);
       }
     }
   }, (err) => {
      console.log(err);
    });

 }


}
