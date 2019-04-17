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
  chatList: Array<string>;
  chats: Array<Chat> = [];
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
    this.db.getLiveDoc('users/' + this.user.email).subscribe(doc => {
      console.log('New Chat');
      this.chatList = doc.payload.data()['chats'];
      this.displayInbox();
    });
  }

  ngOnInit() { }

  displayInbox () {
    if (this.chatList.length === 0) {
      // Display Forever Alone
      this.foreverAlone = true;
      this.lc.dismiss();
      return;
    }

    this.chatList.forEach(chatId => {
      // Create an empty chat
      const chat = new Chat(chatId);
      // Attach id to the parent item to pass in argument later

      // Get entire chat from chats folder in db
      this.db.getLiveDoc(`chats/${chatId}`).subscribe(doc => {
        console.log('New Chat');
        // Display Message Starts in inbox
        const messages: Array<Message> = doc.payload.data()['messages'],
            participants: Array<Participant> = doc.payload.data()['participants'];

        // Create Message Sample and return Title
        chat.title = this.createMessageSample(messages[messages.length - 1], participants);

        chat.messages = messages;
        chat.participants = participants;

        // Push to chats
        this.chats.push(chat);

        // Loading ended
        // TODO: If last chat being loaded
        this.lc.dismiss();
      });
    });
  }

  createMessageSample(message: Message, participants: Participant[]): string {
    let sender = message.sender;
    const content = message.content;

    // If sender is user
    const user = this.user.email;
    if (sender === user)
      sender = 'You';
    else
      // Convert email into name - loop through all participants for match
      participants.forEach(participant => {
        if (sender === participant.email) {
          sender = participant.name;
        }
      });

    // Push to the inbox array
    this.inbox.push(new Message(sender, content));

    // Return title of chat
    if (participants.length === 2) {
      return participants[0].email !== this.user.email ? participants[0].name : participants[1].name;
    } else { // TODO: Name group
      return 'Group';
    }
  }

  goToChat(e) {
    const index = e.currentTarget.attributes['data-index'].value;
    this.router.navigate(['members', 'messages', 'chat', this.chats[index].id]);
  }

}
