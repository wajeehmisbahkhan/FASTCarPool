import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { Location } from '@angular/common';
import { GoogleMapComponent } from '../google-map/google-map.component';

@Component({
  selector: 'google-map-input',
  templateUrl: './google-map-input.component.html',
  styleUrls: ['./google-map-input.component.scss'],
})
export class GoogleMapInputComponent implements OnInit {

  // Map reference
  @ViewChild('map') map: GoogleMapComponent;
  // Search
  @ViewChild('search') search: IonSearchbar;

  // Comes from info page or profile page
  @Input() lat: number;
  @Input() lng: number;

  constructor(
    private mc: ModalController
  ) { }

  async ngOnInit() {
    // Default location opened
    this.goToLocation(this.lat, this.lng);
    // Set map center
    this.map.centerCoordinates.lat = this.lat;
    this.map.centerCoordinates.lng = this.lng;
    // Focus since keyboard is opening
    this.search.setFocus();
    // Search box init
    const searchElement = await this.search.getInputElement();
    const autocomplete = new google.maps.places.Autocomplete(searchElement, {
      types: ['address']
    });
    autocomplete.addListener('place_changed', () => {
      const place: google.maps.places.PlaceResult = autocomplete.getPlace();

      // verify result
      if (place.geometry === undefined || place.geometry === null) {
          return;
      }

      this.search.value = place.name;

      // go to lat and lng
      this.goToLocation(place.geometry.location.lat(), place.geometry.location.lng());
    });
  }

  goToLocation(lat: number, lng: number) {
    // Update map coordinates
    this.map.mapCoordinates.lat = lat;
    this.map.mapCoordinates.lng = lng;
  }

  // Confirm Location
  async confirmAddress() {
    const address: string = await this.map.getAddress(this.map.centerCoordinates.lat, this.map.centerCoordinates.lng);
    this.mc.dismiss({
      address,
      lat: this.map.centerCoordinates.lat,
      lng: this.map.centerCoordinates.lng
    });
  }

  // Cancel
  goBack() {
    this.mc.dismiss();
  }

}
