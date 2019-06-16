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

  // Detects any new chats
  loadChats() {
    return new Promise(async resolve => {
      // Loading user chat list
      await new Promise(res => {
        const chatSub = this.db.getLiveDoc('users/' + this.db.userLink.email).subscribe(doc => {
          // List of chats for user
          this.chatList = doc.payload.data()['chats'];
          // Load individual chats - new chats only
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

  // Detects any new messages or data change related to individual chat
  loadChat(index: number, chatId: string) {
    // Get entire chat from chats folder in db
    const chatSub = this.db.getLiveDoc(`chats/${chatId}`).subscribe(doc => {
      // Chat details
      const messages: Array<Message> = doc.payload.data()['messages'],
            participants: Array<Participant> = doc.payload.data()['participants'];
      // If chat already loaded locally
      if (this.chats[index]) {
        const oldChat = new Chat(chatId, messages, participants, doc.payload.data()['title']);
        // Filter out only new messages
        for (let i = this.chats[index].messages.length; i < messages.length; i++) {
          // If these messages are sent by someone else
          if (participants[messages[i].sender].email !== this.db.userLink.email) {
            // Add new message - status updated
            oldChat.messages[i].status = 'RECEIVED';
          }
          // Update server once we reach the final received message
          if (i === messages.length - 1) {
            this.db.updateDoc(`chats/${chatId}`, oldChat);
          }
        }
        // Update the messages locally - TODO?: Update other stuff as well if any
        this.chats[index] = oldChat;
      } else { // Loading locally for first time
        const chat = new Chat(chatId);
        // Create chat title accordingly
        if (participants.length === 2)
          chat.title = participants[0].email !== this.db.userLink.email ? participants[0].name : participants[1].name;
        else // TODO: Name group
          chat.title = 'Group';
        // Other chat stuff
        chat.messages = JSON.parse(JSON.stringify(messages));
        chat.participants = participants;
        // Update messages to received for all new chats
        chat.messages.forEach(message => {
          if (participants[message.sender].email !== this.db.userLink.email) {
            message.status = 'RECIEVED';
          }
        });
        // If any updates send to server
        if (JSON.parse(JSON.stringify(chat.messages)) !== JSON.parse(JSON.stringify(messages))) {
          this.db.updateDoc(`chats/${chatId}`, chat);
        }
        // Push to chats
        this.chats.push(chat);
      }
    }, this.alertService.error);
    this.liveSubs.push(chatSub);
  }

  async createChat(sender: Participant, receiver: Participant, message: string) {
    // Default chat
    const hi = new Message(0, message); // Sender is at index 0
    hi.status = 'SENT'; // Assume to be sent as page will never be opened otherwise
    const chat = new Chat(null, [hi], [sender, receiver], receiver.name);
    // Create chat
    await this.alertService.load('Creating Chat',
    new Promise((resolve, reject) => {
      this.db.createDoc('chats', chat).then(async doc => {
        // Send document id to both users
        chat.id = doc.id;
        await this.db.arrayUnion(`users/${sender.email}`, 'chats', chat.id).catch(reject);
        await this.db.arrayUnion(`users/${receiver.email}`, 'chats', chat.id).catch(reject);
        // Set document id to the chat
        await doc.update({
          id: chat.id
        });
        this.db.userData.chats.push(chat.id);
        resolve();
      }).catch(reject);
    }));
    // Return document id
    return new Promise<string>(resolve => resolve(chat.id));
  }

  getParticipant(sender: number, index: number) {
    return this.chats[index].participants[sender];
  }

  // Send message using chat id (where to send)
  // and content of message (what to send)
  sendMessage(chatId: string, content: string) {
    // Sender is just an index for the user in an array of participants
    let sender: number;
    // Get chat from locally stored array of chats
    const chat = this.getChat(chatId);
    // Search for sender
    chat.participants.forEach((participant, index) => {
      if (participant.email === this.db.userLink.email)
        sender = index;
    });
    // Message to send
    const message = new Message(sender, content); // Local
    chat.messages.push(message); // Local chat
    const serverMessage = new Message(sender, content);
    serverMessage.status = 'SENT'; // Message for server is sent since it reaches server
    this.db.arrayUnion(`chats/${chatId}`, 'messages', serverMessage)
    .then(() => message.status = 'SENT') // Update locally since it has reached server
    .catch(this.alertService.error.bind(this)); // Any errors
  }

  // Returns chat from locally cached chat based on id
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
