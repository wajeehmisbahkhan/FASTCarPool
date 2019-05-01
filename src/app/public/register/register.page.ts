import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';

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
    private db: DatabaseService
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
    this.error = null;
    this.registerForm = null;
  }

  async register() {
    // If user gets past the initial checks
    if (!this.registerForm.valid) return;
    await this.authService.register(this.name.value, this.email.value, this.password.value);
    // Make place in database
    await this.db.createNewUser(this.name.value, this.email.value);
    // Now safe to go forward
    this.authService.safeAuthState.next(true);
    this.registering = false;
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