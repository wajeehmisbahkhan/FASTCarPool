import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage'
import { Platform } from '@ionic/angular';
import { FormGroup } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth'

const TOKEN_KEY: any = null;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user:any = null;
  private validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' },
    ]
  };

  authenticationState = new BehaviorSubject(false);

  constructor(
    private storage: Storage,
    private plt: Platform,
    private afAuth: AngularFireAuth
    ) {
    //Check on app load
    this.plt.ready().then(() => {
      this.checkToken();
    });
    //Subscribe to authentication state
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        //Store token in local storage
        user.getIdToken().then(idToken => {
          this.storage.set(TOKEN_KEY, idToken);
        });
      } else {
        this.storage.set(TOKEN_KEY, null);
      }
    });
  }

  validate(form: FormGroup, field: string, error: Object): boolean {
    for (let i = 0; i < this.validation_messages[field].length; i++) {
      let validation = this.validation_messages[field][i];
      if (form.get(field).hasError(validation.type) && (form.get(field).dirty || form.get(field).touched)) {
        //Set error message
        error[field] = validation.message;
        return false;
      }
    }
    //Clear error message
    error[field] = '';
    return true;
  }

  async authenticateMail(email: string) {
    await this.afAuth.auth.fetchSignInMethodsForEmail(email).then(signInMethods => {
      if (signInMethods.length === 0) {
        throw {
          code: 'auth/user-not-found',
          message: 'No such email exists. <a href="#">Sign up!</a>'
        }
      }
    });
    return true;
  }

  async login(email: string, password: string) {
    //Password is too small, invalid by default
    if (password.length <= 6)
      throw {
        code: 'auth/wrong-password',
        message: 'Invalid password. <a href="#">Forgot Password?</a>'
      }
    //Sign in - any error will be thrown back
    await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    //Authenticated to move forward
    this.authenticationState.next(true);
  }

  async logout() {
    //Sign in - any error will be thrown back
    await this.afAuth.auth.signOut();
    
    await this.storage.remove(TOKEN_KEY);
    this.authenticationState.next(false);
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  checkToken() {
    return this.storage.get(TOKEN_KEY).then(res => {
      //TODO: If TOKEN_KEY is valid/!= null or not undefined/removed
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }
}
