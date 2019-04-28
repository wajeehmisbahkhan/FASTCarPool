import { Injectable } from '@angular/core';

import { AlertController, LoadingController } from '@ionic/angular';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alertError = {
    code: null,
    message: null
  };

  constructor(
    private alertController: AlertController,
    private lc: LoadingController,
    private emailComposer: EmailComposer
  ) { }

  error(fireError: firebase.FirebaseError) {
    this.alertError.code = fireError.code;
    this.alertError.message = fireError.message;
    this.alertController.create({
      header: 'Error',
      subHeader: this.alertError.code,
      message: this.alertError.message,
      buttons: [{
        text: 'Send Error Report',
        handler: this.sendEmail
      }, 'Okay']
    }).then(alert => {
      alert.present();
    });
  }

  sendEmail() {
    this.emailComposer.isAvailable().then((available) =>{
      if (available) {
        // Now we know we can send
        const email = {
          to: 'k173673@nu.edu.pk',
          subject: 'Bug Report (FAST CarPool)',
          body: `Code: ${this.alertError.code}\nMessage: ${this.alertError.message}`
        };
        // Send a text message using default options
        this.emailComposer.open(email);
      }
    });
  }

  async confirmation(message: string, confirmationHandler: any) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: message,
      buttons: [
        {
          text: 'Yes',
          handler: confirmationHandler
        }, 'No' // No Action
      ]
    });

    await alert.present();
  }

  async notice(message: string) {
    const alert = await this.alertController.create({
      header: 'Message',
      message: message,
      buttons: ['Okay']
    });

    await alert.present();
  }

  load(message: string, work: Promise<any>) {
    // If taking too long (3 seconds), just resolve
    let wait: NodeJS.Timeout;
    const timeout = new Promise(resolve => {
      wait = setTimeout(() => {
        console.log('Timeout');
        return resolve();
      }, 3000);
    });

    // Promise to detect when done
    return new Promise(resolve => {
      const loading = this.lc.create({
        message: message
      });
      loading.then(loader => {
        loader.present()
        .then(() => {
          Promise.race([work, timeout])
          .then(() => {
            clearTimeout(wait);
            this.lc.dismiss(null, null, loader.id);
            loader = null;
            return resolve();
          });
        });
      });
    }).catch(this.error);
  }

}
