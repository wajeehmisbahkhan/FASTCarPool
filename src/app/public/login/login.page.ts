import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  // For ease in reference
  public error: any;
  public logging = false;
  public loginFailed = false;
  constructor(
    public authService: AuthenticationService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email], this.authService.emailExists.bind(this.authService)],
      password: ['', [Validators.required]]
    });
    this.error = {
      email: '',
      password: ''
    };
  }

  ngOnDestroy() {
    this.authService = null;
    this.formBuilder = null;
    this.loginForm = null;
    this.error = null;
  }

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
