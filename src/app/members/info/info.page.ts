import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertService } from 'src/app/services/alert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Default driver
    this.driver = false;
    // Default Home
    this.home = new Address('', 0, 0);
    this.route.paramMap.subscribe(params => {
      if (params.has('address')) {
        this.home.address = params.get('address');
        this.home.position.lat = parseFloat(params.get('lat'));
        this.home.position.lng = parseFloat(params.get('lng'));
      } else {
        this.home.address = '';
        this.home.position.lat = 0;
        this.home.position.lng = 0;
      }
    });
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
    this.infoForm = this.formBuilder.group({
      address: [this.home.address, Validators.required]
    });
  }

  // Map
  goToMap(e) {
    e.preventDefault();
    this.router.navigate(['members', 'info', 'map', 'temp', this.home.position.lat, this.home.position.lng]);
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
