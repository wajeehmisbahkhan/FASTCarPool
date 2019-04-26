import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;
  // For ease in reference
  public error = {
    email: '',
    password: ''
  };
  public logging = false;
  public loginFailed = false;
  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
    ) {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email], authService.emailExists.bind(this.authService)],
        password: ['', [Validators.required]]
      });
    }

  ngOnInit() { }

  login() {
    // If user gets past the initial checks
    if (!this.loginForm.valid) return;
    this.logging = true;
    this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
    .then(() => {
      this.loginFailed = false;
      this.logging = false;
      this.loginForm.reset();
    }).catch(err => {
      // Password failed
      this.loginFailed = true;
      this.logging = false;
    });
  }

  resetPassword() {
    this.authService.resetPassword(this.email.value);
    this.loginFailed = false;
  }

  // Getters
  get email(): AbstractControl {
    return this.loginForm.get('email');
  }
  get password(): AbstractControl {
    return this.loginForm.get('password');
  }
}
