import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { MapsService } from '../../services/maps.service';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';

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

  lat = 0;
  lng = 0;

  constructor(
    private authService: AuthenticationService,
    private map: MapsService,
    private db: DatabaseService,
    private router: Router
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

  gotoPage(path: string) {
    this.router.navigateByUrl('members' + path);
  }

  logout () {
    this.authService.logout();
  }

}
