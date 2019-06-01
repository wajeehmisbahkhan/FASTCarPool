import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Device } from '@ionic-native/device/ngx';

import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { AlertService } from './services/alert.service';
import { Storage } from '@ionic/storage';
import { DatabaseService } from './services/database.service';

import * as firebase from 'firebase/app';
import { timer } from 'rxjs/observable/timer';

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
    private storage: Storage,
    private router: Router
  ) {
    this.initializeApp();
  }

  navigateBack (e) {
    const url = window.location.pathname;
    if (url === '/login' || url === '/members/dashboard') {
      navigator['app'].exitApp();
    }
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      // Track performance
      console.log(firebase);
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
      const user = await this.storage.get('user');
      if (user) {
        this.authService.user = JSON.parse(user);
        // Get user data from cache as well
        const userData = await this.storage.get('userData');
        this.db.userData = JSON.parse(userData);
        this.db.userLink.name = this.authService.user.displayName;
        this.db.userLink.email = this.authService.user.email;
        this.db.theme.setTheme(this.db.userData.isDriver);
        // Can move forward now
        this.authService.authState.next(true);
      }
      // Subscribe to original for above change and any further changes
      this.authService.authState.subscribe(res => {
        if (res) { // User is logged in
          this.router.navigate(['members', 'dashboard']);
        } else { // Redirect to login
          this.router.navigate(['login']);
        }
      });
      // Default stuff
      // this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(3000).subscribe(() => this.showSplash = false);
      this.platform.backButton.subscribe(this.navigateBack);
    });

    // let status bar overlay webview
    this.statusBar.overlaysWebView(true);

    // set status bar to white
    this.statusBar.backgroundColorByHexString('#ffffff');

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
