import { Injectable } from '@angular/core';

import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertController: AlertController,
    private lc: LoadingController
  ) { }

  error(error: firebase.FirebaseError) {
    this.alertController.create({
      header: 'Error',
      subHeader: error.code,
      message: error.message,
      buttons: [{
        text: 'Send Error Report',
        handler: () => {
          // const email = 'k173673@nu.edu.pk',
          //       subject = 'Bug Report (FAST CarPool)',
          //       body = `Code: ${error.code}
          //               Message: ${error.message}`;
          // document.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
          console.error('Error');
        }
      }, 'Okay']
    }).then(alert => {
      alert.present();
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
    return new Promise(resolve => {
      const loading = this.lc.create({
        message: message
      });
      loading.then(loader => {
        loader.present()
        .then(() => {
          work
          .then(() => {
            this.lc.dismiss(loader);
            loader = null;
            return resolve();
          });
        });
      });
    }).catch(this.error);
  }

}
