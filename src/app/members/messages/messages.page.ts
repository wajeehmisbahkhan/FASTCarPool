import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { DatabaseService } from '../../services/database.service';
import { LoadingController } from '@ionic/angular';

import { Message, Participant, Chat } from '../../services/helper-classes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  user: firebase.User;
  chats: Array<string>;
  chat: Chat;
  inbox: Array<Message> = [];
  foreverAlone = false;

  constructor(
    private lc: LoadingController,
    private db: DatabaseService,
    private auth: AuthenticationService,
    private router: Router
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
        this.chat = new Chat(null, null, null);
        this.displayInbox();
      });
    }

  ngOnInit() { }

  displayInbox () {
    if (this.chats.length === 0) {
      // Display Forever Alone
      this.foreverAlone = true;
      this.lc.dismiss();
      return;
    }

    this.chats.forEach(chatId => {
      // Get entire chat from chats folder in db
      this.db.getDoc(`chats/${chatId}`).subscribe(doc => {
        // Display Message Starts in inbox
        const messages: Array<Message> = doc.data().messages,
            participants: Array<Participant> = doc.data().participants;

        this.createMessageSample(messages[messages.length - 1], participants);

        this.chat.messages = messages;
        this.chat.participants = participants;

        // Loading ended
        this.lc.dismiss();
      });
    });
  }

  createMessageSample(message: Message, participants: Participant[]) {
    let sender = message.sender;
    const content = message.content;

    // If sender is user
    const user = this.user.email;
    if (sender === user) {
      sender = 'You';
    } else {
      // Convert email into name
      participants.forEach(participant => {
        if (sender === participant.email) {
          sender = participant.name;
          if (participants.length === 2) {
            this.chat.title = sender;
          } else {
            this.chat.title = 'Group';
          }
        }
      });
    }

    // Push in the chats array
    this.inbox.push(new Message(sender, content));
  }

  goToChat() {
    this.router.navigate(['members', 'messages', 'chat']);
  }

}
