import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertService } from 'src/app/services/alert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData, Day, Car, Address, UserLink } from 'src/app/services/helper-classes';

@Component({
  selector: 'info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  infoForm: FormGroup;

  // Driver
  driver: boolean;

  // Home
  home: Address;

  // Schedule
  schedule: Array<Day>;

  // Car
  car: Car;

  constructor(
    private authService: AuthenticationService,
    private db: DatabaseService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    // Default driver
    this.driver = false;
    // Default Home
    this.home = new Address('', 0, 0);
    // Default schedule
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    this.schedule = [];
    dayNames.forEach(day => {
        this.schedule.push(new Day(day, '08:00', '16:00'));
    });
    // Default Car
    this.car = new Car;
  }

  ngOnInit() {
    // Form
    this.infoForm = this.formBuilder.group({
      address: [this.home.address, Validators.required]
    });
  }

  ionViewDidEnter() {
    // Home address
    if (window.history.state.address) {
      this.home.position.lat = window.history.state.lat;
      this.home.position.lng = window.history.state.lng;
      this.home.address = window.history.state.address;
      // Reset address input value as only one way data binding
      this.infoForm.get('address').setValue(this.home.address);
    }
  }

  // Map
  goToMap(e) {
    e.preventDefault();
    this.router.navigate(['members', 'info', 'map'], {
      state: {
        lat: this.home.position.lat,
        lng: this.home.position.lng
      }
    });
  }

  async createUser() {
    // Make place in database
    try {
      // Set user daya
      const userData = new UserData(this.driver, this.home, this.schedule, this.car);
      const userLink = new UserLink(this.user.displayName, this.user.email);
      // Important for adding as rider
      await this.db.getPickups();
      await this.db.createNewUser(userData, userLink);
      // Next state
      this.authService.authState.next(true);
    } catch (err) {
      this.alertService.error(err);
      return;
    }
  }

  get user() {
    return this.authService.user;
  }

}
