import { Component, ViewChild, HostListener, EventEmitter, Output } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { ThemeService } from 'src/app/services/theme.service';
import { Location } from '../../services/helper-classes';

@Component({
  selector: 'google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent {

  // Themes
  public darkMap = [
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

  public lightMap = [];

  // Markers
  markers: Array<google.maps.Marker>;

  // Close previous window
  infoWindowOpened = null;
  previousInfoWindow = null;

  map: google.maps.Map;

  // Get reference to map element in html file
  @ViewChild('map') mapElement;

  // Output signals to info page
  @Output()
  screenDragged = new EventEmitter<number[]>();
  // Output signals to dashboard for click events
  @Output()
  userChipClicked = new EventEmitter<string[]>();
  @Output()
  pickupButtonClicked = new EventEmitter<string[]>();

  @HostListener('click', ['$event.target'])
  onClick(element: HTMLElement) {
    // View profile
    if (element.tagName === 'ION-CHIP') {
      this.closeWindow();
      this.userChipClicked.emit([element.textContent, element.getAttribute('data-email')]);
    }
    // Add or remove from pickup point
    if (element.classList[0] === 'pickup-button') {
      this.closeWindow();
      this.pickupButtonClicked.emit([element.id, element.getAttribute('data-location'), element.getAttribute('data-index')]);
    }
  }

  constructor(
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy,
    private themeService: ThemeService
    ) {
      this.markers = [];
      this.themeService.currentThemeIsDriver.subscribe(isDriver => {
        // Update map when theme changes
        if (this.map) {
          this.map.setOptions({
            styles: isDriver ? this.darkMap : this.lightMap
          });
        }
      });
    }

  initMap(mapOptions: google.maps.MapOptions) {
    // Init Map Code
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    // Close any info window on click
    this.map.addListener('click', () => this.selectMarker(null));
    // For map info marker dragging
    this.map.addListener('drag', () =>
      this.screenDragged.emit([this.map.getCenter().lat(), this.map.getCenter().lng()])
    );
  }

  // For quick event adding
  addEventListener(event: string, callBack: any) {
    this.map.addListener(event, callBack);
  }

  addMarker(position, icon?, content?) {
    // Marker
    const marker = new google.maps.Marker({
      position: position
    });
    if (icon) marker.setIcon(icon);
    marker.setMap(this.map);
    if (content) {
      // Info Window
      const infoWindow = new google.maps.InfoWindow({
        content: content
      });
      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
        this.selectMarker(infoWindow);
      });
    }
    this.markers.push(marker);
  }

  // TODO?: Implement in dashboard
  getMarker(index: number) {
    return this.markers[index];
  }

  getCurrentLocation() {
    return this.geolocation.getCurrentPosition();
  }

  getLiveLocation() {
    return this.geolocation.watchPosition();
  }

  // Confirm Location Access
  getAccurateLocation() {
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

  setLatLng(lat: number, lng: number) {
    this.map.setCenter(new google.maps.LatLng(lat, lng));
  }

  // Maps
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
