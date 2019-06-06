import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private db: DatabaseService,
    private alertService: AlertService
  ) { }

  ngOnInit() {

  }

  async createUser() {
    // Make place in database
    try {
      await this.db.createNewUser(this.user.displayName, this.user.email);
    } catch (err) {
      this.alertService.error(err);
      return;
    }
  }

  get user() {
    return this.authService.user;
  }
}
