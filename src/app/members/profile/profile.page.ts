import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { AlertService } from 'src/app/services/alert.service';
import { UserData } from 'src/app/services/helper-classes';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileForm: FormGroup;

  // Will be used to detect changes in input
  localCopy: UserData;

  constructor(
    private db: DatabaseService,
    private alertService: AlertService,
    private fb: FormBuilder
  ) {
    // Make a local deep copy - simple assignment will make a shallow copy
    this.localCopy = JSON.parse(JSON.stringify(this.db.userData));
  }

  ngOnInit() {
    this.profileForm = this.fb.group({
      status: [this.localCopy.status, Validators.required],
      car: [this.localCopy.car, Validators.required]
    });
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

}
