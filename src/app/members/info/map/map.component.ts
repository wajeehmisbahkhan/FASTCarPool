import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  // Map reference
  @ViewChild('map') map;
  // Search
  @ViewChild('search') search: IonSearchbar;

  @Input() lat: number;
  @Input() lng: number;

  // Marker animation
  markerLifted = false;
  markerLiftHeight = 0.00025;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.route.paramMap.subscribe(params => {
      this.lat = parseFloat(params.get('lat'));
      this.lng = parseFloat(params.get('lng'));
    });
  }

  async ngOnInit() {
    this.search.setFocus();
    // If position not set
    if (this.lat === 0 && this.lng === 0)
      this.map.getCurrentLocation().then(this.initMap.bind(this));
    else
      this.initMap({
        coords: {
          latitude: this.lat,
          longitude: this.lng
        }
      });
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
    // Update marker
    const mainMarker = this.map.getMarker(0) as google.maps.Marker;
    mainMarker.setPosition({
      lat: lat,
      lng: lng
    });
    // Update map
    this.map.setLatLng(lat, lng);
  }

  initMap(resp) {
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
  }

  // Update main marker according to center of map
  updateMarkerPosition(position: number[]) {
    const mainMarker = this.map.getMarker(0) as google.maps.Marker;
    mainMarker.setPosition({
      lat: position[0] + this.markerLiftHeight,
      lng: position[1]
    });
    this.lat = position[0];
    this.lng = position[1];
  }

  // Confirm Location
  async confirmAddress() {
    const address: string = await this.map.getAddress(this.lat, this.lng);
    this.router.navigate(['members', 'info', address, this.lat, this.lng]);
  }

  // Cancel
  goBack() {
    this.location.back();
  }

}
