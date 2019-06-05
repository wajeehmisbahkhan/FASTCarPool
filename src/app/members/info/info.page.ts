import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
  }


  get user() {
    return this.authService.user;
  }
}
