import { Component, OnInit, HostListener } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertService } from 'src/app/services/alert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserData, Day, Car, Address, UserLink } from 'src/app/services/helper-classes';
import { GoogleMapInputComponent } from '../../components/google-map-input/google-map-input.component';
import { ModalController } from '@ionic/angular';

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

  // To avoid overusage of resend email verification
  emailVerificationResent: boolean;
  emailCheckInterval: NodeJS.Timeout;

  @HostListener('window:focus')
  reloadUser() {
    if (!this.user.emailVerified)
      this.user.reload();
  }

  constructor(
    private authService: AuthenticationService,
    private db: DatabaseService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private mc: ModalController
  ) {
    // Default driver
    this.driver = false;
    // Default Home (Karachi)
    this.home = new Address('', 24.8607, 67.0011);
    // Default schedule
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    this.schedule = [];
    dayNames.forEach(day => {
        this.schedule.push(new Day(day, '08:00', '16:00'));
    });
    // Default Car
    this.car = new Car;
    // Default verification
    this.emailVerificationResent = false;
  }

  ngOnInit() {
    // Form
    this.infoForm = this.formBuilder.group({
      address: ['', Validators.required]
    });
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
      this.infoForm.get('address').setValue(this.home.address);
    }
  }

  async createUser() {
    // Make place in database
    try {
      // Set user daya
      const userData = new UserData(this.driver, this.home, this.schedule, this.car);
      const userLink = new UserLink(this.user.displayName, this.user.email);
      // Important for adding as rider
      await this.db.loadPickups();
      await this.db.createNewUser(userData, userLink);
      // Next state
      this.authService.authState.next(true);
    } catch (err) {
      this.alertService.error(err);
      return;
    }
  }

  resendEmailConfirmation() {
    // First confirm
    this.alertService.confirmation('Are you sure you want to resend an email confirmation mail?', () =>
    // Send
    this.user.sendEmailVerification()
    // Sent
    .then(() => this.emailVerificationResent = true)
    // Any error
    .catch(this.alertService.error.bind(this.alertService))
    );
  }

  get user() {
    return this.authService.user;
  }

}
