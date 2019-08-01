import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { AlertService } from 'src/app/services/alert.service';
import { UserData, Address } from 'src/app/services/helper-classes';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { GoogleMapInputComponent } from 'src/app/components/google-map-input/google-map-input.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileForm: FormGroup;

  // Will be used to detect changes in input
  localCopy: UserData;
  home: Address;

  constructor(
    private db: DatabaseService,
    private alertService: AlertService,
    private fb: FormBuilder,
    private mc: ModalController
  ) {
    // Make a local deep copy - simple assignment will make a shallow copy
    this.localCopy = JSON.parse(JSON.stringify(this.db.userData));
    // Default Home (Karachi)
    this.home = this.localCopy.home;
    // this.localCopy.home;
    // this.profileForm.setValue()
  }

  ngOnInit() {
    this.profileForm = this.fb.group({
      status: [this.localCopy.status, Validators.required],
      car: [this.localCopy.car, Validators.required],
      address: ['', Validators.required]
    });
    this.profileForm.get('address').setValue(this.home.address);
  }

  valueChanged(): boolean {
    // Copy values to local
    this.localCopy.status = this.profileForm.get('status').value;
    this.localCopy.car = this.profileForm.get('car').value;
    // Data loaded into local copy
    if (this.localCopy)
      return JSON.stringify(this.localCopy) !== JSON.stringify(this.db.userData);
    return false;
  }

  updateProfile(e: Event) {
    e.preventDefault();
    this.db.updateUserData(this.localCopy);
  }

  // Map
  async showMap() {
    const modal = await this.mc.create({
      component: GoogleMapInputComponent,
      componentProps: {
        lat: this.home.position.lat,
        lng: this.home.position.lng
      }
    });
    await modal.present();
    // Value returned from map
    const value = await modal.onDidDismiss();
    // If data returned
    if (value.data) {
      this.home.position.lat = value.data.lat;
      this.home.position.lng = value.data.lng;
      this.home.address = value.data.address;
      // Reset address input value as only one way data binding
      this.profileForm.get('address').setValue(this.home.address);
      // this.localCopy.home = this.home;
      // this.updateProfile();
    }
  }



}
