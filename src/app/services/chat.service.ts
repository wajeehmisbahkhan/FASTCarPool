import { Injectable, OnDestroy } from '@angular/core';

import { DatabaseService } from './database.service';
import { Chat, Message, Participant } from './helper-classes';
import { AlertService } from './alert.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnDestroy {

  chatList: Array<string> = [];
  previousChatListLength = 0;
  chats: Array<Chat> = [];

  liveSubs: Array<Subscription> = [];

  constructor(
    private db: DatabaseService,
    private alertService: AlertService
  ) { }

  loadMessages() {
    return new Promise(async resolve => {
      // Loading user chat list
      await new Promise(res => {
        const chatSub = this.db.getLiveDoc('users/' + this.db.userLink.email).subscribe(doc => {
          this.chatList = doc.payload.data()['chats'];
          // Reload new chats only
          for (let i = this.previousChatListLength; i < this.chatList.length; i++)
            this.loadChat(i, this.chatList[i]);
          this.previousChatListLength = this.chatList.length;
          res();
        });
        this.liveSubs.push(chatSub);
      });
      return resolve();
    });
  }

  loadChat(index: number, chatId: string) {
    const chat = new Chat(chatId);
    // Get entire chat from chats folder in db
    // Live for new messages
    const chatSub = this.db.getLiveDoc(`chats/${chatId}`).subscribe(doc => {
      // Chat details
      const messages: Array<Message> = doc.payload.data()['messages'],
            participants: Array<Participant> = doc.payload.data()['participants'];
      // Create chat title accordingly
      if (participants.length === 2)
        chat.title = participants[0].email !== this.db.userLink.email ? participants[0].name : participants[1].name;
      else // TODO: Name group
        chat.title = 'Group';
      // Other chat stuff
      chat.messages = messages;
      chat.participants = participants;
      // Push to chats
      // Hacky indexing because .push() pushes old chats on even the smallest changes (like new messages)
      this.chats[index] = chat;
    }, this.alertService.error);
    this.liveSubs.push(chatSub);
  }

  async createChat(sender: Participant, receiver: Participant, message: string) {
    // Default chat
    const hi = new Message(0, message); // Sender is at index 0
    const chat = new Chat(null, [hi], [sender, receiver], receiver.name);
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
      if (participant.email === this.db.userLink.email)
        sender = index;
    });
    this.db.unionArray(`chats/${chatId}`, 'messages', Object.assign({}, new Message(sender, content))).catch(console.error);
  }

  getChat(id: string) {
    const index = this.chats.findIndex(chat => chat.id === id);
    return this.chats[index];
  }

  isUsable() {
    return this.db.usable;
  }

  ngOnDestroy() {
    this.liveSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  get user() {
    return this.db.userLink;
  }

}
