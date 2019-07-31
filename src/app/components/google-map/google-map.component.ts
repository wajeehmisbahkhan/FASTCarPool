import { Component, ViewChild, HostListener, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { ThemeService } from 'src/app/services/theme.service';
import { Location, Coordinate } from '../../services/helper-classes';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertService } from 'src/app/services/alert.service';
import { LatLngLiteral } from '@agm/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnDestroy {

  // Themes
  darkMap = [
    {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{color: '#263c3f'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{color: '#6b9a76'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#38414e'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{color: '#212a37'}]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9ca5b3'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#746855'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{color: '#1f2835'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{color: '#f3d19c'}]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{color: '#2f3948'}]
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{color: '#17263c'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#515c6d'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{color: '#17263c'}]
    }
  ];
  lightMap = [];
  isDriver = false; // Dark theme and other displays depend on this

  // For Map
  mapCoordinates: Coordinate;
  @Input() zoom = 14; // Default zoom

  // For Markers
  positionCoordinates: Coordinate;
  centerCoordinates: Coordinate;
  @Input() pickupLocations: Array<Location>;

  @Input() showCenter: boolean;

  // Close previous window
  infoWindowOpened = null;
  previousInfoWindow = null;

  // Garbage collection
  positionSubscription: Subscription;

  constructor(
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy,
    private themeService: ThemeService,
    public db: DatabaseService,
    private alertService: AlertService
  ) {
    // Default assumed positions (Karachi)
    this.mapCoordinates = new Coordinate(24.8607, 67.0011);
    this.positionCoordinates = new Coordinate(24.8607, 67.0011);
    this.centerCoordinates = new Coordinate(24.8607, 67.0011);
    this.showCenter = false;
    // Attempt location access
    this.getLocationAccess().then(this.setAllCoordinates).catch(err => {
      // TODO: Handle error
      if (err === 'cordova_not_available') {
        // Specific for browser testing
        this.setAllCoordinates();
      }
    });
    // Default pickups are empty
    this.pickupLocations = [];
    // Update driver (theme) and other stuff if any change
    this.themeService.currentThemeIsDriver.subscribe(isDriver => {
      this.isDriver = isDriver;
    });
  }

  // Got permission for location
  async setAllCoordinates() {
    const currentLocation = await this.getCurrentLocation();
    // Set map and position
    this.mapCoordinates.lat = currentLocation.coords.latitude;
    this.mapCoordinates.lng = currentLocation.coords.longitude;
    this.positionCoordinates.lat = currentLocation.coords.latitude;
    this.positionCoordinates.lng = currentLocation.coords.longitude;
    // Keep updating position
    this.positionSubscription = this.getLiveLocation().subscribe(position => {
      this.positionCoordinates.lat = position.coords.latitude;
      this.positionCoordinates.lng = position.coords.longitude;
    });
  }

<<<<<<< HEAD
  ngOnDestroy() {
    this.positionSubscription.unsubscribe();
  }

  getCurrentLocation() {
    return this.geolocation.getCurrentPosition();
=======
  mapCenter() {
    // const currentLocation = await this.getCurrentLocation();
    // Set map position to center
    this.mapCoordinates.lat = this.positionCoordinates.lat;
    this.mapCoordinates.lng = this.positionCoordinates.lng;
    this.centerCoordinates.lat = this.positionCoordinates.lat;
    this.centerCoordinates.lng = this.positionCoordinates.lng;
    console.log('location centered!');
    console.log(this.mapCoordinates);
    console.log(this.centerCoordinates);
    console.log(this.positionCoordinates);
  }

  async getCurrentLocation() {
    return await this.geolocation.getCurrentPosition();
>>>>>>> features
  }

  getLiveLocation() {
    return this.geolocation.watchPosition();
  }

  // Confirm Location Access
  getLocationAccess() {
    return new Promise((resolve, reject) => {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
        .then(() => {
          resolve();
        }, reject); // Error while asking for permission
      } else reject({ // Error before even asking
          code: 603,
          message: 'Error detecting location settings'
        });
    }).catch(reject);
    });
  }

  centerChange(latLng: LatLngLiteral) {
    this.centerCoordinates.lat = latLng.lat;
    this.centerCoordinates.lng = latLng.lng;
  }

  getAddress(lat: number, lng: number) {
    return new Promise<string>((resolve, reject) => {
      // For lat lng to address
      const geocoder = new google.maps.Geocoder;
      // Reverse geocoding
      geocoder.geocode({
        location: new google.maps.LatLng(lat, lng)
      }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          // Result is the first elemnt
          const result = results[0];
          if (result !== null) {
            resolve(result.formatted_address);
            return;
          }
          reject({
            code: 702,
            message: 'Geocoding result is null.'
          });
          return;
        }
        reject({
          code: 701,
          message: 'Geocoding status is not OK'
        });
      });
    });
  }

  // Nearby points for a given point - maxReach defaults to 1000 meters
  getNearbyPoints(position, pickups: Array<Location>, maxReach?: number) {
    if (!maxReach) maxReach = 1000;
    const nearbyPoints = [];
    const homePosition = new google.maps.LatLng(position.lat, position.lng);
    pickups.forEach(pickup => {
      const pickupPosition = new google.maps.LatLng(pickup.lat, pickup.lng);
      // TODO: Store distance between each pickup point to add preference for nearby pickup point
      if (google.maps.geometry.spherical.computeDistanceBetween(homePosition, pickupPosition) <= maxReach) {
        nearbyPoints.push(pickup);
      }
    });
    return nearbyPoints;
  }

  // Specific functions for pickups
  pickupUrl(pickup: Location) {
    let color: string;
    // Look if added as driver or rider
    if (this.db.userData.isDriver)
      color = pickup.drivers.find(driver => driver['email'] === this.db.userLink.email) ? 'green' : 'blue';
    else
      color = pickup.riders.find(rider => rider['email'] === this.db.userLink.email) ? 'green' : 'blue';
    // Return green if added otherwise blue
    return `../../../assets/img/${color}_location.png`;
  }

  addedToLocation(addedAs: string, pickup: Location): boolean {
    // Check if added to drivers or riders
    if (pickup[addedAs])
      return pickup[addedAs].find(userLink => userLink['email'] === this.db.userLink.email);
    return false;
  }

  addRider(pickup: Location) {
    // Confirmation
    this.alertService.confirmation(`Confirm this message if you can make it to ${pickup.name}.\n
    Note: This will allow drivers passing by to contact you through this pickup point.`, () => {
      // Adding
      this.db.addRider(pickup).catch(this.alertService.error.bind(this.alertService));
      // Close info window
      this.closeWindow();
    });
  }

  removeRider(pickup: Location) {
    // Confirm
    this.alertService.confirmation(`Do you want to remove yourself from the list of riders for ${pickup.name}?`, () => {
      // Removing
      this.db.removeRider(pickup).catch(this.alertService.error.bind(this.alertService));
      // Close info window
      this.closeWindow();
    });
  }

  addDriver(pickup: Location) {
    // Confirm
    this.alertService.confirmation(`Confirm this message if you pass by ${pickup.name} and can pickup riders from here.\n
    Note: This will allow riders to contact you through this pickup point.`, () => {
      // Adding
      this.db.addDriver(pickup).catch(this.alertService.error.bind(this.alertService));
      // Close info window
      this.closeWindow();
    });
  }

  removeDriver(pickup: Location) {
    // Confirm
    this.alertService.confirmation(`Do you want to remove yourself from the list of drivers for ${pickup.name}?`, () => {
      // Removing
      this.db.removeDriver(pickup).catch(this.alertService.error.bind(this.alertService));
      // Close info window
      this.closeWindow();
    });
  }

  // Track by - for better performance of ngfor
  pickupLocationTracker(index: number, pickup: Location) {
    return index; // We can track by the index since pickup locations will not be rearranged
  }

  // Info Window
  closeWindow() {
    if (this.previousInfoWindow)
      this.previousInfoWindow.close();
    this.previousInfoWindow = null;
  }

  selectMarker(infoWindow: google.maps.InfoWindow) {
    if (this.previousInfoWindow == null)
      this.previousInfoWindow = infoWindow;
    else {
      this.infoWindowOpened = infoWindow;
      this.previousInfoWindow.close();
    }
    this.previousInfoWindow = infoWindow;
  }

}
