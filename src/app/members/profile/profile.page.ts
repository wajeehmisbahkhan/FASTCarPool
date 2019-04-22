import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertService } from 'src/app/services/alert.service';
import { User } from 'src/app/services/helper-classes';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: firebase.User;
  // Will be used to detect changes in input
  localCopy: User = new User;

  constructor(
    private db: DatabaseService,
    private auth: AuthenticationService,
    private alertService: AlertService
  ) {
    this.user = this.auth.user;
    // Make a local deep copy - simple assignment will make a shallow copy
    this.localCopy = JSON.parse(JSON.stringify(this.db.userData));
  }

  ngOnInit() {
  }

  valueChanged(): boolean {
    // Data loaded into local copy
    if (this.localCopy)
      return JSON.stringify(this.localCopy) !== JSON.stringify(this.db.userData);
    return false;
  }

  updateProfile(e: Event) {
    e.preventDefault();
    this.db.updateUserData(this.user, this.localCopy).then(() => {
      this.alertService.notice('Profile updated successfully!');
    });
  }

}
