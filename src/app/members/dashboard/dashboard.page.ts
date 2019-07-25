import { AuthenticationService } from './../../services/authentication.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';
import { Location, UserLink, UserData } from 'src/app/services/helper-classes';
import { ChatService } from 'src/app/services/chat.service';
import { AlertService } from 'src/app/services/alert.service';
import { GoogleMapComponent } from 'src/app/components/google-map/google-map.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  // Menu
  public appPages = [
    {
      title: 'My Profile',
      url: '/profile',
      icon: 'person'
    },
    {
      title: 'Messages',
      url: '/messages',
      icon: 'mail'
    }
  ];

  // Map reference
  @ViewChild('map') map: GoogleMapComponent;
  // Map location
  lat = 0;
  lng = 0;
  // updated = false;
  // Marker Location
  liveLat = 0;
  liveLng = 0;

  constructor(
    private authService: AuthenticationService,
    public db: DatabaseService,
    private router: Router,
    private cs: ChatService,
    private alertService: AlertService
  ) {
    // Load all chats live - will detect any new chat
    cs.loadChats();
  }

  ngOnInit() {
    // Enable location
    this.map.getAccurateLocation().then(this.initMap.bind(this)).catch(err => {
      if (err === 'cordova_not_available') { // Special case for testing purposes
        this.initMap();
      } else
        this.alertService.error.bind(this.alertService, [err]);
    });
  }

  initMap() {
    this.map.getCurrentLocation()
    .then(resp => {
      // Get location first time
      this.liveLat = this.lat = resp.coords.latitude;
      this.liveLng = this.lng = resp.coords.longitude;
      // this.updated = true;
      const mapOptions: google.maps.MapOptions = {
        center: new google.maps.LatLng(this.lat, this.lng),
        zoom: 14,
        disableDefaultUI: true,
        clickableIcons: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: this.db.userData.isDriver ? this.map.darkMap : this.map.lightMap
      };
      this.map.initMap(mapOptions);
      this.showPickups();
      return;
    }).then(() => {
      // Subscribe for changes in current position
      this.map.getLiveLocation().subscribe(resp => {
        // Position marker will keep changing
        this.liveLat = resp.coords.latitude;
        this.liveLng = resp.coords.longitude;
        const position = new google.maps.LatLng(this.liveLat, this.liveLng);
        // Relocate live location marker if already added
        const positionMarker = this.map.markers.find(marker => !marker.getIcon());
        if (positionMarker) {
          positionMarker.setPosition(position);
        } else
        // Add marker for live location
        this.map.addMarker(position);
      }, console.error);
    }).catch(this.alertService.error.bind(this.alertService));
  }

  gotoPage(path: string) {
    this.map.closeWindow();
    this.router.navigateByUrl('members' + path);
  }

  logout () {
    this.db.theme.setTheme(false);
    this.db.logout();
    this.db.ngOnDestroy();
    this.cs.ngOnDestroy();
    this.authService.logout();
    console.log('logged out');
  }

  showPickups() {
    return new Promise((resolve, reject) =>
    this.db.getLivePickups().subscribe(pickups => {
      // Show each pickup point
      pickups.forEach((pickup, index) => {
        // Lat Lng
        const latLng = new google.maps.LatLng(pickup.lat, pickup.lng);
        // Icon URL
        let color: string;
        // Look if added as driver or rider
        if (this.db.userData.isDriver)
          color = pickup.drivers.find(driver => driver['email'] === this.db.userLink.email) ? 'green' : 'blue';
        else
          color = pickup.riders.find(rider => rider['email'] === this.db.userLink.email) ? 'green' : 'blue';
        // Use green if added otherwise blue
        const icon = `../../../assets/img/${color}_location.png`;
        // Content
        let content = `<h3>${pickup.name}</h3>`;
        // Show if user is rider
        if (!this.db.userData.isDriver) {
          if (pickup.drivers.length === 0) {
            content += '<p>There are currently no drivers who pass by this point.</p>';
          } else {
            content += `<b>Tap to see driver's profile: </b>`;
            pickup.drivers.forEach(driver => {
              content += `
              <span>
              <ion-chip data-email="${driver.email}">${driver.name}</ion-chip>
              </span>
              `;
            });
          }
          // Button
          if (!this.addedToLocation('riders', pickup)) {
            content += `
            <ion-button class="pickup-button" id="addRider" size="small" expand="block"
            data-location='${JSON.stringify(pickup)}' data-index="${index}">
            I can be picked up<br>from this location
            </ion-button>
            `;
          } else {
            content  += `
            <ion-button class="pickup-button" id="removeRider" size="small" expand="block"
            data-location='${JSON.stringify(pickup)}' data-index="${index}">
              Added Successfully<br>As Rider
            </ion-button>
            `;
          }
        } else {
          if (pickup.riders.length === 0) {
            content += '<p>There are currently no riders who can make it to this point.</p>';
          } else {
            content += `<b>Tap to see rider's profile: </b><br>`;
            pickup.riders.forEach(rider => {
              content += `
              <span>
              <ion-chip data-email="${rider.email}">${rider.name}</ion-chip>
              </span>
              `;
            });
          }
          // Button
          if (!this.addedToLocation('drivers', pickup)) {
            content += `
            <ion-button class="pickup-button" id="addDriver" size="small" expand="block"
            data-location='${JSON.stringify(pickup)}' data-index="${index}">
              I can pickup riders<br>from this location
            </ion-button>
            `;
          } else {
            content  += `
            <ion-button class="pickup-button" id="removeDriver" size="small" expand="block"
            data-location='${JSON.stringify(pickup)}' data-index="${index}">
              Added Successfully<br>As Driver
            </ion-button>
            `;
          }
        }
        // Add to map
        this.map.addMarker(latLng, icon, content);
      });
      resolve();
    }, reject));
  }

  viewProfile(userInfo: string[]) {
    this.router.navigateByUrl('members/view');
    this.db.getUserView(new UserLink(userInfo[0], userInfo[1]));
  }

  addedToLocation(addedAs: string, pickup: Location): boolean {
    // Check if added to drivers or riders
    if (pickup[addedAs])
      return pickup[addedAs].find(userLink => userLink['email'] === this.db.userLink.email);
    return false;
  }

  pickupClicked(pickupInfo: string[]) {
    // Execute -> id(location, index)
    this[pickupInfo[0]](JSON.parse(pickupInfo[1]), parseInt(pickupInfo[2], 10));
  }

  addRider(pickup: Location, index: number) {
    // Confirmation
    this.alertService.confirmation(`Confirm this message if you can make it to ${pickup.name}.\n
    Note: This will allow drivers passing by to contact you through this pickup point.`, () => {
      // Adding
      this.alertService.load('Adding as rider...', this.db.addRider(pickup, index).catch(this.alertService.error));
    });
  }

  removeRider(pickup: Location, index: number) {
    // Confirm
    this.alertService.confirmation(`Do you want to remove yourself from the list of riders for ${pickup.name}?`, () => {
      this.alertService.load('Removing from riders list', this.db.removeRider(pickup, index));
    });
  }

  addDriver(pickup: Location, index: number) {
    // Confirm
    this.alertService.confirmation(`Confirm this message if you pass by ${pickup.name} and can pickup riders from here.\n
    Note: This will allow riders to contact you through this pickup point.`, () => {
      // Load
      this.alertService.load('Adding you as a driver...', this.db.addDriver(pickup, index));
    });
  }

  removeDriver(pickup: Location, index: number) {
    // Confirm
    this.alertService.confirmation(`Do you want to remove yourself from the list of drivers for ${pickup.name}?`, () => {
      // Load
      this.alertService.load('Removing from drivers list', this.db.removeDriver(pickup, index));
    });
  }


}
