import { Injectable } from '@angular/core';

import { DatabaseService } from './database.service';
import { AuthenticationService } from './authentication.service';
import { Chat, Message, Participant } from './helper-classes';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  user: firebase.User;
  chatList: Array<string> = [];
  chats: Array<Chat> = [];

  constructor(
    private db: DatabaseService,
    private authService: AuthenticationService,
    private alertService: AlertService
  ) {
// Start construction when user has loaded
this.authService.userState.subscribe(state => {
  if (state) {
    this.user = this.authService.user;
    // this.alertService.load('Loading Chats...',
    const promise = new Promise(async resolve => {
      // Loading user chat list
      await new Promise(res =>
      this.db.getLiveDoc('users/' + this.user.email).subscribe(doc => {
        this.chatList = doc.payload.data()['chats'];
        res();
      }));
      // Load each individual chat
      this.chatList.forEach(async (chatId, index, array) => {
        // Create an empty chat
        const chat = new Chat(chatId);
        // Get entire chat from chats folder in db
        // Live for new messages
        await new Promise(res =>
        this.db.getLiveDoc(`chats/${chatId}`).subscribe(doc => {
          // Chat details
          const messages: Array<Message> = doc.payload.data()['messages'],
                participants: Array<Participant> = doc.payload.data()['participants'];
          // Create chat title accordingly
          if (participants.length === 2)
            chat.title = participants[0].email !== this.user.email ? participants[0].name : participants[1].name;
          else // TODO: Name group
            chat.title = 'Group';
          // Other chat stuff
          chat.messages = messages;
          chat.participants = participants;

          // Push to chats
          // Hacky indexing because .push() pushes old chats on even the smallest changes (like new messages)
          this.chats[index] = chat;

          // If last chat being loaded
          if (Object.is(array.length - 1, index))
            res();
        })
        );
      });
      return resolve();
    });
    // );
  }
});
  }

  async createChat(sender: Participant, receiver: Participant, message: string) {
    // Default chat
    const hi = new Message(0, message); // Sender is at index 0
    const chat = new Chat(null, [hi], [sender, receiver], 'Chat');
    // Create chat
    await this.alertService.load('Creating Chat',
    new Promise(resolve => {
      this.db.createDoc('chats', JSON.parse(JSON.stringify(chat))).then(async doc => {
        // Send document id to both users
        chat.id = doc.id;
        await this.db.unionArray(`users/${sender.email}`, 'chats', chat.id);
        await this.db.unionArray(`users/${receiver.email}`, 'chats', chat.id);
        // Set document id to the chat
        await doc.update({
          id: chat.id
        });
        resolve();
      });
    }));
    // Push to local chat
    this.chatList.push(chat.id);
    this.chats.push(chat);
    // Return document id
    return new Promise<string>(resolve => resolve(chat.id));
  }

  getParticipant(sender: number, index: number) {
    return this.chats[index].participants[sender];
  }

  sendMessage(chatId: string, content: string) {
    let sender: number;
    const chat = this.getChat(chatId);
    chat.participants.forEach((participant, index) => {
      if (participant.email === this.user.email)
        sender = index;
    });
    this.db.unionArray(`chats/${chatId}`, 'messages', Object.assign({}, new Message(sender, content)));
  }

  getChat(id: string) {
    let desiredChat: Chat;
    this.chats.forEach(chat => {
      if (chat.id === id)
        desiredChat = chat;
    });
    return desiredChat;
  }

}
