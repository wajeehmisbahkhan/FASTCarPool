import { Injectable } from '@angular/core';

import { AlertController, LoadingController } from '@ionic/angular';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  app: Object;
  device: Object;

  constructor(
    private alertController: AlertController,
    private lc: LoadingController,
    private emailComposer: EmailComposer
  ) { }

  error(error: firebase.FirebaseError | Object) {
    // If undefined object
    const data = { };
    data['code'] = error['code'] ? error['code'] : '666';
    data['message'] = error['message'] ? error['message'] : error;
    // Create alert
    this.alertController.create({
      header: 'Error',
      subHeader: data['code'],
      message: data['message'],
      buttons: [{
        text: 'Send Error Report',
        handler: () => // Send email as handler
        this.sendEmail('k173673@nu.edu.pk',
        'Bug Report (FAST CarPool)',
        `Device:\n${JSON.stringify(this.device)}\nApp:\n${JSON.stringify(this.app)}\nCode: ${data['code']}\nMessage: ${data['message']}`)
      }, 'Okay']
    }).then(alert => {
      alert.present();
    });
  }

  sendEmail(to: string, subject: string, body: string) {
    this.emailComposer.isAvailable().then((available) => {
      if (available) {
        // Now we know we can send
        const email = {
          to: to,
          subject: subject,
          body: body
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
    return new Promise((resolve, reject) => {
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
          }).catch(err => {
            clearTimeout(wait);
            this.lc.dismiss(null, null, loader.id);
            loader = null;
            return reject(err);
          });
        });
      });
    });
  }

}
