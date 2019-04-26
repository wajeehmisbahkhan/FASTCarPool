import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public registerForm: FormGroup;
  // For ease in reference
  public error = {
    name: '',
    email: '',
    password: ''
  };

  public registering = false;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private db: DatabaseService,
    private alertService: AlertService
    ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: [authService.passingEmail, [Validators.required, Validators.email], authService.emailAvailable.bind(this.authService)],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
  }

  register() {
    const email = this.registerForm.get('email').value;
    // If user gets past the initial checks
    if (!this.registerForm.valid) return;
    this.authService.register(this.registerForm.get('name').value, email, this.registerForm.get('password').value)
    .then(() => {
      this.registering = false;
      this.registerForm.reset();
      // Make place in database
      this.db.createNewUser(this.authService.user);
    }).catch(this.alertService.error);
  }

  resetPassword() {
    this.authService.resetPassword(this.email.value);
  }

  // Getters
  get name():AbstractControl {
    return this.registerForm.get('name');
  }
  get email():AbstractControl {
    return this.registerForm.get('email');
  }
  get password():AbstractControl {
    return this.registerForm.get('password');
  }


}