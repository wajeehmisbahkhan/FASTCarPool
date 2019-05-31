import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { MapsService } from '../../services/maps.service';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';
import { Location, UserLink, User } from 'src/app/services/helper-classes';
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
    public map: MapsService,
    public db: DatabaseService,
    private router: Router,
    private cs: ChatService,
    private alertService: AlertService
  ) {
    // Load all chats live
    db.getLiveDoc(`users/${db.userLink.email}`).subscribe(
      doc => db.userData.chats = doc.payload.data()['chats'],
      err => this.alertService.error.bind(this.alertService, err)
    );
    // Update all messages within chats
    cs.loadMessages();
  }

  ngOnInit() {
    this.map.getLiveLocation().subscribe(resp => {
      // Map coords will update once
      if (this.lat === 0 && this.lng === 0) {
        this.lat = resp.coords.latitude;
        this.lng = resp.coords.longitude;
      }
      // Position marker will keep changing
      this.liveLat = resp.coords.latitude;
      this.liveLng = resp.coords.longitude;
    });
    this.showPickups();
  }

  gotoPage(path: string) {
    if (this.previousInfoWindow)
      this.closeWindow();
    this.router.navigateByUrl('members' + path);
  }

  logout () {
    this.db.theme.setTheme(false);
    this.db.ngOnDestroy();
    this.cs.ngOnDestroy();
    this.authService.logout();
  }

  // Pikcups
  makePickup(lat: number, lng: number, name = 'Unnamed Place') {
    this.db.unionArray('app/pickups', 'locations', Object.assign({}, new Location(lat, lng, name))).catch(this.alertService.error);
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

  addRider(pickup: Location, index: number) {
    // Confirmation
    this.alertService.confirmation(`Confirm this message if you can make it to ${pickup.name}.\n
    Note: This will allow drivers passing by to contact you through this pickup point.`, () => {
      // Adding
      this.alertService.load('Adding as rider...', this.db.addRider(pickup, index).catch(this.alertService.error));
      this.closeWindow();
    });
  }

  removeRider(pickup: Location, index: number) {
    // Confirm
    this.alertService.confirmation(`Do you want to remove yourself from the list of riders for ${pickup.name}?`, () => {
      this.alertService.load('Removing from riders list', this.db.removeRider(pickup, index));
      this.closeWindow();
    });
  }

  addDriver(pickup: Location, index: number) {
    // Confirm
    this.alertService.confirmation(`Confirm this message if you pass by ${pickup.name} and can pickup riders from here.\n
    Note: This will allow riders to contact you through this pickup point.`, () => {
      // Load
      this.alertService.load('Adding you as a driver...', this.db.addDriver(pickup, index));
      this.closeWindow();
    });
  }

  removeDriver(pickup: Location, index: number) {
    // Confirm
    this.alertService.confirmation(`Do you want to remove yourself from the list of drivers for ${pickup.name}?`, () => {
      // Load
      this.alertService.load('Removing from drivers list', this.db.removeDriver(pickup, index));
      this.closeWindow();
    });
  }

  // Maps
  closeWindow() {
    if (this.previousInfoWindow)
      this.previousInfoWindow.close();
    this.previousInfoWindow = null;
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
