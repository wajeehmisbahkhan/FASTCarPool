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
    if (this.commonChatIndex() >= 0)
      return 'Go To Chat';
     else return 'Message For CarPool';
  }

  // Return any common chats based on common chat id
  // TODO: Refactor when adding groups
  commonChatIndex(): number {
    for (let i = 0; i < this.cs.chats.length; i++)
      if (this.cs.chats.filter(chat => JSON.stringify(chat) ===
      JSON.stringify(this.db.viewUser.chats.includes(JSON.stringify(chat)))))
        return i;
    return -1;
  }

  getRouterLink(): string {
    const viewIndex = this.commonChatIndex();
    let text = '../../messages/new';
    if (viewIndex >= 0) {
      text = '../../messages/chat/' + this.cs.chatList[viewIndex];
    }
    return text;
  }

}
