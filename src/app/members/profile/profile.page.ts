import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { User, UserLink } from 'src/app/services/helper-classes';

import { isEqual } from 'lodash';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: firebase.User;
  userData = new User;
  // Will be used to detect changes in input
  localCopy: User;

  constructor(
    private lc: LoadingController,
    private db: DatabaseService,
    private auth: AuthenticationService,
    private alertService: AlertService
  ) {
    const loading = this.lc.create({
      message: 'Loading Profile...'
    });
    loading.then(loader => {
      loader.present();
    });
    this.user = this.auth.user;
    this.db.getDoc('users/' + this.user.email).subscribe(doc => {
      // Copying all data
      this.userData.isDriver = doc.data().isDriver;
      this.userData.status = doc.data().status;
      this.userData.schedule = doc.data().schedule;
      this.userData.car = doc.data().car;
      // Rates are special case for now
      this.userData.rate.oneway = doc.data().price;
      // Make a local deep copy - simple assignment will make a shallow copy
      this.localCopy = JSON.parse(JSON.stringify(this.userData));
      this.lc.dismiss();
    });
  }

  ngOnInit() {
  }

  valueChanged(): boolean {
    // Data loaded into local copy
    if (this.localCopy)
      return JSON.stringify(this.localCopy) !== JSON.stringify(this.userData);
    return false;
  }

  updateProfile(e: Event) {
    e.preventDefault();
    this.db.updateDoc(`users/${this.user.email}`, this.userData.toObject());
    // If driver changed
    if (this.userData.isDriver !== this.localCopy.isDriver) {
      if (this.userData.isDriver) {
        // Add to drivers
        this.db.unionArray('app/users', 'drivers', Object.assign({}, new UserLink(this.user.displayName, this.user.email)));
      } else {
        // Remove from drivers
        this.db.arrayRemove('app/users', 'drivers', Object.assign({}, new UserLink(this.user.displayName, this.user.email)));
      }
    }
    this.localCopy = JSON.parse(JSON.stringify(this.userData));
    this.alertService.notice('Profile updated successfully!');
  }

}
