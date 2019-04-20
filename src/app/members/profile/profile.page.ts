import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { User } from 'src/app/services/helper-classes';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileForm: FormGroup;
  user: firebase.User;
  userData = new User;
  // Will be used to detect changes in input
  localCopy = new User;

  constructor(
    private lc: LoadingController,
    private db: DatabaseService,
    private auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {
    this.profileForm = this.formBuilder.group({
      isDriver: [''],
      status: ['', [Validators.required, Validators.maxLength(100)]], // TODO: Indicate error
      arrival: ['', [Validators.required, Validators.maxLength(5)]],
      departure: ['', [Validators.required, Validators.maxLength(5)]],
      capacity: [''],
      filled: [''],
      description: [''],
      price: ['']
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
      this.userData.isDriver = doc.data().isDriver;
      // Update manually TODO: Set up NgModel with driver
      this.profileForm.controls['isDriver'].setValue(this.userData.isDriver);

      // Status
      this.userData.status = doc.data().status;
      // Schedule
      this.userData.schedule = doc.data().schedule;


      this.localCopy = this.userData;
      this.lc.dismiss();
    });
  }

  ngOnInit() {
  }

  valueChanged(): boolean {
    if (this.userData['status'])
      return this.localCopy.status.trim() === this.profileForm.controls['status'].value.trim();
    return false;
  }

  updateProfile() {
    this.db.updateDoc(`users/${this.user.email}`, Object.assign({}, this.userData));
    // If driver changed
    if (this.userData.isDriver !== this.localCopy.isDriver) {
      if (this.userData.isDriver) {
        // Add to drivers
        this.db.unionArray('app/drivers', 'ids', this.user.email);
      } else {
        // Remove from drivers
        this.db.getDoc(`app/drivers`).subscribe(doc => {
          let ids: Array<string> = doc.data().ids;
          ids = ids.filter(id => id !== this.user.email);
          this.db.updateDoc('app/drivers', Object.assign({}, ids));
        });
      }
    }
    this.localCopy = this.userData;
    this.alertService.notice('Profile updated successfully!');
  }

}
