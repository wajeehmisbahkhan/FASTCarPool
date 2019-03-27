import { AuthenticationService } from './../../services/authentication.service'
import { Component, OnInit } from '@angular/core';
import { MapsService } from '../../services/maps.service';
import { DatabaseService } from '../../services/database.service';

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

  lat: number = 0;
  lng: number = 0;

  constructor(
    private authService: AuthenticationService,
    private map: MapsService,
    private db: DatabaseService
  ) { }

  ngOnInit() {
    this.map.getLiveLocation().subscribe(resp => {
      // Coordinates
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
    });
    // this.map.getCurrentLocation().then(resp => {
    //   // Coordinates
    //   this.lat = resp.coords.latitude;
    //   this.lng = resp.coords.longitude;
    // }).catch(console.error);
  }

  logout () {
    this.authService.logout();
  }

}
