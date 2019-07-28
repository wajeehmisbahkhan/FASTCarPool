import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { FormGroup, AbstractControl } from '@angular/forms';
import { AlertService } from './alert.service';

import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public passingEmail: string;
  private _user: firebase.User = null;
  private validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Enter a valid email.' },
      { type: 'pattern', message: 'Enter your university\'s email' },
      { type: 'emailExists', message: 'No such email exists.' },
      { type: 'emailAvailable', message: 'Email already exists.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' },
    ]
  };
  emailEndingPattern = /.*/;
  // emailEndingPattern = /@nu.edu.pk$/;
  authState = new BehaviorSubject(false);

  constructor(
    private afAuth: AngularFireAuth,
    private alertService: AlertService
    ) { }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      // Password is too small, invalid by default
      if (password.length < 6)
      return reject({
        code: 'auth/wrong-password',
        message: 'Invalid password.'
      });
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(auth => {
        if (auth.user) {
          this.user = auth.user;
          // this.storage.set('user', JSON.stringify(this.user));
          return resolve();
        }
      })
      .catch(reject);
    });
  }

  async getLocalUser(): Promise<firebase.User> {
    return new Promise(resolve => {
      if (!this.user)
        this.afAuth.user.subscribe(user => {
          this.user = user;
          resolve(this.user);
        });
      else {
        resolve(this.user);
      }
    });
  }

  register(name: string, email: string, password: string) {
    return new Promise((resolve, reject) => {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(auth => {
      // Update name
      auth.user.updateProfile({
        displayName: name
      })
      .then(() => {
        this._user = auth.user;
        // Send email verification
        this.user.sendEmailVerification().catch(this.alertService.error.bind(this.alertService));
        resolve();
      });
    }).catch(reject);
    });
  }

  logout() {
    this.authState.next(false);
    return this.afAuth.auth.signOut().catch(this.alertService.error);
  }

  reauthenticateAccount(password: string) {
    return this.user.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(this.user.email, password));
  }

  deleteAccount() {
    return this.user.delete();
  }

  isAuthenticated() {
    return this.authState.value;
  }

  resetPassword(email: string) {
    this.alertService.confirmation('Are you sure you want to reset your password?', () => { // On Confirmation
      this.afAuth.auth.sendPasswordResetEmail(email).then(() => {
        this.alertService.notice('Email Confirmation Sent.');
      }).catch(this.alertService.error);
    });
  }

  // Specific functions for specific situations
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
    // Delay email check by 0.6 seconds after each value change
    return timer(600).pipe(switchMap(() => {
      return this.afAuth.auth.fetchSignInMethodsForEmail(control.value).then(signInMethods => {
        if (signInMethods.length === 0) {
          return {
            emailExists: {
              passedInEmail: control.value
            }
          };
        }
        return null;
      })
      .catch(error => {
        this.alertService.notice(error);
        return error;
      });
    }));
  }

  emailAvailable(control: AbstractControl) {
    // Delay email check by 0.6 seconds after each value change
    return timer(600).pipe(switchMap(() => {
      return this.afAuth.auth.fetchSignInMethodsForEmail(control.value).then(signInMethods => {
        if (signInMethods.length === 0) {
          return null;
        }
        return {
          emailAvailable: {
            passedInEmail: control.value
          }
        };
      })
      .catch(error => {
        this.alertService.notice(error);
        return error;
      });
    }));
  }

  emailVerified(): boolean {
    return this.user.emailVerified;
  }

  // Getters
  get user(): firebase.User {
    return this._user;
  }

  set user(user: firebase.User) {
    this._user = user;
  }
}
