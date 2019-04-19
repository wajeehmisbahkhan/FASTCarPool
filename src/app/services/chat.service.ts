import { Injectable } from '@angular/core';

import { DatabaseService } from './database.service';
import { AuthenticationService } from './authentication.service';
import { Chat, Message, Participant } from './helper-classes';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  user: firebase.User;
  chatList: Array<string> = [];
  chats: Array<Chat> = [];

  constructor(
    private db: DatabaseService,
    private auth: AuthenticationService
  ) {
    this.user = this.auth.user;
  }

  async createChat() {
    // const docRef = await this.db.createDoc(new Chat());

    // TODO: Save doc reference
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
