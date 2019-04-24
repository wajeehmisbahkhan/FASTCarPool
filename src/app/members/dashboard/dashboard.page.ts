import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { MapsService } from '../../services/maps.service';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';
import { Location, UserLink } from 'src/app/services/helper-classes';
import { AlertService } from 'src/app/services/alert.service';
import { ChatService } from 'src/app/services/chat.service';

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

  // Default location
  lat = 0;
  lng = 0;

  pickups: Array<Location>;

  // User link for quick access
  userLink: UserLink;

  constructor(
    private authService: AuthenticationService,
    private map: MapsService,
    public db: DatabaseService,
    private cs: ChatService,
    private router: Router,
    private alertService: AlertService
  ) {
    // Check when authenticated
    this.authService.userState.subscribe(state => {
      if (state === true) {
        this.db.getUserData(this.authService.user.email);
        // User link for quick access
        this.userLink = new UserLink(this.authService.user.displayName, this.authService.user.email);
      }
    });
    // this.makePickup(24.9125912, 67.1398402, 'Sindh Baloch Society');
    // this.makePickup(24.923641, 67.137724, 'Kamran Chowrangi');
    // this.makePickup(24.920396, 67.134292, 'Munawar Chowrangi');
  }

  ngOnInit() {
    const watchId = this.map.getLiveLocation().subscribe(resp => {
      // Coordinates
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
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
    this.db.getLiveDoc('app/pickups').subscribe(pickups => {
      this.pickups = pickups.payload.data()['locations'];
    });
  }

  addDriver(pickup: Location, index: number) {
    // Confirm
    this.alertService.confirmation(`Confirm this message if you pass by ${pickup.name} and can pickup riders from here.\n
    Note: This will allow riders to contact you through this pickup point.`, () => {
      // Add locally
      pickup.drivers.push(this.userLink);
      this.pickups[index] = pickup;
      // Update in database
      this.alertService.load('Adding you as a driver...',
      this.db.updateDoc('app/pickups', {locations: JSON.parse(JSON.stringify(this.pickups))}) );
    });
  }

  removeDriver(pickup: Location, index: number) {
    // Confirm
    this.alertService.confirmation(`Do you want to remove yourself from the list of drivers for ${pickup.name}?`, () => {
      // Remove locally
      pickup.drivers = pickup.drivers.filter( (driver) => driver.email !== this.userLink.email );
      this.pickups[index] = pickup;
      // Update in database
      this.alertService.load('Removing from drivers list',
      this.db.updateDoc('app/pickups', {locations: JSON.parse(JSON.stringify(this.pickups))}) );
    });
  }

  addRider(pickup: Location, index: number) {
    // Confirm
    this.alertService.confirmation(`Confirm this message if you can make it to ${pickup.name}.\n
    Note: This will allow drivers passing by to contact you through this pickup point.`, () => {
      // Add locally
      pickup.riders.push(this.userLink);
      this.pickups[index] = pickup;
      // Update in database
      this.alertService.load('Adding as rider...',
      this.db.updateDoc('app/pickups', {locations: JSON.parse(JSON.stringify(this.pickups))}) );
    });
  }

  // TODO: Being repeated in database OPTIMIZE
  removeRider(pickup: Location, index: number) {
    // Confirm
    this.alertService.confirmation(`Do you want to remove yourself from the list of riders for ${pickup.name}?`, () => {
      // Remove locally
      pickup.riders = pickup.riders.filter( (rider) => rider.email !== this.userLink.email );
      this.pickups[index] = pickup;
      // Update in database
      this.alertService.load('Removing from riders list',
      this.db.updateDoc('app/pickups', {locations: JSON.parse(JSON.stringify(this.pickups))}) );
    });
  }

  addedToLocation(addedAs: string, pickup: Location): boolean {
    // Check if added to drivers or riders
    if (pickup[addedAs])
      return pickup[addedAs].find(userLink => userLink['email'] === this.userLink.email);
    return false;
  }

  pickupUrl(pickup: Location, index: number): string {
    let color: string;
    // Look if added as driver or rider
    if (this.db.userData.isDriver)
      color = pickup.drivers.find(driver => driver['email'] === this.userLink.email) ? 'green' : 'blue';
    else
      color = pickup.riders.find(rider => rider['email'] === this.userLink.email) ? 'green' : 'blue';
    // Return green if added otherwise blue
    return `../../../assets/img/${color}_location.png`;
  }






  // TODO: Close previous window
  infoWindowOpened = null
previous_info_window = null
close_window(){
if (this.previous_info_window != null ) {
  this.previous_info_window.close()
  }    
}

select_marker(data,infoWindow){
 if (this.previous_info_window == null)
  this.previous_info_window = infoWindow;
 else{
  this.infoWindowOpened = infoWindow
  this.previous_info_window.close()
 }
 this.previous_info_window = infoWindow
}


}
