import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Device } from '@ionic-native/device/ngx';

import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { AlertService } from './services/alert.service';
import { DatabaseService } from './services/database.service';

import * as firebase from 'firebase/app';
import { timer } from 'rxjs/observable/timer';
import { UserLink } from './services/helper-classes';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  showSplash = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private appVersion: AppVersion,
    private device: Device,
    private alertService: AlertService,
    private authService: AuthenticationService,
    private db: DatabaseService,
    private router: Router
  ) {
    this.initializeApp();
  }

  navigateBack (e) {
    const url = window.location.pathname;
    // TODO: Handle all urls
    if (url === '/login' || url === '/members/dashboard') {
      navigator['app'].exitApp();
    }
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      // Track performance
      console.log(firebase.performance);
      // Enable local caching
      firebase.firestore().settings({
        cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
      });
      firebase.firestore().enablePersistence().catch(err => {
        if (err.code === 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled
            // in one tab at a a time.
            // ...
        } else if (err.code === 'unimplemented') {
            // The current browser does not support all of the
            // features required to enable persistence
            // ...
        }
      });
      // Save device settings in case email is needed
      this.alertService.device = this.device;
      // Check that user has the latest version for the app
      this.db.getDoc('app/info').subscribe(async doc => {
        const localVersion = await this.appVersion.getVersionNumber().catch(this.alertService.error.bind(this.alertService));
        this.alertService.app = localVersion;
        const serverVersion = doc.data().version;
        if (localVersion) // TODO: When coming from alpha to beta, only major version difference will cause app to stop working
          this.db.usable = this.versionDifference(localVersion, serverVersion) === 'minor' ? false : true;
        else // Testing purposes
          this.db.usable = this.versionDifference('3.3.1', '3.3.2') === 'minor' ? false : true;
      });
      // Check if user is stored in cache
      const user = await this.authService.getLocalUser();
      if (user) {
        // Get user data from cache as well
        const userData = await this.db.getLocalUserData();
        if (userData) {
          this.db.userData = JSON.parse(userData);
          this.db.userLink = new UserLink(user.displayName, user.email);
          this.db.theme.setTheme(this.db.userData.isDriver);
          // Keep updating
          this.db.getUserData(user.email);
        } else { // Get from server
          try {
            await this.db.getUserData(user.email);
            this.db.userLink = new UserLink(user.displayName, user.email);
          } catch (err) {
            if (err.code !== 601) {
              this.alertService.error.bind(this.alertService, [err]);
            }
          }
        }
        // Can move forward now
        this.authService.authState.next(true);
      }
      // Subscribe to original for above change and any further changes
      this.authService.authState.subscribe(async res => {
        if (res) { // User is logged in
          // If first time registration - or incomplete registration
          if (!this.db.userData) {
            // TODO: Load courses from server before moving on
            this.router.navigate(['members', 'info']);
          } else { // Usual member
            this.router.navigate(['members', 'dashboard']);
          }
        } else { // Redirect to login
          this.router.navigate(['login']);
        }
      });
      // Default stuff
      // this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(5000).subscribe(() => this.showSplash = false);
      this.platform.backButton.subscribe(this.navigateBack);
    });

    // let status bar overlay webview
    this.statusBar.overlaysWebView(true);

    // set status bar to white
    this.statusBar.backgroundColorByHexString('#000000');

  }

  versionDifference(localVersion: string, serverVersion: string): string {
    // Major change indicated by number before 1st dot - example 3.1.3 vs 3.1.2
    if (parseInt(localVersion, 10) < parseInt(serverVersion, 10)) // 3 < 3
      return 'major';
    let dotPosition: number;
    // Minor change indicated by number before 2nd dot
    dotPosition = localVersion.indexOf('.');
    localVersion = localVersion.substring(dotPosition + 1);
    dotPosition = serverVersion.indexOf('.');
    serverVersion = serverVersion.substring(dotPosition + 1);
    if (parseInt(localVersion, 10) < parseInt(serverVersion, 10)) // 1 < 1
      return 'minor';
    // Patch fix indicated by last number
    dotPosition = localVersion.indexOf('.');
    localVersion = localVersion.substring(dotPosition + 1);
    dotPosition = serverVersion.indexOf('.');
    serverVersion = serverVersion.substring(dotPosition + 1);
    if (parseInt(localVersion, 10) < parseInt(serverVersion, 10)) // 3 < 2
      return 'patch';
    return 'up to date';
  }
}
