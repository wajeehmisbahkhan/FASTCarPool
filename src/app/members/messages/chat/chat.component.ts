import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/services/helper-classes';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  messageText: string;

  constructor(private cs: ChatService) {
  }

  ngOnInit() {
  }

  submit(chatId) {
    if (!this.messageText) {
      // TODO: Empty msg
      return;
    }

    this.cs.sendMessage(chatId, this.messageText);

    // Reset
    this.messageText = '';
  }


}
