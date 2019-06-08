import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  // Map reference
  @ViewChild('map') map;

  lat: number;
  lng: number;

  // Marker animation
  markerLifted = false;
  markerLiftHeight = 0.0003;

  constructor() { }

  ngOnInit() {
    this.map.getCurrentLocation().then(resp => {
      // Map coords will update once when map location is enabled
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      const mapOptions: google.maps.MapOptions = {
        center: new google.maps.LatLng(this.lat, this.lng),
        zoom: 16,
        maxZoom: 16,
        minZoom: 16,
        disableDefaultUI: true,
        clickableIcons: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        // styles: this.db.userData.isDriver ? this.map.darkMap : this.map.lightMap
      };
      this.map.initMap(mapOptions);
      // Add marker for live location
      this.map.addMarker(new google.maps.LatLng(this.lat, this.lng));
      // Main marker up and down animation
      this.map.addEventListener('mousedown', () => {
        if (!this.markerLifted) {
          const mainMarker = this.map.getMarker(0) as google.maps.Marker;
          mainMarker.setPosition({
            lat: mainMarker.getPosition().lat() + this.markerLiftHeight,
            lng: mainMarker.getPosition().lng()
          });
          this.markerLifted = true;
        }
      });
      this.map.addEventListener('mouseup', () => {
        if (this.markerLifted) {
          const mainMarker = this.map.getMarker(0) as google.maps.Marker;
          mainMarker.setPosition({
            lat: mainMarker.getPosition().lat() - this.markerLiftHeight,
            lng: mainMarker.getPosition().lng()
          });
          this.markerLifted = false;
        }
      });
    }, console.error);
  }

  // Update main marker according to center of map
  updateMarkerPosition(position: number[]) {
    const mainMarker = this.map.getMarker(0) as google.maps.Marker;
    mainMarker.setPosition({
      lat: position[0] + this.markerLiftHeight,
      lng: position[1]
    });
  }

}
