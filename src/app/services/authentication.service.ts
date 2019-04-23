import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { FormGroup, AbstractControl } from '@angular/forms';
import { AlertService } from './alert.service';

import { AngularFireAuth } from '@angular/fire/auth';

const TOKEN_KEY: any = null;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _user: firebase.User = null;
  private validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Enter a valid email.' },
      { type: 'emailExists', message: 'No such email exists. <a routerLink="../register/" routerDirection="forward">Sign Up!</a>' },
      { type: 'emailAvailable', message: 'Email already exists. <a (click)="resetPassword()">Forgot Password?</a>' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' },
    ]
  };

  authenticationState = new BehaviorSubject(false);
  userState = new BehaviorSubject(false);

  constructor(
    private storage: Storage,
    private plt: Platform,
    private afAuth: AngularFireAuth,
    private alertService: AlertService
    ) {
    // Check on app load
    this.plt.ready().then(() => {
      // Loading screen
      this.alertService.load('Loading...', new Promise((resolve, reject) => {
        // Subscribe to authentication state
        this.afAuth.authState.subscribe(user => {
          if (user) {
            this._user = user;
            this.userState.next(true);
            // Store token in local storage
            user.getIdToken().then(idToken => {
              this.storage.set(TOKEN_KEY, idToken);
            });
          } else {
            this.userState.next(false);
            this.storage.set(TOKEN_KEY, null);
          }
          resolve();
        });
        // TODO: Timeout
        setTimeout(() => resolve(), 1000);
      })
      );

      // Token checker
      this.checkToken();
    });
  }

  validate(form: FormGroup, field: string, error: Object): boolean {
    for (let i = 0; i < this.validation_messages[field].length; i++) {
      const validation = this.validation_messages[field][i];
      if (form.get(field).hasError(validation.type) && (form.get(field).dirty || form.get(field).touched)) {
        // Set error message
        error[field] = validation.message;
        return false;
      }
    }
    // Clear error message
    error[field] = '';
    return true;
  }

   emailExists(control: AbstractControl) {
    return this.afAuth.auth.fetchSignInMethodsForEmail(control.value).then(signInMethods => {
      if (signInMethods.length === 0) {
        return {
          emailExists: {
            passedInEmail: control.value
          }
        };
      }
      return null;
    }).catch(this.alertService.error);
  }

  emailAvailable(control: AbstractControl) {
    return this.afAuth.auth.fetchSignInMethodsForEmail(control.value).then(signInMethods => {
      if (signInMethods.length === 0) {
        return null;
      }
      return {
        emailAvailable: {
          passedInEmail: control.value
        }
      };
    });
  }

  async login(email: string, password: string) {
    // Password is too small, invalid by default
    if (password.length < 6)
      throw {
        code: 'auth/wrong-password',
        message: 'Invalid password. <a href="#">Forgot Password?</a>'
      };
    // Sign in - any error will be thrown back
    let errors = false;
    await this.afAuth.auth.signInWithEmailAndPassword(email, password).catch(err => {
      // Wrong password from firebase
      if (err.code !== 'auth/wrong-password')
        this.alertService.error(err);
      errors = true;
    });
    // Authenticated to move forward
    if (!errors) {
      this.authenticationState.next(true);
      this.userState.next(true);
    }
  }

  register(name: string, email: string, password: string) {
    const _this = this;
    return new Promise(resolve => {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(auth => {
      _this._user = auth.user;
      // Update name
      auth.user.updateProfile({
        displayName: name
      })
      .then(() => {
        _this.authenticationState.next(true);
        _this.userState.next(true);
        resolve();
      });
    });
    }).catch(this.alertService.error);
  }

  async logout() {
    // Sign in - any error will be thrown back
    await this.afAuth.auth.signOut().catch(this.alertService.error);
    await this.storage.remove(TOKEN_KEY);
    this.authenticationState.next(false);
    this.userState.next(false);
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  checkToken() {
    return this.storage.get(TOKEN_KEY).then(res => {
      // TODO: If TOKEN_KEY is valid/!= null or not undefined/removed
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }

  resetPassword() {
    this.alertService.confirmation('Are you sure you want to reset your password?', () => { // On Confirmation
      this.afAuth.auth.sendPasswordResetEmail(this.user.email).then(() => {
        this.alertService.notice('Email Confirmation Sent.');
      }).catch(this.alertService.error);
    });
  }

  // Getters
  get user(): firebase.User {
    return this._user;
  }
}
