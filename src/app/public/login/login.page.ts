import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private loginForm: FormGroup;
  private error = {
    email: '',
    password: ''
  };
  private loginFailed = false;
  private emailTimer: any = null;
  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
    ) {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]] // TODO: Check for minimum length manually
      });
    }

  ngOnInit() { }

  async mailPassed() {
    // Fails at basic checks
    if (!this.authService.validate(this.loginForm, 'email', this.error))
      return false;
    // Check from firebase if email exists
    // With some time gap to avoid load on server
    if (this.emailTimer) {
      clearInterval(this.emailTimer);
    }
    this.emailTimer = setInterval(() => {
      this.emailTimer = null;
      this.authService.authenticateMail(this.loginForm.get('email').value);
    }, 1500);
    // if (!this.authService.authenticateMail(this.loginForm.get('email').value)) {
    //   return false;
    // }

    return true;
  }

  passPassed(): boolean {
    // If login failed
    if (this.loginFailed)
      return false;
    // Fails at basic checks
    if (!this.authService.validate(this.loginForm, 'password', this.error))
      return false;
    return true;
  }

  async login() {
    // If user gets past the initial checks
    if (!this.loginForm.valid)
      return;
    this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value).then(() => {
      this.loginForm.reset();
    }).catch(err => {
      // Password failed
      this.loginForm.get('password').setValue('');
      this.loginFailed = true;
      this.error.password = err.message;
    });
    
  }

}
