import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { MapsService } from '../../services/maps.service';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';
import { Coordinate } from 'src/app/services/helper-classes';

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

  // Pickups
  lat = 0;
  lng = 0;

  pickups: Array<Coordinate>;

  constructor(
    private authService: AuthenticationService,
    private map: MapsService,
    private db: DatabaseService,
    private router: Router
  ) {
    this.makePickup();
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

  makePickup() {
    this.db.unionArray('app/pickups', 'locations', {
      lat: 24.74,
      lng: 67.25
    });
  }

  showPickups() {
    this.db.getDoc('app/pickups').subscribe(pickups => {
      this.pickups = pickups.data().locations;
    });
  }

}
