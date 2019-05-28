import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { AlertService } from './services/alert.service';
import { Storage } from '@ionic/storage';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
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
        // No longer required
        this.db = null;
        // Can move forward now
        this.authService.authState.next(true);
      }
      // Subscribe to original for above change and any further changes
      this.authService.authState.subscribe(res => {
        if (res) { // User is logged in
          // No longer required
          this.authService = null;
          this.db = null;
          this.router.navigate(['members', 'dashboard']);
        } else { // Redirect to login
          // No longer required
          this.authService = null;
          this.db = null;
          this.router.navigate(['login']);
        }
      });
      // Default stuff
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.platform.backButton.subscribe(this.navigateBack);
    });
  }
}
