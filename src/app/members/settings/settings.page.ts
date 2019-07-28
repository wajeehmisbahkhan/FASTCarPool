import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { AlertService } from 'src/app/services/alert.service';
import { DatabaseService } from 'src/app/services/database.service';
import { PopoverController } from '@ionic/angular';
import { AuthenticationComponent } from './authentication/authentication.component';

@Component({
  selector: 'settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private db: DatabaseService,
    private alertService: AlertService,
    private poc: PopoverController,
    private appVersion: AppVersion
  ) { }

  ngOnInit() {
  }

  // Returns password string - result.data is undefined if cancelled
  async confirmPassword() {
    // Create popover asking for password
    const popover = await this.poc.create({
      component: AuthenticationComponent,
      translucent: true
    });
    await popover.present();
    // On dismissing return received value for password
    const result = await popover.onDidDismiss();
    return result.data ? result.data['password'] : null;
  }

  async deleteAccount() {
    const password = await this.confirmPassword();
    if (!password) return;
    try {
      await this.authService.reauthenticateAccount(password);
      this.alertService.confirmation(`Are you sure you want to delete your account?
      All your data will be permanently deleted.`, async () => {
        // Delete account data
        // await this.alertService.load('Deleting your account data...',
        // this.db.deleteAccount.bind(this.db, this.authService.user.email));
        await this.db.deleteAccount(this.authService.user.email);
        // Delete actual account
        await this.authService.deleteAccount();
        // Logout
        this.authService.authState.next(false);
      });
    } catch (err) {
      if (err.code === 'auth/wrong-password')
        this.alertService.notice('Wrong password, please try again.');
      else
        this.alertService.error(err);
    }
  }

  // get version() {
  //   return this.appVersion.getVersionNumber();
  // }

}
