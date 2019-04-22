import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { MapsService } from '../../services/maps.service';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';
import { Location, UserLink } from 'src/app/services/helper-classes';

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

  constructor(
    private authService: AuthenticationService,
    private map: MapsService,
    private db: DatabaseService,
    private router: Router
  ) {
    // Check when authenticated
    this.authService.userState.subscribe(state => {
      if (state === true) {
        this.db.getUserData(this.authService.user.email);
      }
    });
    // this.makePickup(24.920396, 67.134292, 'Munawar Chowrangi');
  }

  ngOnInit() {
    this.map.getLiveLocation().subscribe(resp => {
      // Coordinates
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
    });
    this.showPickups();
    // this.map.getCurrentLocation().then(resp => {
    //   // Coordinates
    //   this.lat = resp.coords.latitude;
    //   this.lng = resp.coords.longitude;
    // }).catch(console.error);
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
    this.db.getDoc('app/pickups').subscribe(pickups => {
      this.pickups = pickups.data().locations;
    });
  }

  addDriver(pickup: Location) {
    pickup.addDriver(new UserLink(this.authService.user.displayName, this.authService.user.email));
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
