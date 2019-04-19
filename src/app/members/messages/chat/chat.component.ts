import { Component, OnInit } from '@angular/core';
import { Message, Participant, Chat } from 'src/app/services/helper-classes';
import { ChatService } from 'src/app/services/chat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  public chat: Chat;
  messageText: string;

  constructor(
    public cs: ChatService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.chat = this.cs.getChat(params.get('id'));
    });
  }

  getParticipant(sender: number): Participant {
    return this.chat.participants[sender];
  }

  submit() {
    if (!this.messageText) {
      // TODO: Empty msg
      return;
    }

    this.cs.sendMessage(this.chat.id, this.messageText);

    // Reset
    this.messageText = '';
  }

  userIsSender(message: Message): boolean {
    return this.getParticipant(message.sender).email === this.cs.user.email;
  }

}
