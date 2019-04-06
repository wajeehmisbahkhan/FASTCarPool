import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { DatabaseService } from '../../services/database.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  user: firebase.User;
  chats: Array<string>;
  foreverAlone = false;

  constructor(
    private lc: LoadingController,
    private db: DatabaseService,
    private auth: AuthenticationService
    ) {
      const loading = this.lc.create({
        message: 'Loading Messages...'
      });
      loading.then(loader => {
        loader.present();
      });
      this.user = this.auth.user;
      // TODO: Internet issue
      this.db.getDoc('users/' + this.user.email).subscribe(doc => {
        this.chats = doc.data().chats;
        this.displayInbox();
        this.lc.dismiss();
      });
    }

  ngOnInit() { }

  displayInbox () {
    if (this.chats.length === 0) {
      // Display Forever Alone
      this.foreverAlone = true;
      return;
    }
    // Display Message Starts
  }

}
