import { Component, ViewChild, HostListener, EventEmitter, Output } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

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

  // Close previous window
  infoWindowOpened = null;
  previousInfoWindow = null;

  map: any;

  // Get reference to map element in html file
  @ViewChild('map') mapElement;

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
    private geolocation: Geolocation
    ) { }

  initMap(mapOptions: google.maps.MapOptions) {
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    // Close any info window on click
    this.map.addListener('click', () => this.selectMarker(null));
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
  }

  test() {
    console.log('asd');
  }

  getCurrentLocation() {
    return this.geolocation.getCurrentPosition();
  }

  getLiveLocation() {
    return this.geolocation.watchPosition();
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
