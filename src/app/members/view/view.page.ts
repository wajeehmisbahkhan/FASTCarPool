import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  constructor(
    private cs: ChatService,
    public db: DatabaseService) { }

  ngOnInit() { }

  contactText(): string {
    // If user is not in messages, -1
    const viewIndex = this.cs.chats.findIndex(chat => chat.title === this.db.viewUser.name);
    let text = 'Message For CarPool';
    if (viewIndex >= 0) {
      text = 'Go To Chat';
    }
    return text;
  }

  getRouterLink(): string {
    const viewIndex = this.cs.chats.findIndex(chat => chat.title === this.db.viewUser.name);
    let text = '../../messages/new';
    if (viewIndex >= 0) {
      text = '../../messages/chat/' + this.cs.chatList[viewIndex];
    }
    return text;
  }

}
