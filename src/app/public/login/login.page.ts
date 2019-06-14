import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertService } from 'src/app/services/alert.service';
import { UserLink } from 'src/app/services/helper-classes';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;
  // For ease in reference
  public error: any;
  public logging = false;
  public loginFailed = false;
  constructor(
    public authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private db: DatabaseService,
    private alertService: AlertService
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

  login() {
    // If user gets past the initial checks
    if (!this.loginForm.valid) return;
    // If outdated version
    if (!this.db.usable) {
      this.alertService.error(this.db.outdatedError);
      return;
    }
    this.logging = true;
    this.authService.login(this.email.value, this.password.value)
    .then(() => {
      // Login complete
      this.loginFailed = false;
      this.logging = false;
      // Set user link
      this.db.userLink = new UserLink(this.authService.user.displayName, this.authService.user.email);
      // Load user data
      this.alertService.load('Loading your data...',
      this.db.getUserData(this.email.value)).then(() => {
        // Haye ho forward
        this.authService.authState.next(true);
        this.loginForm.reset();
      }).catch(err => {
        // If registration not completed
        if (err.code === 601) {
          // Haye ho forward
          this.authService.authState.next(true);
        }
      });
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
