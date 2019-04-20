import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { MapsService } from '../../services/maps.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileForm: FormGroup;

  user: firebase.User;
  userData = {
    driver: false,
    status: null,
    home: { // Karachi for now
      lat: 24.8607,
      lng: 67.0011
    }
  };

  constructor(
    private lc: LoadingController,
    private db: DatabaseService,
    private auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {
    this.profileForm = this.formBuilder.group({
      driver: [''],
      status: ['', [Validators.required, Validators.maxLength(100)]] // TODO: Indicate error
    });
    const loading = this.lc.create({
      message: 'Loading Profile...'
    });
    loading.then(loader => {
      loader.present();
    });
    this.user = this.auth.user;
    this.db.getDoc('users/' + this.user.email).subscribe(doc => {
      // Driver
      this.userData['driver'] = doc.data().driver;
      this.profileForm.controls['driver'].setValue(this.userData['driver']);

      // Status
      this.userData['status'] = doc.data().status;
      this.profileForm.controls['status'].setValue(this.userData['status']);
      this.lc.dismiss();
    });
  }

  ngOnInit() {
  }

  valueChanged(): boolean {
    if (this.userData['status'])
      return this.userData['status'].trim() === this.profileForm.controls['status'].value.trim()
      &&     this.userData['driver'] === this.profileForm.controls['driver'].value;
    return false;
  }

  updateProfile() {
    // TODO: Optimize u lazy boi
    if (this.userData['status'] !== this.profileForm.controls['status'].value) {
      this.userData['status'] = this.profileForm.controls['status'].value;
      this.db.updateDoc(`users/${this.user.email}`, {status: this.userData['status']});
    }

    if (this.userData['driver'] !== this.profileForm.controls['driver'].value) {
      this.userData['driver'] = this.profileForm.controls['driver'].value;
      this.db.updateDoc(`users/${this.user.email}`, {driver: this.userData['driver']});
    }

    this.alertService.notice('Profile updated successfully');
  }

}
