import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { MapsService } from '../../services/maps.service';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';
import { Location, UserLink } from 'src/app/services/helper-classes';
import { InfoWindow } from '@agm/core/services/google-maps-types';
import { ChatService } from 'src/app/services/chat.service';
import { AlertService } from 'src/app/services/alert.service';

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

  // Marker Location
  liveLat = 0;
  liveLng = 0;
  // Map location
  lat = 0;
  lng = 0;

  // Close previous window
  infoWindowOpened = null;
  previousInfoWindow = null;

  constructor(
    private authService: AuthenticationService,
    private map: MapsService,
    public db: DatabaseService,
    private router: Router,
    private cs: ChatService,
    private alertService: AlertService
  ) {
    // Check when authenticated
    this.authService.authState.subscribe(state => {
      if (state === true) {
        // Load all data
        this.alertService.load('Loading Your Data...', new Promise(async resolve => {
          await this.db.getUserData(this.authService.user.email);
          // User link for quick access
          this.db.userLink = new UserLink(this.authService.user.displayName, this.authService.user.email);
          // Load all chats
          await this.cs.loadMessages();
          resolve();
        }));
      }
    });
    // this.makePickup(24.9125912, 67.1398402, 'Sindh Baloch Society');
    // this.makePickup(24.923641, 67.137724, 'Kamran Chowrangi');
    // this.makePickup(24.920396, 67.134292, 'Munawar Chowrangi');
  }

  ngOnInit() {
    this.map.getCurrentLocation().then(resp => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
    });
    const watchId = this.map.getLiveLocation().subscribe(resp => {
      // Coordinates
      this.liveLat = resp.coords.latitude;
      this.liveLng = resp.coords.longitude;
      watchId.unsubscribe();
    });
    this.showPickups();
  }

  gotoPage(path: string) {
    this.router.navigateByUrl('members' + path);
  }

  logout () {
    this.authService.logout();
  }

  makePickup(lat: number, lng: number, name = 'Unnamed Place') {
    this.db.unionArray('app/pickups', 'locations', Object.assign({}, new Location(lat, lng, name)));
  }

  showPickups() {
    this.db.getPickups();
  }

  addedToLocation(addedAs: string, pickup: Location): boolean {
    // Check if added to drivers or riders
    if (pickup[addedAs])
      return pickup[addedAs].find(userLink => userLink['email'] === this.db.userLink.email);
    return false;
  }

  pickupUrl(pickup: Location, index: number): string {
    let color: string;
    // Look if added as driver or rider
    if (this.db.userData.isDriver)
      color = pickup.drivers.find(driver => driver['email'] === this.db.userLink.email) ? 'green' : 'blue';
    else
      color = pickup.riders.find(rider => rider['email'] === this.db.userLink.email) ? 'green' : 'blue';
    // Return green if added otherwise blue
    return `../../../assets/img/${color}_location.png`;
  }


  closeWindow() {
    if (this.previousInfoWindow != null )
      this.previousInfoWindow.close();
  }

  selectMarker(infoWindow: InfoWindow) {
    if (this.previousInfoWindow == null)
      this.previousInfoWindow = infoWindow;
    else {
      this.infoWindowOpened = infoWindow;
      this.previousInfoWindow.close();
    }
    this.previousInfoWindow = infoWindow;
  }


}
