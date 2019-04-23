import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { LoadingController } from '@ionic/angular';

import { Message, Participant, Chat, SampleMessage } from '../../services/helper-classes';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  user: firebase.User;
  inbox: Array<SampleMessage> = [];
  foreverAlone = false;

  constructor(
    private lc: LoadingController,
    private auth: AuthenticationService,
    private router: Router,
    public cs: ChatService,
    private db: DatabaseService
    ) {
    const loading = this.lc.create({
      message: 'Loading Messages...'
    });
    loading.then(loader => {
      loader.present();
    });
    this.user = this.auth.user;
    this.displayInbox();
  }

  ngOnInit() { }

  displayInbox () {
    if (this.cs.chatList.length === 0) {
      // Display Forever Alone
      this.foreverAlone = true;
      this.lc.dismiss();
      return;
    }

    this.cs.chatList.forEach((chatId, index, array) => {
      // Create an empty chat
      const chat = new Chat(chatId);
      // Get entire chat from chats folder in db
      // Live for new messages
      this.db.getLiveDoc(`chats/${chatId}`).subscribe(doc => {
        // Display Message Starts in inbox
        const messages: Array<Message> = doc.payload.data()['messages'],
            participants: Array<Participant> = doc.payload.data()['participants'];

        // Create Message Sample and return Title
        chat.title = this.createMessageSample(messages[messages.length - 1], participants, index);

        chat.messages = messages;
        chat.participants = participants;

        // Push to chats
        // Hacky indexing because .push() pushes old chats on even the smallest changes (like new messages)
        this.cs.chats[index] = chat;

        // If last chat being loaded
        if (Object.is(array.length - 1, index))
          // Loading ended
          this.lc.dismiss().catch(error => {
            if (error !== 'overlay does not exist')
              console.log('We got a problem');
          });
      });
    });
  }

  // Figures out the name for the last sender
  createMessageSample(message: Message, participants: Participant[], index: number): string {
    const sender = message.sender;
    const content = message.content;

    // LAST SENDER
    let lastSender: string;
    // If sender is user
    const user = this.user.email;
    if (participants[sender].email === user)
      lastSender = 'You';
    else
      // Convert email into name - loop through all participants for match
      participants.forEach(participant => {
        if (participants[sender].email === participant.email) {
          lastSender = participant.name;
        }
      });

    // TITLE
    let title = 'Chat';
    // Setting title for chat
    if (participants.length === 2)
      title = participants[0].email !== this.user.email ? participants[0].name : participants[1].name;
    else // TODO: Name group
      title = 'Group';

    // Display Sender + Message Starts in inbox
    // Removed .push() since it repushes old chats on each new message
    this.inbox[index] = new SampleMessage(lastSender, content);
    return title;
  }

  goToChat(e) {
    const index = e.currentTarget.attributes['data-index'].value;
    this.router.navigate(['members', 'messages', 'chat', this.cs.chats[index].id]);
  }

}
