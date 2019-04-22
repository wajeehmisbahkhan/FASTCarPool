import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingController } from '@ionic/angular';
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
    this.db.getUserData(this.user.email).then(userData => {
      // Make a local deep copy - simple assignment will make a shallow copy
      // TODO: No need for loading
      this.localCopy = JSON.parse(JSON.stringify(userData));
      this.lc.dismiss();
    });
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
