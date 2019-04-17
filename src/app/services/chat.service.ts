import { Injectable } from '@angular/core';

import { DatabaseService } from './database.service';
import { AuthenticationService } from './authentication.service';
import { Chat, Message } from './helper-classes';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  user: string;
  chats: Array<Chat> = [];

  constructor(
    private db: DatabaseService,
    private auth: AuthenticationService
  ) {
    this.user = this.auth.user.email;
    
  }

  async create() {
    // const docRef = await this.db.createDoc(new Chat());

    // TODO: Save doc reference
  }

  sendMessage(chatId, content) {
    this.db.unionArray(`chats/${chatId}`, 'messages', new Message(this.user, content));
  }


}
