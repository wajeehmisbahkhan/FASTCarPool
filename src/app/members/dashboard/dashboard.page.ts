import { AuthenticationService } from './../../services/authentication.service'
import { Component, OnInit } from '@angular/core';
import { GoogleMapComponent } from 'src/app/services/google-map/google-map.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private googleMap: GoogleMapComponent
  ) { }

  ngOnInit() {
  }

  logout () {
    this.authService.logout();
  }

}
