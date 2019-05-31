import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {

  public registerForm: FormGroup;
  // For ease in reference
  public error: Object;
  public registering = false;

  constructor(
    public authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private db: DatabaseService,
    private alertService: AlertService
    ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: [this.authService.passingEmail,
      [Validators.required, Validators.email], this.authService.emailAvailable.bind(this.authService)],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.error = {
      name: '',
      email: '',
      password: ''
    };
  }

  ngOnDestroy() {
    this.authService = null;
    this.formBuilder = null;
    this.db = null;
    this.error = null;
    this.registerForm = null;
  }

  async register() {
    // If user gets past the initial checks
    if (!this.registerForm.valid) return;
    // If outdated version
    // if (!this.db.usable) {
    //   this.alertService.error(this.db.outdatedError);
    //   return;
    // }
    this.registering = true;
    // Register
    try {
      await this.authService.register(this.name.value, this.email.value, this.password.value);
      this.registering = false;
    } catch (err) {
      this.registering = false;
      this.alertService.error(err);
      return;
    }
    // Make place in database
    try {
      await this.db.createNewUser(this.name.value, this.email.value);
    } catch (err) {
      this.alertService.error(err);
      return;
    }
    // Now safe to go forward
    this.authService.authState.next(true);
    this.registerForm.reset();
  }

  resetPassword() {
    this.authService.resetPassword(this.email.value);
  }

  // Getters
  get name(): AbstractControl {
    return this.registerForm.get('name');
  }
  get email(): AbstractControl {
    return this.registerForm.get('email');
  }
  get password(): AbstractControl {
    return this.registerForm.get('password');
  }

}
